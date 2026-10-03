const STORAGE_KEY = 'umbra_enabled';
const HOST = location.hostname;
const IS_OLD_REDDIT = HOST === 'old.reddit.com';
const IS_GITHUB = HOST === 'github.com';
const IS_SKOOL = HOST === 'skool.com' || HOST.endsWith('.skool.com');
const IS_WHOP = HOST === 'whop.com' || HOST.endsWith('.whop.com');

const REDDIT_CSS = `
  body, .content, .side, #header, #header-bottom-left, #header-bottom-right,
  .titlebox, .usertext-body, .md, .comment, .thing, .link, .self,
  .dropdown.srdrop, .drop-choices, .reddit-infobar,
  .RES-navTop, #sr-header-area {
    background-color: #1a1a1b !important;
    color: #d7dadc !important;
    border-color: #343536 !important;
  }
  #header { background-color: #1a1a1b !important; border-bottom: 1px solid #343536 !important; }
  #header-bottom-left .tabmenu li a,
  #header-bottom-right a,
  #header-bottom-left a { color: #818384 !important; }
  #header-bottom-left .tabmenu li.selected a { color: #d7dadc !important; border-bottom-color: #d7dadc !important; }
  .link .title a, a, a:visited { color: #4fbdba !important; }
  .link .title a:hover { color: #81d4d2 !important; }
  .link .score, .link .tagline, .comment .tagline { color: #818384 !important; }
  .arrow.up, .arrow.upmod { border-bottom-color: #ff6314 !important; }
  .arrow.down, .arrow.downmod { border-top-color: #9494ff !important; }
  .link .flat-list a, .comment .flat-list a { color: #818384 !important; }
  .link .flat-list a:hover, .comment .flat-list a:hover { color: #d7dadc !important; }
  .usertext-body .md blockquote { border-left: 3px solid #343536 !important; }
  .usertext-body .md pre, .usertext-body .md code {
    background-color: #272729 !important;
    color: #ff6314 !important;
    border-color: #343536 !important;
  }
  input, textarea, select {
    background-color: #272729 !important;
    color: #d7dadc !important;
    border-color: #343536 !important;
  }
  .side .spacer { border-color: #343536 !important; }
  .modactions .pretty-button, .pretty-button { background-color: #272729 !important; color: #d7dadc !important; }
  .rounded .thumbnail { filter: brightness(0.85) !important; }
  iframe { max-width: 100% !important; max-height: 80vh !important; }
`;

const GITHUB_CSS = `
  [class*="ContentWrapper-module__contentContainer"] {
    max-width: 1600px !important;
  }
  [class*="IssueViewer-module__metadataSidebar"] {
    width: 240px !important;
  }
  [class*="DiffComparisonViewer-module__Container"] {
    max-width: 1600px !important;
  }
  [class*="prc-PageLayout-Content-"] {
    max-width: none !important;
  }
`;

const GENERIC_CSS = `
  html {
    filter: invert(1) hue-rotate(180deg) !important;
  }
  img, video, iframe, canvas, svg, [style*="background-image"] {
    filter: invert(1) hue-rotate(180deg) !important;
  }
`;

let styleEl = null;

function inject(css) {
  if (styleEl) return;
  styleEl = document.createElement('style');
  styleEl.id = 'umbra-dark';
  styleEl.textContent = css;
  (document.head || document.documentElement).appendChild(styleEl);
}

function eject() {
  if (styleEl) {
    styleEl.remove();
    styleEl = null;
  }
}

function apply(enabled) {
  if (enabled) {
    if (IS_OLD_REDDIT) inject(REDDIT_CSS);
    else inject(GENERIC_CSS);
  } else {
    eject();
  }
}

// ─── Direct in-extension download + transcription ────────────────────────────
// Shared by the Skool and Whop sections. UmbraHls comes from
// shared/hls-download.js, loaded in the isolated world with lib/mux.min.js.
const UMBRA_STT_URL = 'https://openrouter.ai/api/v1/audio/transcriptions';
const UMBRA_STT_MODEL = 'openai/whisper-large-v3-turbo';
const UMBRA_STT_KEY = 'umbra_openrouter_api_key';
const UMBRA_WAV_RATE = 16000;
const UMBRA_WAV_CHUNK_SEC = 600; // ~19 MB per chunk at 16 kHz mono 16-bit (API limit: 25 MB)

