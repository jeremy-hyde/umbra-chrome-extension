// Umbra — automated extension tests.
// Launches system Chrome with the extension loaded, mocks instagram.com /
// skool.com responses (content scripts inject on URL match regardless of the
// response), and exercises the real features end to end.
//
// Run:  node tests/umbra.test.js [--headed]
//
// Uses the playwright copy bundled with the global @playwright/cli install.

const path = require('path');
const fs = require('fs');
const os = require('os');
const crypto = require('crypto');

// Unpacked extension id = first 16 bytes of sha256(abs path), hex→a-p.
function extensionId(dir) {
  const hash = crypto.createHash('sha256').update(dir).digest('hex').slice(0, 32);
  return hash.split('').map(h => String.fromCharCode(97 + parseInt(h, 16))).join('');
}

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (_) {
  ({ chromium } = require('/home/hyde/.nvm/versions/node/v24.15.0/lib/node_modules/@playwright/cli/node_modules/playwright'));
}

const EXT_DIR = path.resolve(__dirname, '..');
const HEADED = process.argv.includes('--headed');

// Public test assets
const HLS_URL = 'https://test-streams.mux.dev/test_001/stream.m3u8';
const MP4_URL = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

const results = [];
function report(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

// ── mock pages ──────────────────────────────────────────────────────────────

const MOCK_IG_PROFILE = `<!doctype html><html><body>
<main>
  <header><section><h2><span>testcreator</span></h2></section></header>
  <div id="feed"></div>
</main>
</body></html>`;

const MOCK_IG_REELS = `<!doctype html><html><body>
<main><div class="reel"><video src="${MP4_URL}" muted autoplay loop playsinline style="width:400px;height:700px"></video></div></main>
</body></html>`;

const MOCK_SKOOL = `<!doctype html><html><head><title>Skool test video</title></head><body>
<div class="player-wrap"><mux-player><mux-video cast-src="${HLS_URL}?token=testtoken"></mux-video></mux-player></div>
</body></html>`;

function mockHost(page, host, html) {
  return page.route(`https://${host}/**`, route => {
    const url = route.request().url();
    if (/\.(png|jpg|jpeg|svg|ico|css|js|woff2?)(\?|$)/i.test(url)) {
      return route.fulfill({ status: 200, contentType: 'text/plain', body: '' });
    }
    return route.fulfill({ status: 200, contentType: 'text/html', body: html });
  });
}

// ── tests ────────────────────────────────────────────────────────────────────

async function testDashboardEmpty(context, extId) {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extId}/dashboard.html`);
  await page.waitForTimeout(500);
  const empty = await page.locator('.empty h2').textContent().catch(() => '');
  report('dashboard: empty state', /empty/i.test(empty || ''), empty);
  await page.close();
}

async function testDashboardSeeded(context, extId) {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extId}/dashboard.html`);
  await page.waitForFunction(() => typeof window.UmbraLibrary !== 'undefined');
  await page.evaluate(async () => {
    await UmbraLibrary.clearAll();
    await UmbraLibrary.saveFeed({
      ctx: { platform: 'instagram', surface: 'profile', creator: 'alice', sortBy: 'views' },
      items: [
        { userName: 'alice', postID: '101', code: 'AAA', viewCount: 5000, likesCount: 300, commentsCount: 20, createDate: '2026-09-01T00:00:00Z', caption: 'first', mediaType: 2, reelID: '101' },
        { userName: 'alice', postID: '102', code: 'AAB', viewCount: 9000, likesCount: 800, commentsCount: 50, createDate: '2026-09-02T00:00:00Z', caption: 'second', mediaType: 2, reelID: '102' },
        { userName: 'bob', postID: '201', code: 'BBA', viewCount: 120000, likesCount: 4000, commentsCount: 300, createDate: '2026-09-03T00:00:00Z', caption: 'viral one', mediaType: 2, reelID: '201' },
      ],
    });
    await UmbraLibrary.setCreatorTags('instagram', 'alice', ['fitness']);
  });
  await page.reload();
  await page.waitForTimeout(500);

  const stats = await page.locator('#stats').textContent();
  report('dashboard: stats', /2 creators/.test(stats) && /3 items/.test(stats), (stats || '').replace(/\s+/g, ' ').trim());

  const rows = await page.locator('tbody tr').count();
  report('dashboard: rows rendered', rows === 3, `rows=${rows}`);

  const tagChip = await page.locator('#tag-filters .tagchip').first().textContent().catch(() => '');
  report('dashboard: tag chip', tagChip === 'fitness', tagChip);

  // filter by tag → only alice's 2 items
  await page.locator('#tag-filters .tagchip', { hasText: 'fitness' }).click();
  await page.waitForTimeout(200);
  const filtered = await page.locator('tbody tr').count();
  report('dashboard: tag filter', filtered === 2, `rows=${filtered}`);
  await page.locator('#tag-filters .tagchip', { hasText: 'fitness' }).click();

  // sort by views asc → one click flips the default desc order; first row = alice 5K
  await page.locator('thead th', { hasText: 'Views' }).click();
  const firstViews = await page.locator('tbody tr').first().locator('td.num').first().textContent();
  report('dashboard: sort by views', firstViews.trim() === '5K', firstViews);
  await page.close();
}

