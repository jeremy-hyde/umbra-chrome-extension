// ─── Umbra — feed library (IndexedDB) ────────────────────────────────────────
// Shared between the service worker (importScripts) and dashboard.html
// (<script>). Both run on the extension origin, so they share the same DB.
//
// Stores:
//   feeds    — one record per saved sort: {id, savedAt, platform, surface, creator, sortBy, scope, count}
//   items    — deduplicated posts keyed `platform:creator:itemId`, carrying metrics + feedIds
//   creators — {key: 'platform:username', platform, username, tags[], updatedAt}

(function (root) {
  const DB_NAME = 'umbra-library';
  const DB_VERSION = 1;

  function open() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains('feeds')) {
          db.createObjectStore('feeds', { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains('items')) {
          const items = db.createObjectStore('items', { keyPath: 'key' });
          items.createIndex('creator', 'creator', { unique: false });
        }
        if (!db.objectStoreNames.contains('creators')) {
          db.createObjectStore('creators', { keyPath: 'key' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function txDone(tx) {
    return new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  }

  function reqToPromise(req) {
    return new Promise((resolve, reject) => {
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  function itemIdOf(item) {
    return item.postID ?? item.reelID ?? item.code ?? item.pk ?? null;
  }

  function creatorOf(item, ctx) {
    return item.userName || item.Profile || item.Channel || ctx.creator || '';
  }

  function urlOf(item, platform) {
    if (item.url) return item.url;
    if (item.Reel) return item.Reel;
    if (item.Video) return item.Video;
    if (item.URL) return item.URL;
    if (platform === 'instagram' && item.code) return `https://www.instagram.com/${item.mediaType === 2 || item.reelID ? 'reel' : 'p'}/${item.code}/`;
    return '';
  }

  function typeOf(item, ctx) {
    if (item.mediaType === 2 || item.reelID) return 'reel';
    if (item.mediaType === 8) return 'carousel';
    if (item.mediaType === 1) return 'photo';
    if (ctx && ctx.postsVsReels) return ctx.postsVsReels.toLowerCase().replace(/s$/, '');
    return 'post';
  }

  function normalizeItem(item, ctx, feedId, now) {
    const platform = ctx.platform || 'instagram';
    const creator = creatorOf(item, ctx);
    const itemId = itemIdOf(item);
    if (!itemId) return null;
    return {
      key: `${platform}:${creator}:${itemId}`,
      feedIds: [feedId],
      platform,
      creator,
      itemId: String(itemId),
      url: urlOf(item, platform),
      type: typeOf(item, ctx),
      views: item.viewCount ?? item.Views ?? null,
      likes: item.likesCount ?? item.Likes ?? null,
      comments: item.commentsCount ?? item.Comments ?? null,
      shares: item.sharesCount ?? null,
      saves: item.savesCount ?? null,
      date: item.createDate || item.Date || item.publishDate || '',
      thumbnail: item.thumbnailUrl || null,
      caption: item.caption || item.Title || '',
      outlierScore: typeof item.outlierScore === 'number' ? item.outlierScore : (typeof item.OutlierScore === 'number' ? item.OutlierScore : null),
      transcript: item.transcript || null,
      pinned: !!item.pinned,
      firstSeen: now,
      lastSeen: now,
    };
  }

  // Persist one completed sort. Returns the new feed id.
  async function saveFeed(payload) {
    const items = Array.isArray(payload && payload.items) ? payload.items : [];
    const ctx = (payload && payload.ctx) || {};
    if (!items.length) return null;

    const db = await open();
    const now = Date.now();
    const tx = db.transaction(['feeds', 'items', 'creators'], 'readwrite');
    const feeds = tx.objectStore('feeds');
    const itemsStore = tx.objectStore('items');
    const creators = tx.objectStore('creators');

    const creatorGuess = ctx.creator || creatorOf(items[0], ctx) || '';
    const feedReq = feeds.add({
      savedAt: now,
      platform: ctx.platform || 'instagram',
      surface: ctx.surface || '',
      postsVsReels: ctx.postsVsReels || '',
      creator: creatorGuess,
      sortBy: ctx.sortBy || '',
      scope: ctx.scope || '',
      scopeMode: ctx.scopeMode || '',
      path: ctx.path || '',
      count: items.length,
    });
    const feedId = await reqToPromise(feedReq);

    for (const raw of items) {
      const rec = normalizeItem(raw, ctx, feedId, now);
      if (!rec) continue;
      const existing = await reqToPromise(itemsStore.get(rec.key));
      if (existing) {
        const set = new Set(existing.feedIds || []);
        set.add(feedId);
        rec.feedIds = Array.from(set);
        rec.firstSeen = existing.firstSeen || now;
        // keep the longest transcript / first thumbnail we ever saw
        if ((existing.transcript || '').length > (rec.transcript || '').length) rec.transcript = existing.transcript;
        if (!rec.thumbnail && existing.thumbnail) rec.thumbnail = existing.thumbnail;
      }
      itemsStore.put(rec);
    }

    if (creatorGuess) {
      const key = `${ctx.platform || 'instagram'}:${creatorGuess}`;
      const existing = await reqToPromise(creators.get(key));
      creators.put({
        key,
        platform: ctx.platform || 'instagram',
        username: creatorGuess,
        tags: existing && Array.isArray(existing.tags) ? existing.tags : [],
        createdAt: existing ? existing.createdAt : now,
        updatedAt: now,
      });
    }

    await txDone(tx);
    db.close();
    return feedId;
  }

  async function getAll() {
    const db = await open();
    const tx = db.transaction(['feeds', 'items', 'creators'], 'readonly');
    const [feeds, items, creators] = await Promise.all([
      reqToPromise(tx.objectStore('feeds').getAll()),
      reqToPromise(tx.objectStore('items').getAll()),
      reqToPromise(tx.objectStore('creators').getAll()),
    ]);
    await txDone(tx).catch(() => {});
    db.close();
    return { feeds, items, creators };
  }

  async function setCreatorTags(platform, username, tags) {
    const db = await open();
    const key = `${platform}:${username}`;
    const tx = db.transaction('creators', 'readwrite');
    const store = tx.objectStore('creators');
    const existing = await reqToPromise(store.get(key));
    const clean = Array.from(new Set((tags || []).map(t => String(t).trim().toLowerCase()).filter(Boolean)));
    store.put({
      key,
      platform,
      username,
      tags: clean,
      createdAt: existing ? existing.createdAt : Date.now(),
      updatedAt: Date.now(),
    });
    await txDone(tx);
    db.close();
    return clean;
  }

  async function getCreator(platform, username) {
    const db = await open();
    const rec = await reqToPromise(db.transaction('creators').objectStore('creators').get(`${platform}:${username}`));
    db.close();
    return rec || null;
  }

  async function getAllTags() {
    const db = await open();
    const creators = await reqToPromise(db.transaction('creators').objectStore('creators').getAll());
    db.close();
    const all = new Set();
    for (const c of creators) for (const t of c.tags || []) all.add(t);
    return Array.from(all).sort();
  }

  async function renameTag(oldName, newName) {
    const next = String(newName || '').trim().toLowerCase();
    if (!next) return 0;
    const db = await open();
    const tx = db.transaction('creators', 'readwrite');
    const store = tx.objectStore('creators');
    const creators = await reqToPromise(store.getAll());
    let changed = 0;
    for (const c of creators) {
      const tags = c.tags || [];
      if (!tags.includes(oldName)) continue;
      c.tags = Array.from(new Set(tags.map(t => (t === oldName ? next : t))));
      c.updatedAt = Date.now();
      store.put(c);
      changed++;
    }
    await txDone(tx);
    db.close();
    return changed;
  }

  async function deleteTag(name) {
    const db = await open();
    const tx = db.transaction('creators', 'readwrite');
    const store = tx.objectStore('creators');
    const creators = await reqToPromise(store.getAll());
    let changed = 0;
    for (const c of creators) {
      const tags = c.tags || [];
      if (!tags.includes(name)) continue;
      c.tags = tags.filter(t => t !== name);
      c.updatedAt = Date.now();
      store.put(c);
      changed++;
    }
    await txDone(tx);
    db.close();
    return changed;
  }

  async function deleteFeed(id) {
    const db = await open();
    const tx = db.transaction(['feeds', 'items'], 'readwrite');
    tx.objectStore('feeds').delete(id);
    const itemsStore = tx.objectStore('items');
    const all = await reqToPromise(itemsStore.getAll());
    for (const item of all) {
      const ids = (item.feedIds || []).filter(f => f !== id);
      if (ids.length === 0) itemsStore.delete(item.key);
      else if (ids.length !== item.feedIds.length) itemsStore.put({ ...item, feedIds: ids });
    }
    await txDone(tx);
    db.close();
  }

  async function clearAll() {
    const db = await open();
    const tx = db.transaction(['feeds', 'items', 'creators'], 'readwrite');
    tx.objectStore('feeds').clear();
    tx.objectStore('items').clear();
    tx.objectStore('creators').clear();
    await txDone(tx);
    db.close();
  }

  root.UmbraLibrary = { open, saveFeed, getAll, setCreatorTags, getCreator, getAllTags, renameTag, deleteTag, deleteFeed, clearAll };
})(typeof self !== 'undefined' ? self : globalThis);