function umbraSaveBlob(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

async function umbraResolveLoomMp4(loomId) {
  const res = await fetch(`https://www.loom.com/api/campaigns/sessions/${loomId}/transcoded-url`);
  if (!res.ok) throw new Error(`Loom lookup failed (${res.status}).`);
  const data = await res.json();
  if (!data || !data.url) throw new Error('Loom did not return a video URL.');
  return data.url;
}

// Wistia embed player metadata is public: assets include direct mp4 URLs
// (.bin extension but served as video/mp4) plus the media name.
async function umbraResolveWistia(wistiaId) {
  const res = await fetch(`https://fast.wistia.com/embed/medias/${wistiaId}.json`);
  if (!res.ok) throw new Error(`Wistia lookup failed (${res.status}).`);
  const data = await res.json();
  const assets = (data.media && data.media.assets) || [];
  const asset = ['hd_mp4_video', 'md_mp4_video', 'original', 'iphone_video']
    .map((t) => assets.find((a) => a.type === t)).find(Boolean);
  if (!asset || !asset.url) throw new Error('No downloadable Wistia asset found.');
  return { url: asset.url, name: (data.media && data.media.name) || '' };
}

// Returns a video Blob for the current modal target.
// 'mux' = Mux m3u8 via UmbraHls, 'loom' = Loom mp4 via their public API,
// 'wistia' = Wistia mp4 via their public medias.json API.
async function umbraGetVideoBlob(modal, onProgress) {
  const type = modal.dataset.type;
  if (type === 'mux') {
    const url = modal.dataset.url;
    if (!url || !window.UmbraHls) {
      throw new Error(window.UmbraHls ? 'No stream URL captured.' : 'Direct download is not available on this page.');
    }
    return (await window.UmbraHls.download(url, { onProgress })).blob;
  }
  if (type === 'loom') {
    const mp4Url = await umbraResolveLoomMp4(modal.dataset.loomId);
    const res = await fetch(mp4Url);
    if (!res.ok) throw new Error(`Loom video fetch failed (${res.status}).`);
    return res.blob();
  }
  if (type === 'wistia') {
    const media = await umbraResolveWistia(modal.dataset.wistiaId);
    const res = await fetch(media.url);
    if (!res.ok) throw new Error(`Wistia video fetch failed (${res.status}).`);
    if (media.name) modal.dataset.title = media.name;
    return res.blob();
  }
  throw new Error('In-browser download is not available for this embed. Use the yt-dlp command below.');
}

// Decode a video/audio Blob to mono 16 kHz PCM.
async function umbraExtractPcm(blob) {
  const raw = await blob.arrayBuffer();
  const AC = window.AudioContext || window.webkitAudioContext;
  const actx = new AC();
  let decoded;
  try {
    decoded = await actx.decodeAudioData(raw);
  } catch (err) {
    throw new Error('Could not decode the audio track.');
  } finally {
    actx.close().catch(() => {});
  }
  const off = new OfflineAudioContext(1, Math.max(1, Math.ceil(decoded.duration * UMBRA_WAV_RATE)), UMBRA_WAV_RATE);
  const src = off.createBufferSource();
  src.buffer = decoded;
  src.connect(off.destination);
  src.start(0);
  const rendered = await off.startRendering();
  return rendered.getChannelData(0);
}

function umbraWavBlob(pcm, startIdx, endIdx) {
  const len = endIdx - startIdx;
  const buf = new ArrayBuffer(44 + len * 2);
  const dv = new DataView(buf);
  const writeStr = (o, s) => { for (let i = 0; i < s.length; i++) dv.setUint8(o + i, s.charCodeAt(i)); };
  writeStr(0, 'RIFF');
  dv.setUint32(4, 36 + len * 2, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  dv.setUint32(16, 16, true);
  dv.setUint16(20, 1, true); // PCM
  dv.setUint16(22, 1, true); // mono
  dv.setUint32(24, UMBRA_WAV_RATE, true);
  dv.setUint32(28, UMBRA_WAV_RATE * 2, true);
  dv.setUint16(32, 2, true);
  dv.setUint16(34, 16, true);
  writeStr(36, 'data');
  dv.setUint32(40, len * 2, true);
  for (let i = 0; i < len; i++) {
    const s = Math.max(-1, Math.min(1, pcm[startIdx + i]));
    dv.setInt16(44 + i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
  }
  return new Blob([buf], { type: 'audio/wav' });
}

function umbraGetOpenRouterKey() {
  return new Promise((resolve) => {
    try {
      chrome.storage.local.get({ [UMBRA_STT_KEY]: '' }, (v) => resolve((v && v[UMBRA_STT_KEY]) || ''));
    } catch (_) { resolve(''); }
  });
}

async function umbraTranscribeChunk(wavBlob, apiKey, name) {
  const fd = new FormData();
  fd.append('file', wavBlob, name);
  fd.append('model', UMBRA_STT_MODEL);
  fd.append('response_format', 'verbose_json');
  fd.append('timestamp_granularities[]', 'segment');
  const res = await fetch(UMBRA_STT_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}` },
    body: fd,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data.error && data.error.message) || `Transcription failed (${res.status}).`);
  return data;
}

function umbraSrtTimestamp(sec) {
  const ms = Math.max(0, Math.round(sec * 1000));
  const h = String(Math.floor(ms / 3600000)).padStart(2, '0');
  const m = String(Math.floor((ms % 3600000) / 60000)).padStart(2, '0');
  const s = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  const x = String(ms % 1000).padStart(3, '0');
  return `${h}:${m}:${s},${x}`;
}

function umbraBuildSrt(segments, fallbackText, durationSec) {
  const cues = segments.length
    ? segments
    : [{ start: 0, end: durationSec || 0, text: fallbackText }];
  return cues.map((seg, i) =>
    `${i + 1}\n${umbraSrtTimestamp(seg.start)} --> ${umbraSrtTimestamp(seg.end)}\n${(seg.text || '').trim()}\n`
  ).join('\n');
}

function umbraWireVideoModal(modal) {
  const dlBtn = modal.querySelector('#umbra-dl-btn');
  const tsBtn = modal.querySelector('#umbra-ts-btn');
  const tsCheck = modal.querySelector('#umbra-ts-check');
  const prog = modal.querySelector('#umbra-modal-progress');
  const fill = modal.querySelector('.umbra-prog-fill');
  const pct = modal.querySelector('.umbra-prog-pct');
  const status = modal.querySelector('#umbra-modal-status');

  function setProgress(frac) {
    const p = Math.max(0, Math.min(100, Math.round(frac * 100)));
    if (fill) fill.style.width = p + '%';
    if (pct) pct.textContent = p + '%';
  }
  function setStatus(text, isError) {
    if (!status) return;
    status.textContent = text || '';
    status.classList.toggle('error', !!isError);
  }
  function setBusy(busy) {
    if (dlBtn) { dlBtn.disabled = busy; dlBtn.textContent = 'Download .mp4'; }
    if (tsBtn) { tsBtn.disabled = busy; tsBtn.textContent = 'Transcript'; }
  }

  // Runs Whisper on an already-fetched video Blob and saves .txt + .srt.
  // Progress range: 0.55 → 1 (caller handles the download part).
  async function runTranscription(blob) {
    const apiKey = await umbraGetOpenRouterKey();
    if (!apiKey) throw new Error('No OpenRouter API key — set it on the Umbra Settings page.');
    setStatus('Decoding audio…');
    const pcm = await umbraExtractPcm(blob);
    const durationSec = pcm.length / UMBRA_WAV_RATE;
    const chunkSamples = UMBRA_WAV_CHUNK_SEC * UMBRA_WAV_RATE;
    const nChunks = Math.ceil(pcm.length / chunkSamples);
    const textParts = [];
    const segments = [];
    for (let c = 0; c < nChunks; c++) {
      setStatus(`Transcribing ${nChunks > 1 ? `part ${c + 1}/${nChunks} ` : ''}(${Math.round(Math.min(UMBRA_WAV_CHUNK_SEC, durationSec - c * UMBRA_WAV_CHUNK_SEC))}s audio)…`);
      const wav = umbraWavBlob(pcm, c * chunkSamples, Math.min(pcm.length, (c + 1) * chunkSamples));
      const data = await umbraTranscribeChunk(wav, apiKey, `part-${c + 1}.wav`);
      if (data.text) textParts.push(data.text.trim());
      const offset = c * UMBRA_WAV_CHUNK_SEC;
      for (const seg of data.segments || []) {
        segments.push({ start: seg.start + offset, end: seg.end + offset, text: seg.text });
      }
      setProgress(0.6 + 0.35 * ((c + 1) / nChunks));
    }
    const title = modal.dataset.title || 'transcript';
    const text = textParts.join('\n\n') || '(empty transcript)';
    umbraSaveBlob(new Blob([text], { type: 'text/plain' }), `${title}.txt`);
    umbraSaveBlob(new Blob([umbraBuildSrt(segments, text, durationSec)], { type: 'text/plain' }), `${title}.srt`);
    return durationSec;
  }

  if (dlBtn) dlBtn.addEventListener('click', async () => {
    const withTranscript = !!(tsCheck && tsCheck.checked);
    setBusy(true);
    if (dlBtn) dlBtn.textContent = 'Downloading…';
    if (prog) prog.style.display = 'flex';
    setProgress(0);
    setStatus('');
    try {
      const blob = await umbraGetVideoBlob(modal, (p) => {
        const scale = withTranscript ? 0.5 : 0.95;
        if (p.phase === 'segments' && p.total) setProgress((p.done / p.total) * scale);
        else if (p.phase === 'remux') setProgress(scale + 0.02);
      });
      const filename = `${modal.dataset.title || 'video'}.mp4`;
      umbraSaveBlob(blob, filename);
      let msg = `Saved ${(blob.size / 1048576).toFixed(1)} MB — ${filename}`;
      if (withTranscript) {
        try {
          setProgress(0.55);
          const dur = await runTranscription(blob);
          msg += ` + transcript (${Math.round(dur / 60)} min)`;
        } catch (err) {
          msg += ` — transcript failed: ${err && err.message ? err.message : 'error'}`;
          setProgress(1);
          setStatus(msg, true);
          return;
        }
      }
      setProgress(1);
      setStatus(msg);
    } catch (err) {
      setStatus(`${err && err.message ? err.message : 'Download failed.'} Use the yt-dlp command below.`, true);
    } finally {
      setBusy(false);
    }
  });

  if (tsBtn) tsBtn.addEventListener('click', async () => {
    setBusy(true);
    if (tsBtn) tsBtn.textContent = 'Transcribing…';
    if (prog) prog.style.display = 'flex';
    setProgress(0);
    setStatus('');
    try {
      const apiKey = await umbraGetOpenRouterKey();
      if (!apiKey) throw new Error('No OpenRouter API key — set it on the Umbra Settings page.');
      const blob = await umbraGetVideoBlob(modal, (p) => {
        if (p.phase === 'segments' && p.total) setProgress((p.done / p.total) * 0.5);
        else if (p.phase === 'remux') setProgress(0.52);
      });
      setProgress(0.55);
      const dur = await runTranscription(blob);
      setProgress(1);
      setStatus(`Saved ${modal.dataset.title || 'transcript'}.txt + .srt (${Math.round(dur / 60)} min transcribed)`);
    } catch (err) {
      setStatus(err && err.message ? err.message : 'Transcription failed.', true);
    } finally {
      setBusy(false);
    }
  });
}

// ─── Skool video downloader ──────────────────────────────────────────────────
// skool-intercept.js runs in MAIN world (registered in manifest.json) and
// patches fetch/XHR. This isolated-world script handles UI + messaging only.
if (IS_SKOOL) {

  // Build the download button + modal UI styles once
  const skoolUiCss = `
    .umbra-dl-wrap {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2147483640;
      display: flex;
      gap: 6px;
    }
    .umbra-dl-btn {
      padding: 6px 12px;
      background: rgba(26,26,27,0.88);
      color: #4fbdba;
      border: 1px solid #4fbdba;
      border-radius: 5px;
      font: 600 11px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      backdrop-filter: blur(4px);
      transition: background 0.15s, color 0.15s;
    }
    .umbra-dl-btn:hover { background: #4fbdba; color: #1a1a1b; }

    #umbra-video-modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      z-index: 2147483647;
      align-items: center;
      justify-content: center;
    }
    #umbra-video-modal.open { display: flex; }
    #umbra-video-modal-box {
      background: #1a1a1b;
      border: 1px solid #343536;
      border-radius: 10px;
      padding: 24px 20px 20px;
      width: 480px;
      max-width: 92vw;
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #d7dadc;
    }
    #umbra-video-modal h2 {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #818384;
    }
    #umbra-video-modal .modal-url {
      background: #272729;
      border: 1px solid #343536;
      border-radius: 6px;
      padding: 10px 12px;
      font-size: 11px;
      color: #4fbdba;
      word-break: break-all;
      line-height: 1.6;
    }
    #umbra-video-modal .modal-cmd {
      background: #0d1117;
      border: 1px solid #343536;
      border-radius: 6px;
      padding: 10px 12px;
      font-size: 11px;
      color: #ff6314;
      word-break: break-all;
      line-height: 1.6;
      font-family: 'SFMono-Regular', Consolas, monospace;
    }
    #umbra-video-modal .modal-label {
      font-size: 10px;
      color: #4a4a4b;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    #umbra-video-modal .modal-actions {
      display: flex;
      gap: 8px;
    }
    #umbra-video-modal button {
      flex: 1;
      padding: 9px;
      border-radius: 6px;
      border: 1px solid #343536;
      background: #272729;
      color: #818384;
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s, background 0.15s;
    }
    #umbra-copy-btn:hover { border-color: #4fbdba; color: #4fbdba; background: #0e1918; }
    #umbra-close-modal-btn:hover { border-color: #e06c75; color: #e06c75; background: #1e1617; }
    #umbra-copy-btn.copied { border-color: #4fbdba; color: #4fbdba; background: #0e1918; }
    #umbra-video-modal .modal-help {
      display: flex;
      gap: 10px;
    }
    #umbra-video-modal .modal-help a {
      flex: 1;
      display: block;
      text-align: center;
      padding: 7px;
      border-radius: 6px;
      border: 1px solid #343536;
      background: #272729;
      color: #4a4a4b;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      transition: border-color 0.15s, color 0.15s;
    }
    #umbra-video-modal .modal-help a:hover { border-color: #4fbdba; color: #4fbdba; }
    #umbra-video-modal .modal-instructions {
      font-size: 10px;
      color: #4a4a4b;
      line-height: 1.8;
      border-top: 1px solid #2a2a2b;
      padding-top: 12px;
    }
    #umbra-video-modal .modal-instructions strong { color: #818384; font-weight: 600; }
    #umbra-video-modal .modal-instructions code {
      background: #272729;
      border: 1px solid #343536;
      border-radius: 3px;
      padding: 1px 5px;
      color: #ff6314;
      font-family: 'SFMono-Regular', Consolas, monospace;
      font-size: 10px;
    }
    #umbra-video-modal .modal-progress {
      display: none;
      align-items: center;
      gap: 10px;
    }
    #umbra-video-modal .umbra-prog-track {
      flex: 1;
      height: 4px;
      border-radius: 2px;
      background: #272729;
      overflow: hidden;
    }
    #umbra-video-modal .umbra-prog-fill {
      height: 100%;
      width: 0;
      background: #4fbdba;
      transition: width .2s ease;
    }
    #umbra-video-modal .umbra-prog-pct {
      font-size: 10px;
      color: #4fbdba;
      font-variant-numeric: tabular-nums;
      min-width: 32px;
      text-align: right;
    }
    #umbra-video-modal .modal-status {
      font-size: 10px;
      color: #4fbdba;
      min-height: 12px;
    }
    #umbra-video-modal .modal-status.error { color: #e06c75; }
    #umbra-dl-btn:hover, #umbra-ts-btn:hover { border-color: #4fbdba; color: #4fbdba; background: #0e1918; }
    #umbra-dl-btn:disabled, #umbra-ts-btn:disabled { opacity: .5; cursor: default; }
    #umbra-video-modal .modal-ts-check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      color: #818384;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      user-select: none;
    }
    #umbra-video-modal .modal-ts-check input { accent-color: #4fbdba; margin: 0; }
    #umbra-video-modal .modal-guide-link {
      display: block;
      text-align: center;
      padding: 7px;
      border-radius: 6px;
      border: 1px solid #343536;
      background: #272729;
      color: #4a4a4b;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      transition: border-color 0.15s, color 0.15s;
    }
    #umbra-video-modal .modal-guide-link:hover { border-color: #4fbdba; color: #4fbdba; }
  `;

  const skoolStyleEl = document.createElement('style');
  skoolStyleEl.id = 'umbra-skool';
  skoolStyleEl.textContent = skoolUiCss;
  (document.head || document.documentElement).appendChild(skoolStyleEl);

  // Build modal DOM
  const modal = document.createElement('div');
  modal.id = 'umbra-video-modal';
  modal.innerHTML = `
    <div id="umbra-video-modal-box">
      <h2>UMBRA — Video Download</h2>
      <div class="modal-label">Video URL</div>
      <div class="modal-url" id="umbra-modal-url"></div>
      <div class="modal-actions">
        <button id="umbra-dl-btn" style="display:none">Download .mp4</button>
        <button id="umbra-ts-btn" style="display:none">Transcript</button>
        <button id="umbra-close-modal-btn">Close</button>
      </div>
      <label class="modal-ts-check" id="umbra-ts-check-row" style="display:none"><input type="checkbox" id="umbra-ts-check"> Also save transcript (.txt + .srt)</label>
      <div class="modal-progress" id="umbra-modal-progress"><div class="umbra-prog-track"><div class="umbra-prog-fill"></div></div><span class="umbra-prog-pct"></span></div>
      <div class="modal-status" id="umbra-modal-status"></div>
      <div class="modal-label">yt-dlp command</div>
      <div class="modal-cmd" id="umbra-modal-cmd"></div>
      <div class="modal-actions"><button id="umbra-copy-btn">Copy yt-dlp</button></div>
      <a class="modal-guide-link" id="umbra-guide-link" href="#" target="_blank" rel="noopener">↗ Install &amp; usage guide</a>
    </div>
  `;
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(modal), { once: true });
  // Fallback if DOMContentLoaded already fired
  if (document.body) document.body.appendChild(modal);
  umbraWireVideoModal(modal);
  const guideLink = modal.querySelector('#umbra-guide-link');
  if (guideLink) guideLink.href = chrome.runtime.getURL('options.html');

  document.addEventListener('click', (e) => {
    if (e.target.id === 'umbra-close-modal-btn') modal.classList.remove('open');
    if (e.target === modal) modal.classList.remove('open');

    if (e.target.id === 'umbra-copy-btn') {
      const cmd = document.getElementById('umbra-modal-cmd').textContent;
      navigator.clipboard.writeText(cmd).then(() => {
        e.target.textContent = 'Copied!';
        e.target.classList.add('copied');
        setTimeout(() => { e.target.textContent = 'Copy yt-dlp'; e.target.classList.remove('copied'); }, 1500);
      });
    }


  });

  function openModal(videoUrl, type = 'mux', opts = {}) {
    document.getElementById('umbra-modal-url').textContent = videoUrl;
    const title = document.title.replace(/[/\\:*?"<>|]+/g, ' ').trim() || 'skool-video';
    // 'loom'   = Loom embed (direct mp4 via Loom API, no headers needed)
    // 'wistia' = Wistia embed (direct mp4 via Wistia medias.json API)
    // 'simple' = YouTube (yt-dlp only)
    // 'mux'    = Skool's Mux player (needs Referer + Origin to bypass playback restriction)
    const cmd = type === 'mux'
      ? `yt-dlp -o "${title}.%(ext)s" --add-header "Referer:https://skool.com/" --add-header "Origin:https://skool.com" "${videoUrl}"`
      : `yt-dlp -o "${title}.%(ext)s" "${videoUrl}"`;
    document.getElementById('umbra-modal-cmd').textContent = cmd;
    modal.dataset.url = videoUrl;
    modal.dataset.type = type;
    modal.dataset.title = title;
    modal.dataset.loomId = opts.loomId || '';
    modal.dataset.wistiaId = opts.wistiaId || '';
    const inBrowser = type === 'mux' || type === 'loom' || type === 'wistia';
    const dlBtn = document.getElementById('umbra-dl-btn');
    if (dlBtn) dlBtn.style.display = inBrowser ? '' : 'none';
    const tsBtn = document.getElementById('umbra-ts-btn');
    if (tsBtn) tsBtn.style.display = inBrowser ? '' : 'none';
    const checkRow = document.getElementById('umbra-ts-check-row');
    if (checkRow) checkRow.style.display = inBrowser ? 'flex' : 'none';
    const prog = document.getElementById('umbra-modal-progress');
    if (prog) prog.style.display = 'none';
    const status = document.getElementById('umbra-modal-status');
    if (status) status.textContent = '';
    modal.classList.add('open');
    if (opts.autoTranscript && tsBtn) tsBtn.click();
  }

  // Ask skool-intercept.js (MAIN world) for the captured video URL via postMessage.
  function getPageVideoUrl() {
    return new Promise((resolve) => {
      const nonce = Math.random().toString(36).slice(2);
      const handler = (e) => {
        if (e.source !== window || !e.data || e.data.__umbraType !== 'response_url' || e.data.__umbraNonce !== nonce) return;
        window.removeEventListener('message', handler);
        resolve(e.data.url || null);
      };
      window.addEventListener('message', handler);
      window.postMessage({ __umbraType: 'request_url', __umbraNonce: nonce }, '*');
    });
  }

  function isMasterM3u8(url) {
    return url && url.includes('.m3u8') && url.includes('token=');
  }

  // container = the player wrapper the button was attached to. Always scoped
  // to it first — the document fallback kept grabbing a stale video from a
  // previous lesson after SPA navigation.
  function findVideoSrcInDom(container) {
    const scopes = container ? [container, document] : [document];
    for (const scope of scopes) {
      // 1. mux-player gets its src via JS property (Whop) — invisible from the
      //    isolated world. Its open shadow root holds a <mux-video src> attr.
      const players = scope.querySelectorAll('mux-player');
      const list = (scope.matches && scope.matches('mux-player')) ? [scope, ...players] : [...players];
      for (const p of list) {
        const inner = p.shadowRoot && p.shadowRoot.querySelector('mux-video[src], video[src]');
        const url = inner && inner.getAttribute('src');
        if (isMasterM3u8(url)) return url;
      }
      // 2. <mux-video cast-src="..."> — light DOM child of mux-player,
      //    always holds the master .m3u8 with token even after play starts.
      for (const el of scope.querySelectorAll('mux-video[cast-src]')) {
        const url = el.getAttribute('cast-src');
        if (isMasterM3u8(url)) return url;
      }
      // 3. <mux-video src="..."> or <mux-player src="...">
      for (const el of scope.querySelectorAll('mux-video[src], mux-player[src]')) {
        const url = el.getAttribute('src');
        if (isMasterM3u8(url)) return url;
      }
      // 4. Plain <video> with a non-blob src (fallback)
      for (const vid of scope.querySelectorAll('video[src]')) {
        const url = vid.getAttribute('src');
        if (url && !url.startsWith('blob:')) return url;
      }
    }
    return null;
  }

  // Resolves the video inside a container to { type, url, loomId? }.
  async function resolveVideoTarget(container) {
    // 1. Loom iframe
    const loomIframe = container.querySelector('iframe[src*="loom.com/embed"]');
    if (loomIframe) {
      const match = (loomIframe.src || loomIframe.getAttribute('src') || '').match(/loom\.com\/embed\/([a-f0-9]+)/i);
      if (match) return { type: 'loom', url: `https://www.loom.com/share/${match[1]}`, loomId: match[1] };
    }

    // 2. YouTube iframe
    const ytIframe = container.querySelector('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]');
    if (ytIframe) {
      const match = (ytIframe.src || ytIframe.getAttribute('src') || '').match(/youtube(?:-nocookie)?\.com\/embed\/([^?&"]+)/i);
      if (match) return { type: 'simple', url: `https://www.youtube.com/watch?v=${match[1]}` };
    }

    // 3. Wistia — iframe embed, async embed div (.wistia_async_{id}) or <wistia-player>
    const wistiaIframe = container.querySelector('iframe[src*="wistia.com/embed/iframe"], iframe[src*="wistia.net/embed/iframe"]');
    if (wistiaIframe) {
      const match = (wistiaIframe.src || '').match(/embed\/iframe\/([a-z0-9]+)/i);
      if (match) return { type: 'wistia', url: `https://fast.wistia.net/embed/iframe/${match[1]}`, wistiaId: match[1] };
    }
    const wistiaSel = '[class*="wistia_async_"], wistia-player[media-id]';
    const wistiaEl = (container.matches && container.matches(wistiaSel)) ? container : container.querySelector(wistiaSel);
    if (wistiaEl) {
      const id = ((wistiaEl.className || '').toString().match(/wistia_async_([a-z0-9]+)/i) || [])[1] || wistiaEl.getAttribute('media-id');
      if (id) return { type: 'wistia', url: `https://fast.wistia.net/embed/iframe/${id}`, wistiaId: id };
    }

    // 4. Mux — DOM attributes, scoped to this container first
    const domUrl = findVideoSrcInDom(container);
    if (domUrl) return { type: 'mux', url: domUrl };

    // 5. Intercepted URL from page world
    const intercepted = await getPageVideoUrl();
    return intercepted ? { type: 'mux', url: intercepted } : null;
  }

  function attachDownloadButton(container) {
    if (container.dataset.umbraDlAttached) return;
    container.dataset.umbraDlAttached = '1';
    container.style.position = 'relative';
    const wrap = document.createElement('div');
    wrap.className = 'umbra-dl-wrap';
    const dlBtn = document.createElement('button');
    dlBtn.className = 'umbra-dl-btn';
    dlBtn.textContent = '↓ Download';
    const tsBtn = document.createElement('button');
    tsBtn.className = 'umbra-dl-btn';
    tsBtn.textContent = '↓ Transcript';
    wrap.appendChild(dlBtn);
    wrap.appendChild(tsBtn);
    container.appendChild(wrap);

    dlBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const target = await resolveVideoTarget(container);
      if (target) { openModal(target.url, target.type, { loomId: target.loomId, wistiaId: target.wistiaId }); return; }
      // Nothing captured yet — hint user
      dlBtn.textContent = '▶ Play video first';
      setTimeout(() => { dlBtn.textContent = '↓ Download'; }, 2500);
    });

    tsBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const target = await resolveVideoTarget(container);
      if (!target) {
        tsBtn.textContent = '▶ Play video first';
        setTimeout(() => { tsBtn.textContent = '↓ Transcript'; }, 2500);
        return;
      }
      if (target.type === 'simple') {
        tsBtn.textContent = 'YT unsupported';
        setTimeout(() => { tsBtn.textContent = '↓ Transcript'; }, 2500);
        return;
      }
      openModal(target.url, target.type, { loomId: target.loomId, wistiaId: target.wistiaId, autoTranscript: true });
    });
  }

  // Watch for video player containers appearing in the DOM
  function scanForVideos() {
    // Mux player
    document.querySelectorAll('mux-player').forEach((player) => {
      const container = player.parentElement || player;
      attachDownloadButton(container);
    });
    // Fallback: <mux-video> or plain <video> not inside a mux-player
    document.querySelectorAll('mux-video, video').forEach((vid) => {
      if (vid.closest('mux-player')) return;
      const container = vid.closest('[class*="video"], [class*="player"], [class*="Video"], [class*="Player"]') || vid.parentElement;
      if (container) attachDownloadButton(container);
    });
    // Loom, YouTube and Wistia embeds
    const embedSelectors = [
      'iframe[src*="loom.com/embed"]',
      'iframe[src*="youtube.com/embed"]',
      'iframe[src*="youtube-nocookie.com/embed"]',
      'iframe[src*="wistia.com/embed/iframe"]',
      'iframe[src*="wistia.net/embed/iframe"]',
    ].join(', ');
    document.querySelectorAll(embedSelectors).forEach((iframe) => {
      // Walk up past any overflow:hidden ancestor so the button isn't clipped
      let el = iframe.parentElement;
      while (el && el !== document.body) {
        const ov = getComputedStyle(el).overflow;
        if (ov !== 'hidden') break;
        el = el.parentElement;
      }
      if (el && el !== document.body) attachDownloadButton(el);
    });
    // Wistia non-iframe embeds (async div or <wistia-player>)
    document.querySelectorAll('[class*="wistia_async_"], wistia-player').forEach((el) => {
      if (el.querySelector('iframe[src*="wistia"]')) return; // iframe path handles it
      attachDownloadButton(el);
    });
  }

  const skoolObserver = new MutationObserver(scanForVideos);
  skoolObserver.observe(document.documentElement, { childList: true, subtree: true });
  // Initial scan after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanForVideos);
  } else {
    scanForVideos();
  }
}

