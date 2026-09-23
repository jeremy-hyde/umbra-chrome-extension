// Umbra — live E2E test against real instagram.com using exported cookies.
//
// Requires: www.instagram.com_cookies (2).txt (Netscape format) at repo root.
// Run:  node tests/umbra-live.test.js [--headed]
// Env:  IG_PROFILE=<username>  (profile used for tag-chip + sort, default: instagram)
//
// What it checks on the REAL site:
//   1. session login works
//   2. native video controls inject + seek on a real reel
//   3. creator tag chip injects on a real profile + tags persist
//   4. a REAL sort (10 reels, by views) runs to completion and the feed is
//      auto-saved into the library (verified via the dashboard page)

const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

function extensionId(dir) {
  const hash = crypto.createHash('sha256').update(dir).digest('hex').slice(0, 32);
  return hash.split('').map(h => String.fromCharCode(97 + parseInt(h, 16))).join('');
}

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch {
  ({ chromium } = require('/home/hyde/.nvm/versions/node/v24.15.0/lib/node_modules/@playwright/cli/node_modules/playwright'));
}

const EXT_DIR = path.resolve(__dirname, '..');
const PROFILE = process.env.IG_PROFILE || 'instagram';
const HEADED = process.argv.includes('--headed');

function parseNetscapeCookies(file) {
  return fs.readFileSync(file, 'utf8').split('\n')
    .filter(l => l.trim() && !l.startsWith('#') || l.startsWith('#HttpOnly_'))
    .map(l => {
      const httpOnly = l.startsWith('#HttpOnly_');
      const line = httpOnly ? l.slice('#HttpOnly_'.length) : l;
      const [domain, , p, secure, expires, name, ...rest] = line.split('\t');
      if (!name) return null;
      const exp = Number(expires);
      return {
        name, value: rest.join('\t'), domain, path: p || '/',
        secure: secure === 'TRUE', httpOnly,
        expires: exp > 0 ? exp : -1,
      };
    }).filter(Boolean);
}