async function testAutoSaveAndTagChip(context, extId) {
  const page = await context.newPage();
  await mockHost(page, 'www.instagram.com', MOCK_IG_PROFILE);
  await page.goto('https://www.instagram.com/testcreator/');
  await page.waitForTimeout(1500);

  // tag chip injected?
  const chip = page.locator('.umbra-tag-chip');
  const chipOk = await chip.count() > 0;
  report('profile: tag chip injected', chipOk);

  if (chipOk) {
    await chip.click();
    await page.waitForTimeout(300);
    const input = page.locator('.umbra-tag-pop input');
    const popOk = await input.count() > 0;
    report('profile: tag popover opens', popOk);
    if (popOk) {
      await input.fill('client, tier-1');
      await page.locator('.umbra-tag-save').click();
      await page.waitForTimeout(400);
      const label = await chip.textContent();
      report('profile: tags saved to chip', /client/.test(label || ''), label);
    }
  }

  // simulate a completed sort: the MAIN-world sort script posts this message
  await page.evaluate(() => {
    window.postMessage({
      logo_animate_off: true,
      sf_surface: 'profile',
      payload: [
        { userName: 'testcreator', postID: '9001', code: 'ZZ1', viewCount: 777, likesCount: 70, commentsCount: 7, createDate: '2026-09-10T00:00:00Z', caption: 'auto saved', mediaType: 2, reelID: '9001' },
        { userName: 'testcreator', postID: '9002', code: 'ZZ2', viewCount: 888, likesCount: 80, commentsCount: 8, createDate: '2026-09-11T00:00:00Z', caption: 'auto saved 2', mediaType: 2, reelID: '9002' },
      ],
    }, '*');
  });
  await page.waitForTimeout(800);

  const dash = await context.newPage();
  await dash.goto(`chrome-extension://${extId}/dashboard.html`);
  await dash.waitForTimeout(400);
  const body = await dash.locator('tbody').textContent().catch(() => '');
  report('autosave: sort persisted to library', /testcreator/.test(body || '') && /777/.test(body || ''));
  const stats = await dash.locator('#stats').textContent();
  report('autosave: stats updated', /5 items/.test(stats || ''), (stats || '').replace(/\s+/g, ' ').trim());
  await dash.close();
  await page.close();
}