// ─── Whop video downloader ───────────────────────────────────────────────────
// whop-intercept.js runs in MAIN world (registered in manifest.json) and
// patches fetch/XHR. This isolated-world script handles UI + messaging only.
// Whop also hosts videos on Mux (stream.mux.com/{id}.m3u8?token=...), so the
// capture logic is identical to Skool's.
if (IS_WHOP) {

  // Build the download button + modal UI styles once
  const whopUiCss = `
    .umbra-dl-wrap {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2147483640;
      display: flex;
      gap: 6px;
    }
    .umbra-dl-btn {
      padding: 6px 12px;
      background: rgba(26,26,27,0.88);
      color: #4fbdba;
      border: 1px solid #4fbdba;
      border-radius: 5px;
      font: 600 11px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      backdrop-filter: blur(4px);
      transition: background 0.15s, color 0.15s;
    }
    .umbra-dl-btn:hover { background: #4fbdba; color: #1a1a1b; }

    #umbra-video-modal {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.7);
      z-index: 2147483647;
      align-items: center;
      justify-content: center;
    }
    #umbra-video-modal.open { display: flex; }
    #umbra-video-modal-box {
      background: #1a1a1b;
      border: 1px solid #343536;
      border-radius: 10px;
      padding: 24px 20px 20px;
      width: 480px;
      max-width: 92vw;
      display: flex;
      flex-direction: column;
      gap: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #d7dadc;
    }
    #umbra-video-modal h2 {
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: #818384;
    }
    #umbra-video-modal .modal-url {
      background: #272729;
      border: 1px solid #343536;
      border-radius: 6px;
      padding: 10px 12px;
      font-size: 11px;
      color: #4fbdba;
      word-break: break-all;
      line-height: 1.6;
    }
    #umbra-video-modal .modal-cmd {
      background: #0d1117;
      border: 1px solid #343536;
      border-radius: 6px;
      padding: 10px 12px;
      font-size: 11px;
      color: #ff6314;
      word-break: break-all;
      line-height: 1.6;
      font-family: 'SFMono-Regular', Consolas, monospace;
    }
    #umbra-video-modal .modal-label {
      font-size: 10px;
      color: #4a4a4b;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    #umbra-video-modal .modal-actions {
      display: flex;
      gap: 8px;
    }
    #umbra-video-modal button {
      flex: 1;
      padding: 9px;
      border-radius: 6px;
      border: 1px solid #343536;
      background: #272729;
      color: #818384;
      font-size: 11px;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      transition: border-color 0.15s, color 0.15s, background 0.15s;
    }
    #umbra-copy-btn:hover { border-color: #4fbdba; color: #4fbdba; background: #0e1918; }
    #umbra-close-modal-btn:hover { border-color: #e06c75; color: #e06c75; background: #1e1617; }
    #umbra-copy-btn.copied { border-color: #4fbdba; color: #4fbdba; background: #0e1918; }
    #umbra-video-modal .modal-help {
      display: flex;
      gap: 10px;
    }
    #umbra-video-modal .modal-help a {
      flex: 1;
      display: block;
      text-align: center;
      padding: 7px;
      border-radius: 6px;
      border: 1px solid #343536;
      background: #272729;
      color: #4a4a4b;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      transition: border-color 0.15s, color 0.15s;
    }
    #umbra-video-modal .modal-help a:hover { border-color: #4fbdba; color: #4fbdba; }
    #umbra-video-modal .modal-instructions {
      font-size: 10px;
      color: #4a4a4b;
      line-height: 1.8;
      border-top: 1px solid #2a2a2b;
      padding-top: 12px;
    }
    #umbra-video-modal .modal-instructions strong { color: #818384; font-weight: 600; }
    #umbra-video-modal .modal-instructions code {
      background: #272729;
      border: 1px solid #343536;
      border-radius: 3px;
      padding: 1px 5px;
      color: #ff6314;
      font-family: 'SFMono-Regular', Consolas, monospace;
      font-size: 10px;
    }
    #umbra-video-modal .modal-progress {
      display: none;
      align-items: center;
      gap: 10px;
    }
    #umbra-video-modal .umbra-prog-track {
      flex: 1;
      height: 4px;
      border-radius: 2px;
      background: #272729;
      overflow: hidden;
    }
    #umbra-video-modal .umbra-prog-fill {
      height: 100%;
      width: 0;
      background: #4fbdba;
      transition: width .2s ease;
    }
    #umbra-video-modal .umbra-prog-pct {
      font-size: 10px;
      color: #4fbdba;
      font-variant-numeric: tabular-nums;
      min-width: 32px;
      text-align: right;
    }
    #umbra-video-modal .modal-status {
      font-size: 10px;
      color: #4fbdba;
      min-height: 12px;
    }
    #umbra-video-modal .modal-status.error { color: #e06c75; }
    #umbra-dl-btn:hover, #umbra-ts-btn:hover { border-color: #4fbdba; color: #4fbdba; background: #0e1918; }
    #umbra-dl-btn:disabled, #umbra-ts-btn:disabled { opacity: .5; cursor: default; }
    #umbra-video-modal .modal-ts-check {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 10px;
      color: #818384;
      letter-spacing: 1px;
      text-transform: uppercase;
      cursor: pointer;
      user-select: none;
    }
    #umbra-video-modal .modal-ts-check input { accent-color: #4fbdba; margin: 0; }
    #umbra-video-modal .modal-guide-link {
      display: block;
      text-align: center;
      padding: 7px;
      border-radius: 6px;
      border: 1px solid #343536;
      background: #272729;
      color: #4a4a4b;
      font-size: 10px;
      letter-spacing: 1px;
      text-transform: uppercase;
      text-decoration: none;
      transition: border-color 0.15s, color 0.15s;
    }
    #umbra-video-modal .modal-guide-link:hover { border-color: #4fbdba; color: #4fbdba; }
  `;

  const whopStyleEl = document.createElement('style');
  whopStyleEl.id = 'umbra-whop';
  whopStyleEl.textContent = whopUiCss;
  (document.head || document.documentElement).appendChild(whopStyleEl);

  // Build modal DOM
  const modal = document.createElement('div');
  modal.id = 'umbra-video-modal';
  modal.innerHTML = `
    <div id="umbra-video-modal-box">
      <h2>UMBRA — Video Download</h2>
      <div class="modal-label">Video URL</div>
      <div class="modal-url" id="umbra-modal-url"></div>
      <div class="modal-actions">
        <button id="umbra-dl-btn" style="display:none">Download .mp4</button>
        <button id="umbra-ts-btn" style="display:none">Transcript</button>
        <button id="umbra-close-modal-btn">Close</button>
      </div>
      <label class="modal-ts-check" id="umbra-ts-check-row" style="display:none"><input type="checkbox" id="umbra-ts-check"> Also save transcript (.txt + .srt)</label>
      <div class="modal-progress" id="umbra-modal-progress"><div class="umbra-prog-track"><div class="umbra-prog-fill"></div></div><span class="umbra-prog-pct"></span></div>
      <div class="modal-status" id="umbra-modal-status"></div>
      <div class="modal-label">yt-dlp command</div>
      <div class="modal-cmd" id="umbra-modal-cmd"></div>
      <div class="modal-actions"><button id="umbra-copy-btn">Copy yt-dlp</button></div>
      <a class="modal-guide-link" id="umbra-guide-link" href="#" target="_blank" rel="noopener">↗ Install &amp; usage guide</a>
    </div>
  `;
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(modal), { once: true });
  // Fallback if DOMContentLoaded already fired
  if (document.body) document.body.appendChild(modal);
  umbraWireVideoModal(modal);
  const guideLink = modal.querySelector('#umbra-guide-link');
  if (guideLink) guideLink.href = chrome.runtime.getURL('options.html');

  document.addEventListener('click', (e) => {
    if (e.target.id === 'umbra-close-modal-btn') modal.classList.remove('open');
    if (e.target === modal) modal.classList.remove('open');

    if (e.target.id === 'umbra-copy-btn') {
      const cmd = document.getElementById('umbra-modal-cmd').textContent;
      navigator.clipboard.writeText(cmd).then(() => {
        e.target.textContent = 'Copied!';
        e.target.classList.add('copied');
        setTimeout(() => { e.target.textContent = 'Copy yt-dlp'; e.target.classList.remove('copied'); }, 1500);
      });
    }


  });

  function openModal(videoUrl, type = 'mux', opts = {}) {
    document.getElementById('umbra-modal-url').textContent = videoUrl;
    const title = (findWhopVideoTitle() || document.title).replace(/[/\\:*?"<>|]+/g, ' ').trim() || 'whop-video';
    // 'loom'   = Loom embed (direct mp4 via Loom API, no headers needed)
    // 'wistia' = Wistia embed (direct mp4 via Wistia medias.json API)
    // 'simple' = YouTube (yt-dlp only)
    // 'mux'    = Whop's Mux player (needs Referer + Origin to bypass playback restriction)
    const cmd = type === 'mux'
      ? `yt-dlp -o "${title}.%(ext)s" --add-header "Referer:https://whop.com/" --add-header "Origin:https://whop.com" "${videoUrl}"`
      : `yt-dlp -o "${title}.%(ext)s" "${videoUrl}"`;
    document.getElementById('umbra-modal-cmd').textContent = cmd;
    modal.dataset.url = videoUrl;
    modal.dataset.type = type;
    modal.dataset.title = title;
    modal.dataset.loomId = opts.loomId || '';
    modal.dataset.wistiaId = opts.wistiaId || '';
    const inBrowser = type === 'mux' || type === 'loom' || type === 'wistia';
    const dlBtn = document.getElementById('umbra-dl-btn');
    if (dlBtn) dlBtn.style.display = inBrowser ? '' : 'none';
    const tsBtn = document.getElementById('umbra-ts-btn');
    if (tsBtn) tsBtn.style.display = inBrowser ? '' : 'none';
    const checkRow = document.getElementById('umbra-ts-check-row');
    if (checkRow) checkRow.style.display = inBrowser ? 'flex' : 'none';
    const prog = document.getElementById('umbra-modal-progress');
    if (prog) prog.style.display = 'none';
    const status = document.getElementById('umbra-modal-status');
    if (status) status.textContent = '';
    modal.classList.add('open');
    if (opts.autoTranscript && tsBtn) tsBtn.click();
  }

  // Ask whop-intercept.js (MAIN world) for the captured video URL via postMessage.
  function getPageVideoUrl() {
    return new Promise((resolve) => {
      const nonce = Math.random().toString(36).slice(2);
      const handler = (e) => {
        if (e.source !== window || !e.data || e.data.__umbraType !== 'response_url' || e.data.__umbraNonce !== nonce) return;
        window.removeEventListener('message', handler);
        resolve(e.data.url || null);
      };
      window.addEventListener('message', handler);
      window.postMessage({ __umbraType: 'request_url', __umbraNonce: nonce }, '*');
    });
  }

  function isMasterM3u8(url) {
    return url && url.includes('.m3u8') && url.includes('token=');
  }

  // container = the player wrapper the button was attached to. Always scoped
  // to it first — the document fallback kept grabbing a stale video from a
  // previous lesson after SPA navigation.
  function findVideoSrcInDom(container) {
    const scopes = container ? [container, document] : [document];
    for (const scope of scopes) {
      // 1. mux-player gets its src via JS property (Whop) — invisible from the
      //    isolated world. Its open shadow root holds a <mux-video src> attr.
      const players = scope.querySelectorAll('mux-player');
      const list = (scope.matches && scope.matches('mux-player')) ? [scope, ...players] : [...players];
      for (const p of list) {
        const inner = p.shadowRoot && p.shadowRoot.querySelector('mux-video[src], video[src]');
        const url = inner && inner.getAttribute('src');
        if (isMasterM3u8(url)) return url;
      }
      // 2. <mux-video cast-src="..."> — light DOM child of mux-player,
      //    always holds the master .m3u8 with token even after play starts.
      for (const el of scope.querySelectorAll('mux-video[cast-src]')) {
        const url = el.getAttribute('cast-src');
        if (isMasterM3u8(url)) return url;
      }
      // 3. <mux-video src="..."> or <mux-player src="...">
      for (const el of scope.querySelectorAll('mux-video[src], mux-player[src]')) {
        const url = el.getAttribute('src');
        if (isMasterM3u8(url)) return url;
      }
      // 4. Plain <video> with a non-blob src (fallback)
      for (const vid of scope.querySelectorAll('video[src]')) {
        const url = vid.getAttribute('src');
        if (url && !url.startsWith('blob:')) return url;
      }
    }
    return null;
  }

  // Whop lesson pages show "Module" + "Lesson" as two stacked spans in the
  // same column as the player (page <title> is just "Formation | … | Whop").
  function findWhopVideoTitle() {
    const player = document.querySelector('mux-player, video');
    const scope = (player && player.closest('div.flex.flex-col')) || document;
    for (const block of scope.querySelectorAll('div.flex.flex-col.gap-2')) {
      const spans = block.querySelectorAll(':scope > span');
      if (spans.length === 2 && spans[1].classList.contains('font-semibold')) {
        const lesson = spans[1].textContent.trim();
        const module = spans[0].textContent.trim();
        if (lesson) return module ? `${module} - ${lesson}` : lesson;
      }
    }
    return null;
  }

  // Resolves the video inside a container to { type, url, loomId? }.
  async function resolveVideoTarget(container) {
    // 1. Loom iframe
    const loomIframe = container.querySelector('iframe[src*="loom.com/embed"]');
    if (loomIframe) {
      const match = (loomIframe.src || loomIframe.getAttribute('src') || '').match(/loom\.com\/embed\/([a-f0-9]+)/i);
      if (match) return { type: 'loom', url: `https://www.loom.com/share/${match[1]}`, loomId: match[1] };
    }

    // 2. YouTube iframe
    const ytIframe = container.querySelector('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]');
    if (ytIframe) {
      const match = (ytIframe.src || ytIframe.getAttribute('src') || '').match(/youtube(?:-nocookie)?\.com\/embed\/([^?&"]+)/i);
      if (match) return { type: 'simple', url: `https://www.youtube.com/watch?v=${match[1]}` };
    }

    // 3. Wistia — iframe embed, async embed div (.wistia_async_{id}) or <wistia-player>
    const wistiaIframe = container.querySelector('iframe[src*="wistia.com/embed/iframe"], iframe[src*="wistia.net/embed/iframe"]');
    if (wistiaIframe) {
      const match = (wistiaIframe.src || '').match(/embed\/iframe\/([a-z0-9]+)/i);
      if (match) return { type: 'wistia', url: `https://fast.wistia.net/embed/iframe/${match[1]}`, wistiaId: match[1] };
    }
    const wistiaSel = '[class*="wistia_async_"], wistia-player[media-id]';
    const wistiaEl = (container.matches && container.matches(wistiaSel)) ? container : container.querySelector(wistiaSel);
    if (wistiaEl) {
      const id = ((wistiaEl.className || '').toString().match(/wistia_async_([a-z0-9]+)/i) || [])[1] || wistiaEl.getAttribute('media-id');
      if (id) return { type: 'wistia', url: `https://fast.wistia.net/embed/iframe/${id}`, wistiaId: id };
    }

    // 4. Mux — DOM attributes, scoped to this container first
    const domUrl = findVideoSrcInDom(container);
    if (domUrl) return { type: 'mux', url: domUrl };

    // 5. Intercepted URL from page world
    const intercepted = await getPageVideoUrl();
    return intercepted ? { type: 'mux', url: intercepted } : null;
  }

  function attachDownloadButton(container) {
    if (container.dataset.umbraDlAttached) return;
    container.dataset.umbraDlAttached = '1';
    container.style.position = 'relative';
    const wrap = document.createElement('div');
    wrap.className = 'umbra-dl-wrap';
    const dlBtn = document.createElement('button');
    dlBtn.className = 'umbra-dl-btn';
    dlBtn.textContent = '↓ Download';
    const tsBtn = document.createElement('button');
    tsBtn.className = 'umbra-dl-btn';
    tsBtn.textContent = '↓ Transcript';
    wrap.appendChild(dlBtn);
    wrap.appendChild(tsBtn);
    container.appendChild(wrap);

    dlBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const target = await resolveVideoTarget(container);
      if (target) { openModal(target.url, target.type, { loomId: target.loomId, wistiaId: target.wistiaId }); return; }
      // Nothing captured yet — hint user
      dlBtn.textContent = '▶ Play video first';
      setTimeout(() => { dlBtn.textContent = '↓ Download'; }, 2500);
    });

    tsBtn.addEventListener('click', async (e) => {
      e.stopPropagation();
      e.preventDefault();
      const target = await resolveVideoTarget(container);
      if (!target) {
        tsBtn.textContent = '▶ Play video first';
        setTimeout(() => { tsBtn.textContent = '↓ Transcript'; }, 2500);
        return;
      }
      if (target.type === 'simple') {
        tsBtn.textContent = 'YT unsupported';
        setTimeout(() => { tsBtn.textContent = '↓ Transcript'; }, 2500);
        return;
      }
      openModal(target.url, target.type, { loomId: target.loomId, wistiaId: target.wistiaId, autoTranscript: true });
    });
  }

  // Watch for video player containers appearing in the DOM
  function scanForVideos() {
    // Mux player
    document.querySelectorAll('mux-player').forEach((player) => {
      const container = player.parentElement || player;
      attachDownloadButton(container);
    });
    // Fallback: <mux-video> or plain <video> not inside a mux-player
    document.querySelectorAll('mux-video, video').forEach((vid) => {
      if (vid.closest('mux-player')) return;
      const container = vid.closest('[class*="video"], [class*="player"], [class*="Video"], [class*="Player"]') || vid.parentElement;
      if (container) attachDownloadButton(container);
    });
    // Loom, YouTube and Wistia embeds
    const embedSelectors = [
      'iframe[src*="loom.com/embed"]',
      'iframe[src*="youtube.com/embed"]',
      'iframe[src*="youtube-nocookie.com/embed"]',
      'iframe[src*="wistia.com/embed/iframe"]',
      'iframe[src*="wistia.net/embed/iframe"]',
    ].join(', ');
    document.querySelectorAll(embedSelectors).forEach((iframe) => {
      // Walk up past any overflow:hidden ancestor so the button isn't clipped
      let el = iframe.parentElement;
      while (el && el !== document.body) {
        const ov = getComputedStyle(el).overflow;
        if (ov !== 'hidden') break;
        el = el.parentElement;
      }
      if (el && el !== document.body) attachDownloadButton(el);
    });
    // Wistia non-iframe embeds (async div or <wistia-player>)
    document.querySelectorAll('[class*="wistia_async_"], wistia-player').forEach((el) => {
      if (el.querySelector('iframe[src*="wistia"]')) return; // iframe path handles it
      attachDownloadButton(el);
    });
  }

  const whopObserver = new MutationObserver(scanForVideos);
  whopObserver.observe(document.documentElement, { childList: true, subtree: true });
  // Initial scan after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanForVideos);
  } else {
    scanForVideos();
  }
}

// ─── Notion page → Markdown download ─────────────────────────────────────────
const IS_NOTION = /(^|\.)notion\.(so|site|com)$/.test(location.hostname);

if (IS_NOTION) {
  chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type !== 'umbra_notion_download') return false;

    // Expand all toggles asynchronously, then extract
    expandAllToggles().then((parentMap) => {
      try {
        const { title, markdown } = extractNotionPageMarkdown(parentMap);
        downloadMarkdownFile(title, markdown);
        sendResponse({ ok: true });
      } catch (err) {
        sendResponse({ ok: false, error: err.message });
      }
    }).catch(err => {
      sendResponse({ ok: false, error: err.message });
    });
    return true; // async response
  });

  // ── Toggle expansion ──────────────────────────────────────────────────
  // Notion lazy-loads toggle children — they only appear in the DOM after
  // the toggle is clicked.  We click all closed toggles iteratively
  // because expanding a parent may reveal new nested closed toggles.
  //
  // Returns a Map<childBlockId, parentBlockId> so the extractor knows
  // which blocks belong to which toggle/header container.
  async function expandAllToggles() {
    const CLICK_DELAY = 60;
    const LOAD_DELAY  = 350; // wait for Notion API response + DOM update
    const MAX_PASSES  = 30;

    const parentMap = new Map();       // child block id → parent block id
    const knownBlockIds = new Set();   // block ids we've already seen

    // Seed with blocks that already exist in the DOM
    for (const b of document.querySelectorAll('[data-block-id]')) {
      knownBlockIds.add(b.getAttribute('data-block-id'));
    }

    let totalExpanded = 0;

    for (let pass = 0; pass < MAX_PASSES; pass++) {
      const closed = document.querySelectorAll([
        '.notion-toggle-block [role="button"][aria-expanded="false"]',
        '.notion-header-block [role="button"][aria-expanded="false"]',
      ].join(', '));

      if (closed.length === 0) break;

      for (const btn of closed) {
        const toggleBlock = btn.closest('[data-block-id]');
        const parentId = toggleBlock && toggleBlock.getAttribute('data-block-id');

        btn.click();
        totalExpanded++;
        await new Promise(r => setTimeout(r, CLICK_DELAY));
        await new Promise(r => setTimeout(r, LOAD_DELAY));

        // Newly appeared blocks are children of this toggle
        if (parentId) {
          for (const b of document.querySelectorAll('[data-block-id]')) {
            const bid = b.getAttribute('data-block-id');
            if (!knownBlockIds.has(bid)) {
              knownBlockIds.add(bid);
              parentMap.set(bid, parentId);
            }
          }
        }
      }

      await new Promise(r => setTimeout(r, LOAD_DELAY));
    }

    console.log(`Umbra: expanded ${totalExpanded} toggle(s), ${parentMap.size} child blocks tracked`);
    return parentMap;
  }

  // ── Extraction ────────────────────────────────────────────────────────
  function extractNotionPageMarkdown(parentMap) {
    const title = getNotionTitle();
    const pageContent = findNotionContentArea();

    if (!pageContent) {
      return { title, markdown: `# ${title}\n\n*Could not locate page content area.*` };
    }

    const allBlocks = Array.from(pageContent.querySelectorAll('[data-block-id]'))
      // Skip the page-title block (we already extracted it)
      .filter(b => !/notion-page-block/.test(b.className || ''));
    if (!allBlocks.length) {
      return { title, markdown: `# ${title}\n\n*No blocks found.*` };
    }

    // Build a Set of child block ids for fast lookup
    const childIds = new Set(parentMap.keys());

    const md = '# ' + title + '\n\n' + parseBlockRange(allBlocks, parentMap, childIds);
    return { title, markdown: md.trim() };
  }

  // ── Recursive block-range parser ──────────────────────────────────────
  // parentMap links child blocks to their parent containers.
  // childIds  is used ONLY at the top level to skip blocks already
  //            handled by a parent container. Recursive calls pass an empty
  //            Set because children[] is already pre-filtered.
  function parseBlockRange(allBlocks, parentMap, childIds) {
    return parseFromIndex(allBlocks, 0, parentMap, childIds).markdown;
  }

  function parseFromIndex(allBlocks, startIdx, parentMap, childIds) {
    let md = '';
    let i = startIdx;
    let listBuffer = [];
    let listType = null; // 'bullet' | 'number' | 'todo'

    function flushList() {
      if (!listBuffer.length) return;
      for (let j = 0; j < listBuffer.length; j++) {
        const prefix = listType === 'number' ? `${j + 1}. ` : listType === 'todo' ? '- [ ] ' : '- ';
        md += prefix + listBuffer[j] + '\n';
      }
      md += '\n';
      listBuffer = [];
      listType = null;
    }

    while (i < allBlocks.length) {
      const block = allBlocks[i];
      const blockId = block.getAttribute('data-block-id');

      // Skip blocks that are children of a container (parent renders them).
      // childIds is only populated at the top level; recursive calls
      // receive an empty Set because their blocks[] is already filtered.
      if (childIds.has(blockId)) { i++; continue; }

      const type = detectBlockType(block);
      const text = extractInlineMarkdown(block);

      // Gather children from the parentMap
      const children = [];
      for (let j = i + 1; j < allBlocks.length; j++) {
        const cid = allBlocks[j].getAttribute('data-block-id');
        if (parentMap.get(cid) === blockId) children.push(allBlocks[j]);
      }

      const hasChildren = children.length > 0;
      const isContainer = type === 'toggle' || type === 'heading_1' || type === 'heading_2' || type === 'heading_3';

      if (hasChildren && isContainer) {
        flushList();
        if (type === 'toggle') {
          md += '<details>\n<summary>' + (text || 'Toggle') + '</summary>\n\n';
          // children[] is already filtered — pass empty Set below
          md += parseFromIndex(children, 0, parentMap, new Set()).markdown;
          md += '\n</details>\n\n';
        } else {
          const prefix = type === 'heading_1' ? '# ' : type === 'heading_2' ? '## ' : '### ';
          md += prefix + text + '\n\n';
          md += parseFromIndex(children, 0, parentMap, new Set()).markdown;
        }
        i++;
        continue;
      }

      // Consecutive list items get grouped
      if (type === 'bulleted_list' || type === 'numbered_list' || type === 'to_do') {
        const mapped = type === 'bulleted_list' ? 'bullet' : type === 'numbered_list' ? 'number' : 'todo';
        if (listType && listType !== mapped) flushList();
        listType = mapped;
        listBuffer.push(text);
        i++;
        continue;
      }

      flushList();

      switch (type) {
        case 'heading_1': md += '# ' + text + '\n\n'; break;
        case 'heading_2': md += '## ' + text + '\n\n'; break;
        case 'heading_3': md += '### ' + text + '\n\n'; break;
        case 'toggle':
          md += '<details>\n<summary>' + (text || 'Toggle') + '</summary>\n\n\n</details>\n\n';
          break;
        case 'code':     md += codeBlockMarkdown(block) + '\n\n'; break;
        case 'image':    md += imageMarkdown(block) + '\n\n'; break;
        case 'embed':    md += embedMarkdown(block) + '\n\n'; break;
        case 'divider':  md += '---\n\n'; break;
        case 'quote':    md += '> ' + text.replace(/\n/g, '\n> ') + '\n\n'; break;
        case 'callout':  md += '> 💡 ' + text + '\n\n'; break;
        default:
          if (text) md += text + '\n\n';
          break;
      }
      i++;
    }

    flushList();
    return { markdown: md, nextIdx: i };
  }

  function getNotionTitle() {
    // Public notion.site pages: title is in an <h1> inside the page header
    const publicTitle = document.querySelector('h1.notion-title, header h1, [class*="page-title"] h1, .notion-header h1');
    if (publicTitle && publicTitle.textContent.trim()) return publicTitle.textContent.trim();

    // Editable notion.so pages
    const titleCandidates = [
      document.querySelector('.notion-scroller [placeholder="Untitled"]'),
      document.querySelector('[data-content-editable-leaf="true"]'),
      document.querySelector('.notion-page-content h1'),
    ];
    for (const el of titleCandidates) {
      const text = el && el.textContent && el.textContent.trim();
      if (text) return text;
    }
    return document.title.replace(/\s*[-–—|]\s*Notion\s*$/i, '').trim() || 'Notion Page';
  }

  function findNotionContentArea() {
    const selectors = [
      '.notion-page-content',
      '.notion-scroller',
      '.notion-frame .notion-scroller',
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el && el.querySelector('[data-block-id]')) return el;
    }
    // Last resort: find element with most data-block-id children
    const allBlockContainers = new Map();
    for (const block of document.querySelectorAll('[data-block-id]')) {
      const parent = block.parentElement;
      if (parent) allBlockContainers.set(parent, (allBlockContainers.get(parent) || 0) + 1);
    }
    let best = null;
    let max = 0;
    for (const [el, count] of allBlockContainers) {
      if (count > max) { max = count; best = el; }
    }
    return best;
  }

  function detectBlockType(block) {
    // Check the block's class for explicit Notion block types first
    const cls = block.className || '';

    if (/notion-toggle-block/.test(cls)) return 'toggle';

    if (/notion-header-block/.test(cls)) {
      const inner = block.firstElementChild;
      if (inner) {
        const fs = parseFloat(getComputedStyle(inner).fontSize);
        if (fs >= 24) return 'heading_1';
        if (fs >= 20) return 'heading_2';
      }
      return 'heading_3';
    }

    if (/notion-bulleted_list-block/.test(cls)) return 'bulleted_list';
    if (/notion-numbered_list-block/.test(cls)) return 'numbered_list';
    if (/notion-to_do-block/.test(cls)) return 'to_do';
    if (/notion-sub_header-block/.test(cls)) return 'heading_2';
    if (/notion-sub_sub_header-block/.test(cls)) return 'heading_3';
    if (/notion-code-block/.test(cls)) return 'code';
    if (/notion-divider-block/.test(cls)) return 'divider';
    if (/notion-callout-block/.test(cls)) return 'callout';
    if (/notion-quote-block/.test(cls)) return 'quote';
    if (/notion-image-block/.test(cls)) return 'image';
    if (/notion-embed-block/.test(cls)) return 'embed';
    if (/notion-video-block/.test(cls)) return 'embed';

    // Fallback: examine DOM structure
    const inner = block.firstElementChild;
    if (!inner) return 'paragraph';

    // Images (non-emoji, non-icon)
    const imgs = inner.querySelectorAll('img');
    for (const img of imgs) {
      if (!/emoji|icon/i.test(img.className || '') && !/emoji|icon/i.test(img.alt || '') && img.naturalWidth > 20) {
        return 'image';
      }
    }

    // Code blocks
    if (inner.querySelector('pre, [class*="code"] pre, [class*="Code"] pre')) return 'code';

    // Dividers
    if (inner.querySelector('hr, [class*="divider"], [class*="Divider"]')) return 'divider';

    // Check CSS pseudo-element for list markers
    const beforeContent = window.getComputedStyle(inner, '::before').getPropertyValue('content');
    const cleaned = beforeContent.replace(/['"]/g, '');
    if (cleaned && cleaned !== 'none' && cleaned !== 'normal') {
      if (/^\d+[\.)]?\s*$/.test(cleaned)) return 'numbered_list';
      if (/[•●○▪▸►]/.test(cleaned)) return 'bulleted_list';
    }

    // To-do checkbox
    if (inner.querySelector('[role="checkbox"], input[type="checkbox"], [class*="checkbox" i], [class*="Checkbox"]')) {
      return 'to_do';
    }

    // Toggle (disclosure triangle)
    if (inner.querySelector('[class*="toggle" i], [class*="triangle" i], [class*="disclosure" i], [class*="chevron" i]')) {
      return 'toggle';
    }

    // Headings via font-size + font-weight (Notion renders them as styled divs, not <h1>)
    const fontSize = parseFloat(window.getComputedStyle(inner).fontSize);
    const fontWeight = parseInt(window.getComputedStyle(inner).fontWeight) || 400;
    if (fontWeight >= 600) {
      if (fontSize >= 28) return 'heading_1';
      if (fontSize >= 22) return 'heading_2';
      if (fontSize >= 17) return 'heading_3';
    }

    // Callout — colored background block
    const bg = window.getComputedStyle(inner).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && !bg.startsWith('rgb(26, 26, 27')) {
      return 'callout';
    }

    // Quote — noticeable left border
    const blw = parseInt(window.getComputedStyle(inner).borderLeftWidth) || 0;
    if (blw >= 2) return 'quote';

    return 'paragraph';
  }

  function extractInlineMarkdown(block) {
    // Find the text-bearing element that holds ONLY this block's own text.
    // Container blocks (toggles, headers) have nested [data-block-id] children
    // after the label — we must NOT descend into those.
    const labelEl = block.querySelector('[data-content-editable-leaf="true"]');
    if (labelEl) {
      // Walk the label element but stop at nested block boundaries
      return htmlToInlineMarkdown(labelEl);
    }
    const ceEl = block.querySelector('[contenteditable="true"]');
    if (ceEl) return htmlToInlineMarkdown(ceEl);

    const fc = block.firstElementChild;
    if (!fc) return '';
    // On public pages the block IS the firstElementChild
    if (fc === block) return fc.textContent.trim();
    return htmlToInlineMarkdown(fc);
  }

  function htmlToInlineMarkdown(el) {
    let result = '';

    for (const node of el.childNodes) {
      // Stop at nested block boundaries — those belong to child blocks
      if (node.nodeType === Node.ELEMENT_NODE && node.hasAttribute && node.hasAttribute('data-block-id')) {
        continue;
      }

      if (node.nodeType === Node.TEXT_NODE) {
        result += node.textContent || '';
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName.toLowerCase();

        // Skip list marker SVGs / pseudo-element content (invisible nodes)
        if (['svg', 'path', 'style'].includes(tag)) continue;
        // Skip hidden / offscreen markers
        const display = window.getComputedStyle(node).getPropertyValue('display');
        if (display === 'none') continue;

        const childText = htmlToInlineMarkdown(node);
        if (!childText) continue;

        const cs = window.getComputedStyle(node);
        const isBold = tag === 'strong' || tag === 'b' || parseInt(cs.fontWeight) >= 600;
        const isItalic = tag === 'em' || tag === 'i' || cs.fontStyle === 'italic';
        const isCode = tag === 'code';
        const isStrike = tag === 's' || tag === 'del' || cs.textDecoration.includes('line-through');

        if (tag === 'a' && node.href) {
          result += '[' + childText + '](' + node.href + ')';
        } else if (isCode) {
          result += '`' + childText + '`';
        } else if (isBold && isItalic) {
          result += '***' + childText + '***';
        } else if (isBold) {
          result += '**' + childText + '**';
        } else if (isItalic) {
          result += '*' + childText + '*';
        } else if (isStrike) {
          result += '~~' + childText + '~~';
        } else {
          result += childText;
        }
      }
    }

    return result.trim();
  }

  function codeBlockMarkdown(block) {
    const pre = block.querySelector('pre');
    const codeEl = pre && pre.querySelector('code');
    let lang = '';
    if (codeEl) {
      const cls = codeEl.className || '';
      const m = cls.match(/language-(\w+)/);
      if (m) lang = m[1];
    }
    const code = (codeEl || pre).textContent || '';
    return '```' + lang + '\n' + code.trimEnd() + '\n```';
  }

  function imageMarkdown(block) {
    const img = block.querySelector('img');
    if (!img) return '';
    const src = img.currentSrc || img.src;
    const alt = (img.alt || '').replace(/[\n\r]/g, ' ').trim();
    return '![' + alt + '](' + src + ')';
  }

  function embedMarkdown(block) {
    // Extract iframe src (Manychat, YouTube embeds, etc.)
    const iframe = block.querySelector('iframe');
    if (iframe && iframe.src) {
      return '<iframe src="' + iframe.src + '" width="' + (iframe.width || '100%') + '" height="' + (iframe.height || '400') + '" frameborder="0" allowfullscreen></iframe>';
    }
    // Fallback: any link inside the embed
    const link = block.querySelector('a[href]');
    if (link) return '[' + (link.textContent.trim() || 'embed') + '](' + link.href + ')';
    return '';
  }

  function downloadMarkdownFile(title, markdown) {
    const safeFilename = title.replace(/[/\\:*?"<>|]/g, '-').trim().replace(/\s+/g, ' ') + '.md';
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = safeFilename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();

    // Clean up after a short delay to let the download start
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 200);
  }
}

