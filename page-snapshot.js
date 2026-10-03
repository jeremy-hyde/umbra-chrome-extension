// Umbra — single-file HTML page snapshot.
// Injected on demand by popup.js via chrome.scripting.executeScript.
// The last expression must evaluate to { html, filename } (or a promise of it).

(async () => {
  const IMG_MAX = 4 * 1024 * 1024;        // 4 MB per image
  const IMG_TOTAL_MAX = 40 * 1024 * 1024; // 40 MB total inlined images
  const pageUrl = location.href;

  const abs = (u, base) => {
    try { return new URL(u, base || pageUrl).href; } catch (_) { return u; }
  };

  const rewriteCssUrls = (css, base) => css.replace(
    /url\(\s*(['"]?)([^'")]+)\1\s*\)/g,
    (m, q, u) => {
      const t = u.trim();
      if (!t || /^(data:|blob:|#)/i.test(t)) return m;
      return `url("${abs(t, base)}")`;
    }
  );

  // 1. Serialize every stylesheet through the CSSOM. This covers <style>
  //    tags, <link> sheets and rules injected by CSS-in-JS libraries
  //    (styled-components, emotion…). Cross-origin sheets throw on
  //    cssRules — fetch them instead.
  const sheetText = new Map(); // ownerNode -> css text
  await Promise.all([...document.styleSheets].map(async (sheet) => {
    if (sheet.disabled || !sheet.ownerNode) return;
    let css = null;
    try {
      css = [...sheet.cssRules].map((r) => r.cssText).join('\n');
    } catch (_) {
      if (sheet.href) {
        try { css = await (await fetch(sheet.href)).text(); } catch (_) { /* keep remote link */ }
      }
    }
    if (css != null) sheetText.set(sheet.ownerNode, rewriteCssUrls(css, sheet.href || pageUrl));
  }));

  // 2. Clone the live DOM, then pair every cloned node with its original
  //    (index order is identical before any removal).
  const clone = document.documentElement.cloneNode(true);
  const origAll = [...document.documentElement.querySelectorAll('*')];
  const cloneAll = [...clone.querySelectorAll('*')];
  const pairs = new Map();
  cloneAll.forEach((el, i) => pairs.set(el, origAll[i]));

  // Drop scripts (a snapshot is static — re-running JS would break it),
  // redirecting/CSP metas, <base> (all URLs are absolutized) and Umbra UI.
  const removed = new Set();
  clone.querySelectorAll('script, base, meta[http-equiv="refresh" i], meta[http-equiv="content-security-policy" i], [id*="umbra"], [class*="umbra"]')
    .forEach((el) => {
      el.querySelectorAll('*').forEach((d) => removed.add(d));
      removed.add(el);
      el.remove();
    });

  // Replace stylesheet <link>s with inlined <style>s; fill empty <style>
  // tags whose rules live only in the CSSOM.
  for (const link of [...clone.querySelectorAll('link[rel~="stylesheet" i]')]) {
    let css = sheetText.get(pairs.get(link));
    // Sheet never reached the CSSOM (unmatched media, late load…) — fetch it.
    if (css == null && link.getAttribute('href')) {
      try { css = rewriteCssUrls(await (await fetch(abs(link.getAttribute('href')))).text(), pageUrl); } catch (_) {}
    }
    if (css != null) {
      const style = document.createElement('style');
      style.textContent = css;
      link.replaceWith(style);
    } else {
      link.setAttribute('href', abs(link.getAttribute('href')));
    }
  }
  for (const style of [...clone.querySelectorAll('style')]) {
    const orig = pairs.get(style);
    const css = orig ? sheetText.get(orig) : null;
    if (css != null && !orig.textContent.trim()) style.textContent = css;
    else if (style.textContent) style.textContent = rewriteCssUrls(style.textContent, pageUrl);
  }

  // 3. Absolutize resource URLs and srcset; drop our marker attributes.
  const SRC_TAGS = new Set(['IMG', 'IFRAME', 'VIDEO', 'AUDIO', 'SOURCE', 'TRACK', 'EMBED', 'INPUT']);
  for (const el of cloneAll) {
    if (removed.has(el)) continue;
    el.removeAttribute('data-umbra-dl-attached');
    if (SRC_TAGS.has(el.tagName)) {
      const v = el.getAttribute('src');
      if (v && !/^(data:|blob:|#)/i.test(v.trim())) el.setAttribute('src', abs(v));
    }
    if (el.tagName === 'A' || el.tagName === 'AREA') {
      const v = el.getAttribute('href');
      if (v && !/^(#|mailto:|tel:|javascript:|data:)/i.test(v.trim())) el.setAttribute('href', abs(v));
    }
    const srcset = el.getAttribute('srcset');
    if (srcset) {
      el.setAttribute('srcset', srcset.split(',').map((part) => {
        const bits = part.trim().split(/\s+/);
        if (bits[0]) bits[0] = abs(bits[0]);
        return bits.join(' ');
      }).join(', '));
    }
  }

  // 4. Preserve current form state (values live on properties, not attrs).
  for (const el of cloneAll) {
    if (removed.has(el)) continue;
    const orig = pairs.get(el);
    if (!orig) continue;
    if (el.tagName === 'INPUT') {
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (orig.checked) el.setAttribute('checked', ''); else el.removeAttribute('checked');
      } else if (orig.value != null) {
        el.setAttribute('value', orig.value);
      }
    } else if (el.tagName === 'TEXTAREA') {
      el.textContent = orig.value;
    } else if (el.tagName === 'OPTION') {
      if (orig.selected) el.setAttribute('selected', ''); else el.removeAttribute('selected');
    }
  }

  // 5. Canvases have no markup — turn them into PNG <img>s when readable.
  for (const el of cloneAll) {
    if (removed.has(el) || el.tagName !== 'CANVAS') continue;
    const orig = pairs.get(el);
    try {
      const img = document.createElement('img');
      img.setAttribute('src', orig.toDataURL('image/png'));
      if (orig.width) img.setAttribute('width', orig.width);
      if (orig.height) img.setAttribute('height', orig.height);
      img.setAttribute('style', el.getAttribute('style') || '');
      el.replaceWith(img);
    } catch (_) { /* tainted canvas — leave element */ }
  }

  // 6. Inline images as data URIs (bounded), falling back to absolute URLs.
  const imgPairs = cloneAll
    .filter((e) => e.tagName === 'IMG' && !removed.has(e))
    .map((e) => ({ c: e, o: pairs.get(e) }))
    .filter((p) => p.o);
  let imgIdx = 0, imgBytes = 0;
  const blobToDataUrl = (blob) => new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result);
    r.onerror = rej;
    r.readAsDataURL(blob);
  });
  await Promise.all(Array.from({ length: 6 }, async () => {
    while (imgIdx < imgPairs.length) {
      const p = imgPairs[imgIdx++];
      let url = p.o.currentSrc || p.o.src || p.c.getAttribute('src');
      if (!url || /^(data:|blob:)/i.test(url)) continue;
      url = abs(url);
      try {
        const blob = await (await fetch(url)).blob();
        if (!blob.size || blob.size > IMG_MAX || imgBytes + blob.size > IMG_TOTAL_MAX) {
          p.c.setAttribute('src', url);
          continue;
        }
        imgBytes += blob.size;
        p.c.setAttribute('src', await blobToDataUrl(blob));
        p.c.removeAttribute('srcset'); // data: src wins over remote srcset
      } catch (_) {
        p.c.setAttribute('src', url);
      }
    }
  }));

  const title = (document.title || location.hostname).replace(/[/\\:*?"<>|]+/g, ' ').trim().slice(0, 80) || 'page';
  return {
    html: `<!DOCTYPE html>\n<!-- Saved by Umbra — ${new Date().toISOString()} — ${pageUrl} -->\n${clone.outerHTML}`,
    filename: `${location.hostname} - ${title}.html`,
  };
})()
