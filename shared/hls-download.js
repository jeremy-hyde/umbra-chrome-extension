// ─── Umbra — in-extension HLS → MP4 downloader ──────────────────────────────
// Runs in the isolated world on Skool/Whop. Fetches a captured Mux master
// playlist, downloads every segment, decrypts AES-128 when required, and
// produces an .mp4 Blob (fMP4 streams are concatenated, MPEG-TS streams are
// transmuxed with mux.js — loaded as lib/mux.min.js in the same world).
// Exposed as window.UmbraHls.download(m3u8Url, { onProgress }) .

(() => {
  if (window.UmbraHls) return;

  const CONCURRENCY = 6;

  class HlsError extends Error {
    constructor(code, message) {
      super(message);
      this.code = code;
    }
  }

  async function fetchText(url) {
    const res = await fetch(url);
    if (!res.ok) throw new HlsError('playlist_fetch_failed', `Playlist fetch failed (${res.status}).`);
    return res.text();
  }

  function resolveUrl(base, uri) {
    const out = new URL(uri, base);
    // Mux signed playback puts `token=` on the playlist; sub-playlist and
    // segment URIs are relative and would lose it. Inherit it when missing.
    const baseToken = new URL(base).searchParams.get('token');
    if (baseToken && !out.searchParams.get('token')) out.searchParams.set('token', baseToken);
    return out.toString();
  }

  function parseAttrs(line) {
    const attrs = {};
    const body = line.slice(line.indexOf(':') + 1);
    let key = '';
    let value = '';
    let inKey = true;
    let inQuotes = false;
    for (const ch of body) {
      if (inKey) {
        if (ch === '=') inKey = false;
        else key += ch;
      } else {
        if (ch === '"') inQuotes = !inQuotes;
        else if (ch === ',' && !inQuotes) {
          attrs[key.trim()] = value;
          key = ''; value = ''; inKey = true;
        } else value += ch;
      }
    }
    if (key.trim()) attrs[key.trim()] = value;
    return attrs;
  }

  // Returns the media playlist URL to download: best variant of a master
  // playlist, or the URL itself when it already is a media playlist.
  async function pickMediaPlaylist(url) {
    const text = await fetchText(url);
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    let best = null;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('#EXT-X-STREAM-INF')) {
        const attrs = parseAttrs(lines[i]);
        const uri = lines[i + 1];
        if (!uri || uri.startsWith('#')) continue;
        const bandwidth = Number(attrs.BANDWIDTH || attrs['AVERAGE-BANDWIDTH'] || 0);
        if (!best || bandwidth > best.bandwidth) {
          best = { url: resolveUrl(url, uri), bandwidth };
        }
      }
    }
    return best ? best.url : url;
  }

  function hexToBytes(hex) {
    const clean = hex.startsWith('0x') || hex.startsWith('0X') ? hex.slice(2) : hex;
    const out = new Uint8Array(clean.length / 2);
    for (let i = 0; i < out.length; i++) out[i] = parseInt(clean.substr(i * 2, 2), 16);
    return out;
  }

  function seqToIv(seq) {
    const iv = new Uint8Array(16);
    let n = BigInt(seq);
    for (let i = 15; i >= 0 && n > 0n; i--) {
      iv[i] = Number(n & 0xffn);
      n >>= 8n;
    }
    return iv;
  }

  async function parseMediaPlaylist(url) {
    const text = await fetchText(url);
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    const segments = [];
    let initMap = null;
    let key = null; // {method, uri, iv}
    let mediaSeq = 0;
    let seqCursor = 0;
    let endlist = false;

    for (const line of lines) {
      if (line.startsWith('#EXT-X-MEDIA-SEQUENCE')) {
        mediaSeq = Number(line.split(':')[1]) || 0;
        seqCursor = mediaSeq;
      } else if (line.startsWith('#EXT-X-KEY')) {
        const attrs = parseAttrs(line);
        if (attrs.METHOD === 'NONE') key = null;
        else key = { method: attrs.METHOD, uri: attrs.URI && attrs.URI.replace(/^"|"$/g, ''), iv: attrs.IV || null };
      } else if (line.startsWith('#EXT-X-MAP')) {
        const attrs = parseAttrs(line);
        if (attrs.URI) initMap = resolveUrl(url, attrs.URI.replace(/^"|"$/g, ''));
      } else if (line === '#EXT-X-ENDLIST') {
        endlist = true;
      } else if (!line.startsWith('#')) {
        segments.push({ url: resolveUrl(url, line), seq: seqCursor++ });
      }
    }

    if (!segments.length) throw new HlsError('empty_playlist', 'The playlist has no segments.');
    return { segments, initMap, key, endlist };
  }

  async function loadKey(keyInfo, playlistUrl) {
    if (!keyInfo || !keyInfo.uri) return null;
    if (keyInfo.method !== 'AES-128') {
      throw new HlsError('unsupported_encryption', `Encryption ${keyInfo.method} is not supported.`);
    }
    const res = await fetch(resolveUrl(playlistUrl, keyInfo.uri));
    if (!res.ok) throw new HlsError('key_fetch_failed', `Key fetch failed (${res.status}).`);
    const raw = await res.arrayBuffer();
    return crypto.subtle.importKey('raw', raw, { name: 'AES-CBC' }, false, ['decrypt']);
  }

  async function decryptSegment(cryptoKey, keyInfo, data, seq) {
    const iv = keyInfo.iv ? hexToBytes(keyInfo.iv) : seqToIv(seq);
    const plain = await crypto.subtle.decrypt({ name: 'AES-CBC', iv }, cryptoKey, data);
    return new Uint8Array(plain);
  }

  async function fetchSegments(list, cryptoKey, keyInfo, onProgress) {
    const results = new Array(list.length);
    let done = 0;
    let cursor = 0;
    const next = () => (cursor < list.length ? cursor++ : -1);

    async function worker() {
      for (;;) {
        const i = next();
        if (i < 0) return;
        const seg = list[i];
        const res = await fetch(seg.url);
        if (!res.ok) throw new HlsError('segment_fetch_failed', `Segment fetch failed (${res.status}).`);
        let bytes = new Uint8Array(await res.arrayBuffer());
        if (cryptoKey) bytes = await decryptSegment(cryptoKey, keyInfo, bytes, seg.seq);
        results[i] = bytes;
        done++;
        if (onProgress) onProgress({ phase: 'segments', done, total: list.length });
      }
    }

    await Promise.all(Array.from({ length: Math.min(CONCURRENCY, list.length) }, worker));
    return results;
  }

  // Concatenate fMP4 init + media segments → valid .mp4.
  function assembleFmp4(initBytes, segments) {
    const parts = initBytes ? [initBytes, ...segments] : segments;
    return new Blob(parts, { type: 'video/mp4' });
  }

  // Transmux MPEG-TS segments → .mp4 via mux.js.
  function transmuxTs(segments) {
    if (typeof muxjs === 'undefined' || !muxjs.mp4 || !muxjs.mp4.Transmuxer) {
      throw new HlsError('no_transmuxer', 'mux.js is not loaded.');
    }
    const transmuxer = new muxjs.mp4.Transmuxer({ keepOriginalTimestamps: false });
    const chunks = [];
    let init = null;
    let sawCombined = false;

    transmuxer.on('data', (seg) => {
      if (seg.initSegment) init = seg.initSegment instanceof Uint8Array ? seg.initSegment : new Uint8Array(seg.initSegment);
      if (seg.data) chunks.push(seg.data instanceof Uint8Array ? seg.data : new Uint8Array(seg.data));
      if (seg.type === 'combined') sawCombined = true;
    });

    for (const ts of segments) transmuxer.push(ts);
    transmuxer.flush();

    const parts = [];
    if (init) parts.push(init);
    parts.push(...chunks);
    if (!parts.length) throw new HlsError('remux_empty', 'Remux produced no data.');
    return { blob: new Blob(parts, { type: 'video/mp4' }), sawCombined };
  }

  function looksLikeTs(bytes) {
    return bytes && bytes.length > 1 && bytes[0] === 0x47;
  }

  async function download(m3u8Url, opts = {}) {
    const onProgress = opts.onProgress || null;
    const emit = (p) => { if (onProgress) onProgress(p); };

    // Direct media file (plain <video src=…mp4/webm> fallback) — no playlist.
    if (!/\.m3u8(\?|#|$)/i.test(m3u8Url)) {
      emit({ phase: 'segments', done: 0, total: 1 });
      const res = await fetch(m3u8Url);
      if (!res.ok) throw new HlsError('media_fetch_failed', `Media fetch failed (${res.status}).`);
      const blob = await res.blob();
      const ext = (new URL(m3u8Url).pathname.match(/\.([a-z0-9]{2,5})$/i) || [])[1] || 'mp4';
      emit({ phase: 'remux' });
      return { blob, ext };
    }

    emit({ phase: 'playlist' });
    const mediaUrl = await pickMediaPlaylist(m3u8Url);
    const media = await parseMediaPlaylist(mediaUrl);
    const cryptoKey = await loadKey(media.key, mediaUrl);

    let initBytes = null;
    if (media.initMap) {
      const res = await fetch(media.initMap);
      if (!res.ok) throw new HlsError('init_fetch_failed', `Init segment fetch failed (${res.status}).`);
      initBytes = new Uint8Array(await res.arrayBuffer());
      if (cryptoKey) initBytes = await decryptSegment(cryptoKey, media.key, initBytes, media.segments[0] ? media.segments[0].seq - 1 : 0);
    }

    const segments = await fetchSegments(media.segments, cryptoKey, media.key, emit);

    emit({ phase: 'remux' });
    // fMP4 stream → plain concat. MPEG-TS → mux.js transmux.
    if (media.initMap || !looksLikeTs(segments[0])) {
      return { blob: assembleFmp4(initBytes, segments), ext: 'mp4' };
    }
    const { blob } = transmuxTs(segments);
    return { blob, ext: 'mp4' };
  }

  window.UmbraHls = { download, HlsError };
})();