// Always-on GitHub layout widening
if (IS_GITHUB) {
  const githubEl = document.createElement('style');
  githubEl.id = 'umbra-github';
  githubEl.textContent = GITHUB_CSS;
  (document.head || document.documentElement).appendChild(githubEl);
}

// Apply on load from storage
chrome.storage.local.get(STORAGE_KEY, (res) => {
  const enabled = res[STORAGE_KEY] !== false; // default ON
  apply(enabled);
});

// Listen for toggle messages from popup
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'umbra_toggle') {
    apply(msg.enabled);
    return false;
  }
  if (msg.type === 'umbra_color_picker') {
    activateColorPicker();
    return false;
  }
  if (msg.type === 'umbra_color_picker_deactivate') {
    deactivateColorPicker();
    return false;
  }
  // Return false for messages we don't handle so other listeners get the channel
  return false;
});

// ─── Color Picker ───────────────────────────────────────────────────────────

let colorPickerActive = false;
let pickerBtn = null;
let pickerToast = null;
let pickerOverlay = null;
let pickerDarkModeWasActive = false;

function activateColorPicker() {
  if (colorPickerActive) return;
  colorPickerActive = true;
  pickerDarkModeWasActive = !!styleEl;
  if (pickerDarkModeWasActive) eject();

  // Inject styles
  if (!document.getElementById('umbra-color-picker-css')) {
    const style = document.createElement('style');
    style.id = 'umbra-color-picker-css';
    style.textContent = `
      @keyframes umbra-picker-in {
        from { opacity: 0; transform: translateY(16px) scale(0.9); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
      }
      @keyframes umbra-toast-in {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes umbra-toast-out {
        from { opacity: 1; transform: translateY(0); }
        to   { opacity: 0; transform: translateY(20px); }
      }
      .umbra-picker-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 2147483640;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: #1a1a1b;
        border: 1px solid #e5c07b;
        border-radius: 24px;
        color: #e5c07b;
        font: 600 12px/1 -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        letter-spacing: 1px;
        text-transform: uppercase;
        cursor: crosshair;
        box-shadow: 0 4px 24px rgba(0,0,0,0.4);
        animation: umbra-picker-in 0.25s ease-out;
        user-select: none;
        transition: background 0.15s, box-shadow 0.15s;
      }
      .umbra-picker-btn:hover {
        background: #2a2a2b;
        box-shadow: 0 6px 32px rgba(229,192,123,0.15);
      }
      .umbra-picker-btn .umbra-picker-icon {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }
      .umbra-picker-btn .umbra-picker-hint {
        font-size: 9px;
        color: #4a4a4b;
        letter-spacing: 1px;
        font-weight: 400;
      }
      .umbra-picker-overlay {
        position: fixed;
        inset: 0;
        z-index: 2147483635;
        cursor: crosshair;
      }
      .umbra-picker-toast {
        position: fixed;
        bottom: 80px;
        right: 24px;
        z-index: 2147483645;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 10px 16px;
        background: #1a1a1b;
        border: 1px solid #343536;
        border-radius: 10px;
        font: 500 12px/1 'SFMono-Regular', Consolas, monospace;
        color: #d7dadc;
        box-shadow: 0 4px 24px rgba(0,0,0,0.5);
        animation: umbra-toast-in 0.2s ease-out;
        user-select: all;
      }
      .umbra-picker-toast.out {
        animation: umbra-toast-out 0.2s ease-in forwards;
      }
      .umbra-picker-toast .umbra-toast-swatch {
        width: 24px;
        height: 24px;
        border-radius: 6px;
        border: 1px solid #343536;
        flex-shrink: 0;
      }
      .umbra-picker-toast .umbra-toast-copied {
        font-size: 9px;
        color: #4fbdba;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-weight: 600;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }
    `;
    (document.head || document.documentElement).appendChild(style);
  }

  // Create the floating activation button
  pickerBtn = document.createElement('div');
  pickerBtn.className = 'umbra-picker-btn';
  pickerBtn.textContent = 'Click a color · Esc to cancel';
  pickerBtn.style.pointerEvents = 'none';
  pickerBtn.style.cursor = 'default';

  pickerOverlay = document.createElement('div');
  pickerOverlay.className = 'umbra-picker-overlay';

  const handlePick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const x = e.clientX;
    const y = e.clientY;
    pickerOverlay.style.visibility = 'hidden';
    pickerBtn.style.visibility = 'hidden';
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    let hex = null;
    try {
      const result = await chrome.runtime.sendMessage({ type: 'umbra_capture_visible_tab' });
      if (result?.ok && result.dataUrl) hex = await screenshotPixelToHex(result.dataUrl, x, y);
    } catch (_) {}

    if (!colorPickerActive) return;
    if (!hex) {
      let el = document.elementFromPoint(x, y);
      while (el && !hex) {
        hex = rgbToHex(getComputedStyle(el).backgroundColor);
        el = el.parentElement;
      }
    }
    deactivateColorPicker();
    if (hex) showColorToast(hex);
  };

  const handleKey = (e) => {
    if (e.key === 'Escape') {
      deactivateColorPicker();
    }
  };

  // The overlay catches one direct click on the page
  // Escape cancels the picker
  pickerOverlay.addEventListener('click', handlePick);
  document.addEventListener('keydown', handleKey);

  // Store cleanup refs on elements
  pickerBtn._umbraHandleKey = handleKey;
  pickerOverlay._umbraHandlePick = handlePick;
  pickerOverlay._umbraHandleKey = handleKey;

  document.body.appendChild(pickerOverlay);
  document.body.appendChild(pickerBtn);
}