async function testVideoControls(context) {
  const page = await context.newPage();
  await mockHost(page, 'www.instagram.com', MOCK_IG_REELS);
  await page.goto('https://www.instagram.com/reels/');
  await page.waitForTimeout(2000);

  const bar = page.locator('.umbra-vc');
  const ok = await bar.count() > 0;
  report('reels: control bar injected', ok);
  if (!ok) { await page.close(); return; }

  const mini = await page.locator('.umbra-vc-mini').count();
  report('reels: no duplicate mini bar', mini === 0, `count=${mini}`);

  // Wait until the video has metadata (duration known) — autoplay may lag.
  await page.waitForFunction(() => {
    const v = document.querySelector('video');
    return v && isFinite(v.duration) && v.duration > 0;
  }, { timeout: 20000 }).catch(() => {});
  await page.evaluate(() => document.querySelector('video')?.play().catch(() => {}));

  // seek via track click
  const before = await page.evaluate(() => document.querySelector('video')?.currentTime ?? -1);
  const track = page.locator('.umbra-vc-track');
  const box = await track.boundingBox();
  if (box) {
    await track.click({ position: { x: box.width * 0.6, y: box.height / 2 }, force: true });
    await page.waitForTimeout(500);
  }
  const after = await page.evaluate(() => document.querySelector('video')?.currentTime ?? -1);
  const dur = await page.evaluate(() => document.querySelector('video')?.duration ?? 0);
  report('reels: seek via track', after > before && dur > 0 && Math.abs(after - dur * 0.6) < 2, `t=${before.toFixed(1)}→${after.toFixed(1)}/${dur.toFixed(1)}`);

  // ±5s buttons (sample clip is ~5.1s — forward seek clamps at duration)
  await page.evaluate(() => { document.querySelector('video').currentTime = 0; });
  const fwd = page.locator('.umbra-vc button').nth(2);
  await fwd.click({ force: true });
  const t2 = await page.evaluate(() => document.querySelector('video')?.currentTime ?? -1);
  report('reels: +5s button', t2 >= 4.4 && t2 <= 5.2, `t=${t2.toFixed(1)}`);
  await page.close();
}

async function testHlsDownload(context) {
  const page = await context.newPage();
  await mockHost(page, 'skool.com', MOCK_SKOOL);
  await page.goto('https://skool.com/test-community/classroom');
  await page.waitForTimeout(1500);

  const dlBtn = page.locator('.umbra-dl-btn');
  const btnOk = await dlBtn.count() > 0;
  report('skool: download button injected', btnOk);
  if (!btnOk) { await page.close(); return; }

  await dlBtn.first().click();
  await page.waitForTimeout(300);
  const modalOpen = await page.locator('#umbra-video-modal.open').count() > 0;
  report('skool: modal opens', modalOpen);
  const mp4Btn = await page.locator('#umbra-dl-btn').isVisible();
  report('skool: Download .mp4 offered', mp4Btn);
  if (!mp4Btn) { await page.close(); return; }

  const [download] = await Promise.all([
    page.waitForEvent('download', { timeout: 120000 }),
    page.locator('#umbra-dl-btn').click(),
  ]);
  const filename = download.suggestedFilename();
  const dlPath = await download.path();
  const size = dlPath ? fs.statSync(dlPath).size : 0;
  report('skool: HLS → mp4 download', filename.endsWith('.mp4') && size > 100000, `${filename} ${(size / 1048576).toFixed(1)}MB`);

  if (size > 0) {
    const head = Buffer.alloc(12);
    const fd = fs.openSync(dlPath, 'r');
    fs.readSync(fd, head, 0, 12, 0);
    fs.closeSync(fd);
    const isMp4 = head.slice(4, 8).toString() === 'ftyp';
    report('skool: output is valid mp4', isMp4, head.slice(4, 8).toString());
  }
  await page.close();
}

// ── main ─────────────────────────────────────────────────────────────────────

(async () => {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), 'umbra-test-'));
  const context = await chromium.launchPersistentContext(userDataDir, {
    // Branded Google Chrome silently ignores --disable-extensions-except —
    // must use Chromium for extension testing.
    executablePath: '/usr/bin/chromium',
    headless: !HEADED,
    // Playwright passes --disable-extensions by default — it would override
    // --load-extension. Drop it.
    ignoreDefaultArgs: ['--disable-extensions'],
    args: [
      `--disable-extensions-except=${EXT_DIR}`,
      `--load-extension=${EXT_DIR}`,
    ],
  });

  try {
    const extId = extensionId(EXT_DIR);
    console.log('extension id:', extId);

    await testDashboardEmpty(context, extId);
    await testDashboardSeeded(context, extId);
    await testAutoSaveAndTagChip(context, extId);
    await testVideoControls(context);
    await testHlsDownload(context);
  } catch (e) {
    report('suite', false, e.message);
  } finally {
    await context.close();
    fs.rmSync(userDataDir, { recursive: true, force: true });
    const failed = results.filter(r => !r.ok);
    console.log(`\n${results.length - failed.length}/${results.length} passed`);
    process.exit(failed.length ? 1 : 0);
  }
})();
