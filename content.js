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

// ─── Whop video downloader ───────────────────────────────────────────────────
// whop-intercept.js runs in MAIN world (registered in manifest.json) and
// patches fetch/XHR. This isolated-world script handles UI + messaging only.
// Whop also hosts videos on Mux (stream.mux.com/{id}.m3u8?token=...), so the
// capture logic is identical to Skool's.
if (IS_WHOP) {

  // Build the download button + modal UI styles once
  const whopUiCss = `
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
    const title = document.title.replace(/[/\\:*?"<>|]+/g, ' ').trim() || 'whop-video';
    // 'simple' = Loom / YouTube (no extra headers needed)
    // 'mux'    = Whop's Mux player (needs Referer + Origin to bypass playback restriction)
    const cmd = type === 'mux'
      ? `yt-dlp -o "${title}.%(ext)s" --add-header "Referer:https://whop.com/" --add-header "Origin:https://whop.com" "${videoUrl}"`
      : `yt-dlp -o "${title}.%(ext)s" "${videoUrl}"`;
    document.getElementById('umbra-modal-cmd').textContent = cmd;
    modal.classList.add('open');
  }

  // Ask whop-intercept.js (MAIN world) for the captured video URL via postMessage.
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
    // 3. Plain <video> with a non-blob src (fallback)
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

// ─── Color Picker (EyeDropper API) ──────────────────────────────────────────

let colorPickerActive = false;
let pickerBtn = null;
let pickerToast = null;
let pickerOverlay = null;

function activateColorPicker() {
  if (colorPickerActive) return;
  colorPickerActive = true;

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
  pickerBtn = document.createElement('button');
  pickerBtn.className = 'umbra-picker-btn';
  pickerBtn.innerHTML = `
    <svg class="umbra-picker-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 22l2-6 4-1-1-4z"/>
      <path d="M15.6 2.7a2.4 2.4 0 0 1 3.4 3.4L12 13l-4 1 1-4z"/>
      <line x1="19" y1="19" x2="20" y2="20"/>
    </svg>
    Eyedropper
    <span class="umbra-picker-hint">esc to cancel</span>
  `;

  pickerOverlay = document.createElement('div');
  pickerOverlay.className = 'umbra-picker-overlay';

  const handlePick = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Try EyeDropper API first
    if (typeof EyeDropper !== 'undefined') {
      try {
        const dropper = new EyeDropper();
        const result = await dropper.open();
        showColorToast(result.sRGBHex);
        deactivateColorPicker();
        return;
      } catch (err) {
        // User cancelled or API failed — keep picker active for retry
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: use elementFromPoint + getComputedStyle
    const x = e.clientX;
    const y = e.clientY;
    // Temporarily hide our overlay to get the element underneath
    pickerOverlay.style.pointerEvents = 'none';
    const el = document.elementFromPoint(x, y);
    pickerOverlay.style.pointerEvents = '';

    if (el) {
      const color = getComputedStyle(el).backgroundColor;
      const hex = rgbToHex(color);
      if (hex) {
        showColorToast(hex);
      }
    }
    deactivateColorPicker();
  };

  const handleKey = (e) => {
    if (e.key === 'Escape') {
      deactivateColorPicker();
    }
  };

  // The button click provides user gesture for EyeDropper
  pickerBtn.addEventListener('click', handlePick);
  // Overlay catches clicks anywhere on the page
  pickerOverlay.addEventListener('click', handlePick);
  document.addEventListener('keydown', handleKey);

  // Store cleanup refs on elements
  pickerBtn._umbraHandlePick = handlePick;
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
    const hp = pickerBtn._umbraHandlePick;
    if (hk) document.removeEventListener('keydown', hk);
    if (hp) pickerBtn.removeEventListener('click', hp);
    pickerBtn.remove();
    pickerBtn = null;
  }

  if (pickerOverlay) {
    const hp = pickerOverlay._umbraHandlePick;
    if (hp) pickerOverlay.removeEventListener('click', hp);
    pickerOverlay.remove();
    pickerOverlay = null;
  }

  // Dismiss any lingering toast
  if (pickerToast) {
    pickerToast.classList.add('out');
    setTimeout(() => {
      if (pickerToast) { pickerToast.remove(); pickerToast = null; }
    }, 250);
  }
}

function showColorToast(hex) {
  // Remove previous toast
  if (pickerToast) {
    pickerToast.remove();
  }

  pickerToast = document.createElement('div');
  pickerToast.className = 'umbra-picker-toast';
  pickerToast.innerHTML = `
    <div class="umbra-toast-swatch" style="background:${hex};"></div>
    <span>${hex.toUpperCase()}</span>
    <span class="umbra-toast-copied">Copied</span>
  `;
  document.body.appendChild(pickerToast);

  // Copy to clipboard
  const upperHex = hex.toUpperCase();
  navigator.clipboard.writeText(upperHex).catch(() => {});

  // Save to recent colors history (last 5, no duplicates)
  chrome.storage.local.get('umbra_color_history', (res) => {
    const history = res.umbra_color_history || [];
    const filtered = history.filter(c => c !== upperHex);
    filtered.unshift(upperHex);
    chrome.storage.local.set({ umbra_color_history: filtered.slice(0, 5) });
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
