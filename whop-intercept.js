// Runs in MAIN world (page JS context) — bypasses Whop's CSP entirely.
// Patches fetch + XHR to capture video URLs, and responds to URL requests
// from the isolated-world content script via postMessage.

(function () {
  if (window.__umbraWhopInit) return;
  window.__umbraWhopInit = true;
  window.__umbraVideoUrl = null;

  // Only capture the master HLS playlist — it has a `token=` query param.
  // Segment requests (.ts) and sub-playlists (no token) must be ignored,
  // otherwise we end up with a tiny segment file instead of the full video.
  function isMasterPlaylist(url) {
    return url.includes('.m3u8') && url.includes('token=');
  }

  function capture(url) {
    // Never overwrite a previously captured master URL (first one is canonical)
    if (!window.__umbraVideoUrl && isMasterPlaylist(url)) {
      window.__umbraVideoUrl = url;
    }
  }

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
