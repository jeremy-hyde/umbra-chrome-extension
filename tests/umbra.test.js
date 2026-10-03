// Umbra — automated extension tests.
// Launches system Chromium with the extension loaded, mocks skool.com
// responses (content scripts inject on URL match regardless of the
// response), and exercises the real features end to end.
//
// Run:  node tests/umbra.test.js [--headed]
//
// Uses the playwright copy bundled with the global @playwright/cli install.

const path = require('path');
const fs = require('fs');
const os = require('os');

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

const results = [];
function report(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`);
}

// ── mock pages ──────────────────────────────────────────────────────────────

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