const results = [];
function report(name, ok, extra = '') {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`);
}

async function main() {
  const cookieFile = path.join(EXT_DIR, 'www.instagram.com_cookies (2).txt');
  if (!fs.existsSync(cookieFile)) {
    console.log('Cookie file not found:', cookieFile);
    process.exit(1);
  }
  const cookies = parseNetscapeCookies(cookieFile);
  console.log(`Loaded ${cookies.length} cookies, profile=${PROFILE}`);

  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'umbra-live-'));
  const context = await chromium.launchPersistentContext(userDataDir, {
    executablePath: '/usr/bin/chromium',
    headless: !HEADED,
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      `--disable-extensions-except=${EXT_DIR}`,
      `--load-extension=${EXT_DIR}`,
      '--autoplay-policy=no-user-gesture-required',
    ],
    viewport: { width: 1280, height: 900 },
  });

  await context.addCookies(cookies);
  const extId = extensionId(EXT_DIR);
  console.log('extension id:', extId);

  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  // ---------- 1. login ----------
  await page.goto('https://www.instagram.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  // dismiss possible consent / notification dialogs
  for (const txt of ['Allow all cookies', 'Decline optional cookies', 'Not now', 'Not Now']) {
    const b = page.locator(`button:has-text("${txt}")`).first();
    if (await b.count()) { await b.click().catch(() => {}); await page.waitForTimeout(1500); }
  }

  const loginForm = await page.locator('input[name="username"]').count();
  const isLoginPage = page.url().includes('/accounts/login');
  report('login: session active', loginForm === 0 && !isLoginPage, page.url());
  if (loginForm > 0 || isLoginPage) { await context.close(); return finish(); }

  // ---------- 2. reels: native video controls ----------
  await page.goto('https://www.instagram.com/reels/', { waitUntil: 'domcontentloaded' });
  const hasVideo = await page.waitForSelector('video', { timeout: 30000 }).then(() => true).catch(() => false);
  report('reels: video found', hasVideo);
  if (hasVideo) {
    await page.waitForFunction(() => {
      const v = document.querySelector('video');
      return v && isFinite(v.duration) && v.duration > 0;
    }, { timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(1500);

    const barCount = await page.locator('.umbra-vc').count();
    report('reels: control bar injected', barCount > 0, `count=${barCount}`);

    if (barCount > 0) {
      // IG recycles <video> elements constantly — retry the seek up to 3×,
      // re-resolving the video + track box each attempt.
      let seekOk = false, detail = '';
      for (let attempt = 0; attempt < 3 && !seekOk; attempt++) {
        const vid = page.locator('video[data-umbra-vc="1"]').first();
        const hasMeta = await vid.evaluate(v => v.isConnected && isFinite(v.duration) && v.duration > 0).catch(() => false);
        if (!hasMeta) { await page.waitForTimeout(1000); continue; }
        await vid.hover({ force: true }).catch(() => {});
        await page.waitForTimeout(400);
        const track = page.locator('.umbra-vc.umbra-vc-show .umbra-vc-track').first();
        const box = await track.boundingBox();
        if (!box) { await page.waitForTimeout(800); continue; }
        const before = await vid.evaluate(v => v.currentTime).catch(() => -1);
        const dur = await vid.evaluate(v => v.duration).catch(() => 0);
        await page.mouse.click(box.x + box.width * 0.5, box.y + box.height / 2);
        await page.waitForTimeout(1500);
        const after = await vid.evaluate(v => v.isConnected ? v.currentTime : -1).catch(() => -1);
        detail = `t=${before.toFixed(1)}→${after.toFixed(1)}/${dur.toFixed(1)}`;
        seekOk = after >= 0 && Math.abs(after - dur * 0.5) < Math.max(3, dur * 0.2);
      }
      report('reels: seek via track', seekOk, detail);
    }
  }

  // ---------- 3. profile: tag chip ----------
  await page.goto(`https://www.instagram.com/${PROFILE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const chip = page.locator('.umbra-tag-chip');
  const chipOk = await chip.waitFor({ state: 'visible', timeout: 20000 }).then(() => true).catch(() => false);
  report('profile: tag chip injected', chipOk);
  if (chipOk) {
    await chip.click();
    const input = page.locator('.umbra-tag-pop input');
    if (await input.count()) {
      await input.fill('live-test');
      await page.locator('.umbra-tag-save').click().catch(() => {});
      await page.waitForTimeout(2000);
      const chipText = await chip.textContent();
      // cross-check in IDB via a dashboard page — chip may re-render on SPA nav
      const probe = await context.newPage();
      await probe.goto(`chrome-extension://${extId}/dashboard.html`);
      const stored = await probe.evaluate(async (u) => {
        const rec = await UmbraLibrary.getCreator('instagram', u);
        return rec ? rec.tags : null;
      }, PROFILE).catch(() => null);
      await probe.close();
      const okChip = (chipText || '').includes('live-test');
      const okStore = Array.isArray(stored) && stored.includes('live-test');
      report('profile: tag saved', okChip || okStore, `chip="${chipText?.trim()}" stored=${JSON.stringify(stored)}`);
    } else {
      report('profile: tag popover', false, 'no input');
    }
  }

  // the chip must also appear on the profile's Reels tab
  await page.goto(`https://www.instagram.com/${PROFILE}/reels/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const chipReels = await page.locator('.umbra-tag-chip').first().waitFor({ state: 'attached', timeout: 15000 }).then(() => true).catch(() => false);
  const reelsLabel = chipReels ? (await page.locator('.umbra-tag-chip').first().textContent()) : '';
  report('profile reels: tag chip present', chipReels && (reelsLabel || '').includes('live-test'), (reelsLabel || '').trim());

  // ---------- 4. real sort → auto-save ----------
  // Trigger the sort the same way the popup does, but from an extension page
  // (dashboard) so we can also poll UmbraLibrary afterwards.
  const dash = await context.newPage();
  await dash.goto(`chrome-extension://${extId}/dashboard.html`);
  await dash.waitForFunction(() => typeof UmbraLibrary !== 'undefined', { timeout: 15000 });

  const before = await dash.evaluate(async () => (await UmbraLibrary.getAll()).feeds.length);

  // Stay on the profile GRID — the sort must auto-switch to the Reels tab
  // (grid posts carry no view counts). This exercises the new redirect.
  await page.goto(`https://www.instagram.com/${PROFILE}/`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);

  const sortResp = await dash.evaluate(async (profile) => {
    const tabs = await chrome.tabs.query({ url: '*://www.instagram.com/*' });
    const tab = tabs.find(t => (t.url || '').includes(`/${profile}/`)) || tabs[0];
    if (!tab) return { ok: false, error: 'no instagram tab' };
    return chrome.tabs.sendMessage(tab.id, {
      type: 'umbra_instagram_sort', action: 'refreshPage',
      sortBy: 'views', scopeMode: 'items', scopeValue: '10_reels',
      sort_by: 'views', dates_items: 'items', no_items: '10_reels',
      outlier_scores: false,
    }).then(() => ({ ok: true, tabId: tab.id })).catch(e => ({ ok: false, error: e.message }));
  }, PROFILE);
  report('sort: request accepted', !!sortResp.ok, JSON.stringify(sortResp));
  if (!sortResp.ok) { await context.close(); return finish(); }

  // the extension should auto-navigate the tab to /reels/
  const switched = await page.waitForURL(/\/reels\/?$/, { timeout: 15000 }).then(() => true).catch(() => false);
  report('sort: auto-switched to Reels tab', switched, page.url());

  // Poll the library until a new feed appears (collection scrolls the grid).
  let feedsAfter = before, waited = 0;
  const deadline = Date.now() + 240000;
  while (Date.now() < deadline) {
    await page.waitForTimeout(5000); waited += 5;
    feedsAfter = await dash.evaluate(async () => (await UmbraLibrary.getAll()).feeds.length).catch(() => before);
    if (feedsAfter > before) break;
    if (waited % 30 === 0) {
      const msg = await page.locator('#banner_most_viewed_reels, .sf-message').allTextContents().catch(() => []);
      console.log(`  … waiting for sort (${waited}s) banner=${JSON.stringify(msg).slice(0, 200)}`);
    }
  }
  report('sort: feed auto-saved', feedsAfter > before, `feeds ${before}→${feedsAfter}`);

  if (feedsAfter > before) {
    const data = await dash.evaluate(async () => UmbraLibrary.getAll());
    const itemCount = data.items.length;
    const creator = data.items[0] && (data.items[0].creator || '');
    report('sort: items stored', itemCount > 0, `${itemCount} items, creator=${creator}`);
  }

  await context.close();
  fs.rmSync(userDataDir, { recursive: true, force: true });
  finish();
}

function finish() {
  const passed = results.filter(r => r.ok).length;
  console.log(`\n${passed}/${results.length} passed`);
  process.exit(passed === results.length ? 0 : 1);
}

main().catch(e => { console.error(e); finish(); });