function deactivateColorPicker() {
  colorPickerActive = false;

  if (pickerBtn) {
    const hk = pickerBtn._umbraHandleKey;
    if (hk) document.removeEventListener('keydown', hk);
    pickerBtn.remove();
    pickerBtn = null;
  }

  if (pickerOverlay) {
    const hp = pickerOverlay._umbraHandlePick;
    if (hp) pickerOverlay.removeEventListener('click', hp);
    pickerOverlay.remove();
    pickerOverlay = null;
  }

  const restoreDarkMode = pickerDarkModeWasActive;
  pickerDarkModeWasActive = false;
  if (restoreDarkMode) apply(true);

  // Dismiss any lingering toast
  if (pickerToast) {
    pickerToast.classList.add('out');
    setTimeout(() => {
      if (pickerToast) { pickerToast.remove(); pickerToast = null; }
    }, 250);
  }
}

function normalizeHexColor(value) {
  const match = String(value || '').trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!match) return null;
  const hex = match[1].length === 3 ? [...match[1]].map(character => character.repeat(2)).join('') : match[1];
  return `#${hex.toUpperCase()}`;
}

async function screenshotPixelToHex(dataUrl, x, y) {
  const response = await fetch(dataUrl);
  const bitmap = await createImageBitmap(await response.blob());
  const sourceX = Math.max(0, Math.min(bitmap.width - 1, Math.floor(x * bitmap.width / window.innerWidth)));
  const sourceY = Math.max(0, Math.min(bitmap.height - 1, Math.floor(y * bitmap.height / window.innerHeight)));
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(bitmap, sourceX, sourceY, 1, 1, 0, 0, 1, 1);
  bitmap.close();
  const [r, g, b, a] = context.getImageData(0, 0, 1, 1).data;
  return a ? `#${[r, g, b].map(value => value.toString(16).padStart(2, '0')).join('')}` : null;
}

