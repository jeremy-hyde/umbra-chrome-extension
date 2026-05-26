const STORAGE_KEY = 'umbra_enabled';
const HOST = location.hostname;
const IS_OLD_REDDIT = HOST === 'old.reddit.com';
const IS_GITHUB = HOST === 'github.com';
const IS_SKOOL = HOST === 'skool.com' || HOST.endsWith('.skool.com');

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

// ─── Skool video downloader ──────────────────────────────────────────────────
// skool-intercept.js runs in MAIN world (registered in manifest.json) and
// patches fetch/XHR. This isolated-world script handles UI + messaging only.
if (IS_SKOOL) {

  // Build the download button + modal UI styles once
  const skoolUiCss = `
    .umbra-dl-btn {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 2147483640;
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
      <div class="modal-label">yt-dlp command</div>
      <div class="modal-cmd" id="umbra-modal-cmd"></div>
      <div class="modal-actions">
        <button id="umbra-copy-btn">Copy yt-dlp</button>
        <button id="umbra-close-modal-btn">Close</button>
      </div>
      <div class="modal-help">
        <a href="https://github.com/yt-dlp/yt-dlp#installation" target="_blank" rel="noopener">↗ Install yt-dlp</a>
        <a href="https://github.com/yt-dlp/yt-dlp#usage-and-options" target="_blank" rel="noopener">↗ Usage guide</a>
      </div>
      <div class="modal-instructions">
        <strong>Windows</strong> — open <code>PowerShell</code> or <code>cmd</code> and paste the command above.<br>
        If yt-dlp is not found, install it first with <code>winget install yt-dlp</code> or download the <code>.exe</code> from the install link above.<br>
        The file will be saved in your current directory — in PowerShell/cmd that is usually <code>C:\Users\YourName</code>.<br><br>
        <strong>Mac</strong> — open <code>Terminal</code> and paste the command above.<br>
        If yt-dlp is not found, install it with <code>brew install yt-dlp</code> (requires <a href="https://brew.sh" target="_blank" rel="noopener" style="color:#4fbdba;text-decoration:none">Homebrew</a>).<br>
        The file will be saved in your current directory — in Terminal that is usually <code>~/Downloads</code> if you <code>cd ~/Downloads</code> first, otherwise your home folder.
      </div>
    </div>
  `;
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(modal), { once: true });
  // Fallback if DOMContentLoaded already fired
  if (document.body) document.body.appendChild(modal);

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

  function openModal(videoUrl, type = 'mux') {
    document.getElementById('umbra-modal-url').textContent = videoUrl;
    const title = document.title.replace(/[/\\:*?"<>|]+/g, ' ').trim() || 'skool-video';
    // 'simple' = Loom / YouTube (no extra headers needed)
    // 'mux'    = Skool's Mux player (needs Referer + Origin to bypass playback restriction)
    const cmd = type === 'mux'
      ? `yt-dlp -o "${title}.%(ext)s" --add-header "Referer:https://skool.com/" --add-header "Origin:https://skool.com" "${videoUrl}"`
      : `yt-dlp -o "${title}.%(ext)s" "${videoUrl}"`;
    document.getElementById('umbra-modal-cmd').textContent = cmd;
    modal.classList.add('open');
  }

  // Ask skool-intercept.js (MAIN world) for the captured video URL via postMessage.
  function getPageVideoUrl(callback) {
    const nonce = Math.random().toString(36).slice(2);
    const handler = (e) => {
      if (e.source !== window || !e.data || e.data.__umbraType !== 'response_url' || e.data.__umbraNonce !== nonce) return;
      window.removeEventListener('message', handler);
      callback(e.data.url || null);
    };
    window.addEventListener('message', handler);
    window.postMessage({ __umbraType: 'request_url', __umbraNonce: nonce }, '*');
  }

  function isMasterM3u8(url) {
    return url && url.includes('.m3u8') && url.includes('token=');
  }

  function findVideoSrcInDom() {
    // 1. <mux-video cast-src="..."> — light DOM child of mux-player,
    //    always holds the master .m3u8 with token even after play starts.
    for (const el of document.querySelectorAll('mux-video[cast-src]')) {
      const url = el.getAttribute('cast-src');
      if (isMasterM3u8(url)) return url;
    }
    // 2. <mux-video src="..."> or <mux-player src="...">
    for (const el of document.querySelectorAll('mux-video[src], mux-player[src]')) {
      const url = el.getAttribute('src');
      if (isMasterM3u8(url)) return url;
    }
    // 3. Plain <video> with a non-blob src (unlikely on Skool but keep as fallback)
    for (const vid of document.querySelectorAll('video[src]')) {
      const url = vid.getAttribute('src');
      if (url && !url.startsWith('blob:')) return url;
    }
    return null;
  }

  function attachDownloadButton(container) {
    if (container.dataset.umbraDlAttached) return;
    container.dataset.umbraDlAttached = '1';
    container.style.position = 'relative';
    const dlBtn = document.createElement('button');
    dlBtn.className = 'umbra-dl-btn';
    dlBtn.textContent = '↓ Download';
    container.appendChild(dlBtn);

    dlBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();

      // 1. Loom iframe
      const loomIframe = container.querySelector('iframe[src*="loom.com/embed"]');
      if (loomIframe) {
        const embedUrl = loomIframe.src || loomIframe.getAttribute('src');
        const match = embedUrl.match(/loom\.com\/embed\/([a-f0-9]+)/i);
        if (match) {
          openModal(`https://www.loom.com/share/${match[1]}`, 'simple');
          return;
        }
      }

      // 2. YouTube iframe
      const ytIframe = container.querySelector('iframe[src*="youtube.com/embed"], iframe[src*="youtube-nocookie.com/embed"]');
      if (ytIframe) {
        const embedUrl = ytIframe.src || ytIframe.getAttribute('src');
        const match = embedUrl.match(/youtube(?:-nocookie)?\.com\/embed\/([^?&"]+)/i);
        if (match) {
          openModal(`https://www.youtube.com/watch?v=${match[1]}`, 'simple');
          return;
        }
      }

      // 3. Mux — try DOM attributes first
      const domUrl = findVideoSrcInDom();
      if (domUrl) { openModal(domUrl, 'mux'); return; }

      // 4. Try intercepted URL from page world
      getPageVideoUrl((intercepted) => {
        if (intercepted) { openModal(intercepted, 'mux'); return; }
        // 4. Nothing captured yet — hint user
        dlBtn.textContent = '▶ Play video first';
        setTimeout(() => { dlBtn.textContent = '↓ Download'; }, 2500);
      });
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
    // Loom and YouTube embeds
    const embedSelectors = [
      'iframe[src*="loom.com/embed"]',
      'iframe[src*="youtube.com/embed"]',
      'iframe[src*="youtube-nocookie.com/embed"]',
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
  }
});
