// Runs in MAIN world (page JS context) on every site — bypasses page CSP.
// Patches fetch + XHR to capture video URLs, and responds to URL requests
// from the isolated-world content script via postMessage.

(function () {
  if (window.__umbraInterceptInit) return;
  window.__umbraInterceptInit = true;
  window.__umbraVideoUrl = null;

  // Only capture the master HLS playlist. Signed players (Skool/Whop) put a
  // `token=` query param on it; public Mux streams have no token but the
  // master always lives on stream.mux.com. Segment requests (.ts) and
  // rendition sub-playlists (served from *.edgemv.mux.com) must be ignored,
  // otherwise we end up with a tiny segment file instead of the full video.
  function isMasterPlaylist(url) {
    return url.includes('.m3u8') && (url.includes('token=') || url.includes('://stream.mux.com/'));
  }

  function capture(url) {
    // Latest master playlist wins — SPAs can switch videos without a reload.
    if (isMasterPlaylist(url)) {
      window.__umbraVideoUrl = url;
    }
  }

  // Drop the captured URL on SPA navigation so a stale video is never served.
  const _pushState = history.pushState;
  history.pushState = function () {
    window.__umbraVideoUrl = null;
    return _pushState.apply(this, arguments);
  };
  const _replaceState = history.replaceState;
  history.replaceState = function () {
    window.__umbraVideoUrl = null;
    return _replaceState.apply(this, arguments);
  };
  window.addEventListener('popstate', () => { window.__umbraVideoUrl = null; });

  // Patch XHR
  const _open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    capture(String(url));
    return _open.apply(this, arguments);
  };

  // Patch fetch
  const _fetch = window.fetch;
  window.fetch = function (input, init) {
    capture(typeof input === 'string' ? input : (input && input.url) || '');
    return _fetch.apply(this, arguments);
  };

  // Respond to URL requests from the isolated-world content script
  window.addEventListener('message', (e) => {
    if (e.source !== window || !e.data || e.data.__umbraType !== 'request_url') return;
    window.postMessage({
      __umbraType: 'response_url',
      __umbraNonce: e.data.__umbraNonce,
      url: window.__umbraVideoUrl || null,
    }, '*');
  });
})();