function showColorToast(hex) {
  const upperHex = normalizeHexColor(hex);
  if (!upperHex) return;

  // Remove previous toast
  if (pickerToast) {
    pickerToast.remove();
  }

  pickerToast = document.createElement('div');
  pickerToast.className = 'umbra-picker-toast';
  const swatch = document.createElement('div');
  swatch.className = 'umbra-toast-swatch';
  swatch.style.setProperty('background-color', upperHex, 'important');
  const value = document.createElement('span');
  value.textContent = upperHex;
  const copied = document.createElement('span');
  copied.className = 'umbra-toast-copied';
  copied.textContent = 'Copied';
  pickerToast.append(swatch, value, copied);
  if (styleEl?.textContent === GENERIC_CSS) pickerToast.style.filter = 'invert(1) hue-rotate(180deg)';
  document.body.appendChild(pickerToast);

  // Copy to clipboard
  navigator.clipboard.writeText(upperHex).catch(() => {});

  // Save to recent colors history (last 10, no duplicates)
  chrome.storage.local.get('umbra_color_history', (res) => {
    const history = res.umbra_color_history || [];
    const filtered = history.filter(c => c !== upperHex);
    filtered.unshift(upperHex);
    chrome.storage.local.set({ umbra_color_history: filtered.slice(0, 10) });
  });

  // Auto-dismiss after 3 seconds
  setTimeout(() => {
    if (pickerToast) {
      pickerToast.classList.add('out');
      setTimeout(() => {
        if (pickerToast) { pickerToast.remove(); pickerToast = null; }
      }, 250);
    }
  }, 3000);

  // Click to dismiss
  pickerToast.addEventListener('click', () => {
    if (pickerToast) {
      pickerToast.classList.add('out');
      setTimeout(() => {
        if (pickerToast) { pickerToast.remove(); pickerToast = null; }
      }, 250);
    }
  });
}

function rgbToHex(rgb) {
  const m = rgb.match(/[\d.]+/g);
  if (!m || m.length < 3) return null;
  const r = parseInt(m[0]);
  const g = parseInt(m[1]);
  const b = parseInt(m[2]);
  const a = m.length >= 4 ? parseFloat(m[3]) : 1;
  if (a === 0) return null; // transparent
  return '#' + [r, g, b].map(c => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}
