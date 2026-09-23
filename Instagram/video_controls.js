// ─── Umbra — native Instagram video controls ────────────────────────────────
// Adds a seek bar + transport controls to plain <video> elements that
// Instagram renders without controls (Reels feed, timeline videos).
// Runs in the isolated world; videos are recycled by IG, so attachment is
// driven by a MutationObserver and re-checked on every DOM change.
//
// The bar lives on document.body, position:fixed over the video's rect.
// Instagram covers its <video> elements with sibling overlay layers (captions,
// action buttons), so a bar INSIDE the video's parent both loses the :hover
// and the click target — fixed-position + max z-index sidesteps all of it.

(() => {
  if (window.__umbraVcInit) return;
  window.__umbraVcInit = true;

  const ICONS = {
    play: 'Icons/player_icons/play.svg',
    pause: 'Icons/player_icons/pause.svg',
    back5: 'Icons/player_icons/5s_backward.svg',
    fwd5: 'Icons/player_icons/5s_forward.svg',
    mute: 'Icons/player_icons/mute.svg',
    speaker: 'Icons/player_icons/speaker_on.svg',
  };

  const BAR_Z = '2147483646';
  const BAR_H = 34;   // approx height, used to anchor above the video bottom edge
  const BAR_MARGIN = 8;

  const CSS = `
    .umbra-vc {
      position: fixed;
      display: flex; align-items: center; gap: 8px;
      padding: 6px 10px;
      background: rgba(15, 15, 16, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 10px;
      backdrop-filter: blur(8px);
      z-index: ${BAR_Z};
      visibility: hidden;
      opacity: 0;
      transform: translateY(4px);
      transition: opacity .15s ease, transform .15s ease, visibility 0s linear .15s;
      pointer-events: auto;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      direction: ltr;
      box-sizing: border-box;
    }
    .umbra-vc.umbra-vc-show {
      visibility: visible; opacity: 1; transform: translateY(0);
      transition: opacity .15s ease, transform .15s ease;
    }
    .umbra-vc button {
      display: inline-flex; align-items: center; justify-content: center;
      width: 26px; height: 26px; flex: 0 0 auto;
      padding: 0; margin: 0;
      background: transparent; border: none; border-radius: 6px;
      cursor: pointer; opacity: .85;
    }
    .umbra-vc button:hover { opacity: 1; background: rgba(255,255,255,0.10); }
    .umbra-vc button img {
      width: 16px; height: 16px; display: block;
      filter: brightness(0) invert(1);   /* source SVGs are fill="black" */
    }
    .umbra-vc-time {
      flex: 0 0 auto; color: #d7dadc; font-size: 11px; font-variant-numeric: tabular-nums;
      user-select: none; white-space: nowrap;
    }
    .umbra-vc-track {
      position: relative; flex: 1 1 auto; height: 18px; cursor: pointer;
      display: flex; align-items: center; min-width: 40px;
    }
    .umbra-vc-rail {
      position: relative; width: 100%; height: 4px; border-radius: 2px;
      background: rgba(255,255,255,0.22); overflow: hidden;
    }
    .umbra-vc-buf {
      position: absolute; left: 0; top: 0; bottom: 0; width: 0;
      background: rgba(255,255,255,0.18);
    }
    .umbra-vc-fill {
      position: absolute; left: 0; top: 0; bottom: 0; width: 0;
      background: #4fbdba;
    }
    .umbra-vc-knob {
      position: absolute; top: 50%; left: 0; width: 11px; height: 11px;
      border-radius: 50%; background: #4fbdba;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 0 2px rgba(0,0,0,0.35);
      pointer-events: none; opacity: 0;
      transition: opacity .15s ease;
    }
    .umbra-vc:hover .umbra-vc-knob,
    .umbra-vc.umbra-vc-drag .umbra-vc-knob { opacity: 1; }
  `;

  let enabled = true;
  let observer = null;
  const attached = new Set();       // videos with live controls
  let pointerX = -1, pointerY = -1;
  let geoScheduled = false;

  function injectStyle() {
    if (document.getElementById('umbra-vc-css')) return;
    const el = document.createElement('style');
    el.id = 'umbra-vc-css';
    el.textContent = CSS;
    (document.head || document.documentElement).appendChild(el);
  }

  function fmt(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${String(s).padStart(2, '0')}`;
  }

  function icon(name) {
    const img = document.createElement('img');
    img.src = chrome.runtime.getURL(ICONS[name]);
    img.alt = '';
    img.draggable = false;
    return img;
  }

  // Skip videos we should not touch:
  //  - inside our own overlay player (#sf-player-overlay)
  //  - display:none / zero-size placeholders
  function eligible(video) {
    if (!(video instanceof HTMLVideoElement)) return false;
    if (video.closest('#sf-player-overlay')) return false;
    return true;
  }

  // Keep bars glued to their video's viewport rect. Called on scroll/resize
  // (capture phase catches nested scrollers) and from each video's paint().
  function updateGeometry() {
    for (const video of attached) {
      const ui = video._umbraVc;
      if (!ui) continue;
      const r = video.getBoundingClientRect();
      const onscreen = r.width > 0 && r.height > 0 &&
        r.bottom > 0 && r.top < window.innerHeight &&
        r.right > 0 && r.left < window.innerWidth;
      ui.onscreen = onscreen;
      if (!onscreen) {
        ui.bar.classList.remove('umbra-vc-show');
        continue;
      }
      ui.lastRectLeft = r.left;
      ui.lastRectTop = r.top;
      ui.lastRectWidth = r.width;
      ui.lastRectHeight = r.height;
      ui.bar.style.left = (r.left + BAR_MARGIN) + 'px';
      ui.bar.style.width = Math.max(0, r.width - BAR_MARGIN * 2) + 'px';
      const barH = ui.bar.offsetHeight || BAR_H;
      ui.bar.style.top = (r.bottom - BAR_MARGIN - barH) + 'px';
    }
    refreshVisibility();
  }

  function scheduleGeometry() {
    if (geoScheduled) return;
    geoScheduled = true;
    requestAnimationFrame(() => {
      geoScheduled = false;
      updateGeometry();
    });
  }

  // Show the bar when the pointer is inside the video's rect — IG overlays
  // swallow :hover on the host, so we test coordinates directly. Also shown
  // while paused or dragging; auto-hides ~2.5s after the pointer leaves.
  // Hidden entirely while anything is fullscreen — IG puts the video into a
  // fullscreen/modal view where the feed bar must not linger.
  function refreshVisibility() {
    const now = Date.now();
    const fsActive = !!document.fullscreenElement;
    for (const video of attached) {
      const ui = video._umbraVc;
      if (!ui || !ui.onscreen) continue;
      if (fsActive) {
        ui.bar.classList.remove('umbra-vc-show');
        continue;
      }
      const overVideo = pointerX >= ui.lastRectLeft && pointerX <= ui.lastRectLeft + ui.lastRectWidth &&
        pointerY >= ui.lastRectTop && pointerY <= ui.lastRectTop + ui.lastRectHeight;
      const overBar = ui.bar.matches(':hover');
      const show = overVideo || overBar || ui.dragging || video.paused;
      if (show) {
        ui.lastPointer = now;
        ui.bar.classList.add('umbra-vc-show');
      } else if (now - ui.lastPointer > 2500) {
        ui.bar.classList.remove('umbra-vc-show');
      }
    }
  }

  function attach(video) {
    if (!eligible(video) || video.dataset.umbraVc === '1') return;
    if (!document.body) return;

    video.dataset.umbraVc = '1';
    attached.add(video);

    // ── controls bar ──
    const bar = document.createElement('div');
    bar.className = 'umbra-vc';

    const playBtn = document.createElement('button');
    playBtn.type = 'button';
    playBtn.title = 'Play / pause';
    const playImg = icon('play');
    playBtn.appendChild(playImg);

    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.title = '-5 s';
    backBtn.appendChild(icon('back5'));

    const fwdBtn = document.createElement('button');
    fwdBtn.type = 'button';
    fwdBtn.title = '+5 s';
    fwdBtn.appendChild(icon('fwd5'));

    const track = document.createElement('div');
    track.className = 'umbra-vc-track';
    const rail = document.createElement('div');
    rail.className = 'umbra-vc-rail';
    const buf = document.createElement('div');
    buf.className = 'umbra-vc-buf';
    const fill = document.createElement('div');
    fill.className = 'umbra-vc-fill';
    rail.appendChild(buf);
    rail.appendChild(fill);
    const knob = document.createElement('div');
    knob.className = 'umbra-vc-knob';
    track.appendChild(rail);
    track.appendChild(knob);

    const time = document.createElement('span');
    time.className = 'umbra-vc-time';
    time.textContent = '0:00 / 0:00';

    const muteBtn = document.createElement('button');
    muteBtn.type = 'button';
    muteBtn.title = 'Mute / unmute';
    const muteImg = icon('mute');
    muteBtn.appendChild(muteImg);

    bar.appendChild(playBtn);
    bar.appendChild(backBtn);
    bar.appendChild(fwdBtn);
    bar.appendChild(track);
    bar.appendChild(time);
    bar.appendChild(muteBtn);

    document.body.appendChild(bar);

    const ui = video._umbraVc = {
      bar, dragging: false, onscreen: false, lastPointer: 0,
      lastRectLeft: 0, lastRectTop: 0, lastRectWidth: 0, lastRectHeight: 0,
    };

    function duration() {
      return isFinite(video.duration) ? video.duration : 0;
    }

    function paint() {
      const d = duration();
      const t = video.currentTime || 0;
      const pct = d > 0 ? Math.min(100, (t / d) * 100) : 0;
      fill.style.width = pct + '%';
      knob.style.left = pct + '%';
      time.textContent = `${fmt(t)} / ${fmt(d)}`;
      try {
        const b = video.buffered;
        if (d > 0 && b.length) {
          buf.style.width = Math.min(100, (b.end(b.length - 1) / d) * 100) + '%';
        }
      } catch (_) {}
      scheduleGeometry();
    }

    function paintPlayState() {
      const paused = video.paused;
      playImg.src = chrome.runtime.getURL(paused ? ICONS.play : ICONS.pause);
      refreshVisibility();
    }

    function paintMute() {
      const muted = video.muted || video.volume === 0;
      muteImg.src = chrome.runtime.getURL(muted ? ICONS.mute : ICONS.speaker);
    }

    function seekFromEvent(e) {
      const rect = rail.getBoundingClientRect();
      const d = duration();
      if (!rect.width || d <= 0) return;
      const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      video.currentTime = ratio * d;
      paint();
    }

    // ── events ──
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });
    backBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.currentTime = Math.max(0, video.currentTime - 5);
    });
    fwdBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.currentTime = Math.min(duration() || video.currentTime + 5, video.currentTime + 5);
    });
    muteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      video.muted = !video.muted;
    });

    track.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      ui.dragging = true;
      bar.classList.add('umbra-vc-drag');
      try { track.setPointerCapture(e.pointerId); } catch (_) {}
      seekFromEvent(e);
    });
    track.addEventListener('pointermove', (e) => {
      if (ui.dragging) seekFromEvent(e);
    });
    const endDrag = () => {
      ui.dragging = false;
      bar.classList.remove('umbra-vc-drag');
      refreshVisibility();
    };
    track.addEventListener('pointerup', endDrag);
    track.addEventListener('pointercancel', endDrag);

    // The bar must not trigger Instagram's own click-to-pause on the video.
    bar.addEventListener('click', (e) => e.stopPropagation());
    bar.addEventListener('pointerdown', (e) => e.stopPropagation());

    video.addEventListener('timeupdate', paint);
    video.addEventListener('progress', paint);
    video.addEventListener('durationchange', paint);
    video.addEventListener('loadedmetadata', paint);
    video.addEventListener('play', paintPlayState);
    video.addEventListener('pause', paintPlayState);
    video.addEventListener('volumechange', paintMute);

    paint();
    paintPlayState();
    paintMute();
    scheduleGeometry();
  }

  function detach(video) {
    delete video.dataset.umbraVc;
    attached.delete(video);
    const ui = video._umbraVc;
    if (ui) {
      ui.bar.remove();
      delete video._umbraVc;
    }
  }

  function scan(root) {
    const scope = root instanceof Element ? root : document;
    const videos = scope === document
      ? document.querySelectorAll('video')
      : (scope.matches && scope.matches('video') ? [scope] : Array.from(scope.querySelectorAll('video')));
    for (const v of videos) attach(v);
  }

  function start() {
    if (observer) return;
    injectStyle();
    scan(document);
    observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE) scan(node);
        }
        // Clean up markers on removed videos so a recycled element re-attaches.
        for (const node of m.removedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          if (node.classList && node.classList.contains('umbra-vc')) continue;
          const vids = node.matches && node.matches('video') ? [node] : node.querySelectorAll ? node.querySelectorAll('video') : [];
          for (const v of vids) delete v.dataset.umbraVc;
        }
      }
      // Re-scan: IG sometimes recycles a <video> in place (new src, same node)
      // or reparents it; a cheap full pass keeps flags and DOM in sync.
      for (const v of document.querySelectorAll('video')) {
        if (!v.isConnected || !eligible(v)) detach(v);
        else attach(v);
      }
      // Remove bars whose video was removed without touching our markers.
      for (const v of Array.from(attached)) {
        if (!v.isConnected || !eligible(v)) detach(v);
      }
      scheduleGeometry();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });

    document.addEventListener('pointermove', (e) => {
      pointerX = e.clientX;
      pointerY = e.clientY;
      refreshVisibility();
    }, { passive: true });
    document.addEventListener('pointerleave', () => {
      pointerX = -1;
      pointerY = -1;
      refreshVisibility();
    }, { passive: true });
    window.addEventListener('scroll', scheduleGeometry, { passive: true, capture: true });
    window.addEventListener('resize', scheduleGeometry, { passive: true });
    document.addEventListener('fullscreenchange', scheduleGeometry);
  }

  function stop() {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    for (const v of Array.from(attached)) detach(v);
    document.getElementById('umbra-vc-css')?.remove();
  }

  chrome.storage.local.get('umbra_ig_video_controls').then(data => {
    enabled = data.umbra_ig_video_controls !== false; // default ON
    if (enabled) start();
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== 'local' || !('umbra_ig_video_controls' in changes)) return;
    enabled = changes.umbra_ig_video_controls.newValue !== false;
    if (enabled) start();
    else stop();
  });
})();
