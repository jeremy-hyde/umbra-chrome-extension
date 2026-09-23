// Umbra — feed library dashboard. Reads the shared IndexedDB directly
// (extension origin) and renders filters / sortable table / snapshots.
// Three views: Posts (filters + table), Creators (tag editing), Tags
// (rename / delete / browse).

(() => {
  const COLUMNS = [
    { key: 'thumb', label: '', sortable: false },
    { key: 'creator', label: 'Creator', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'date', label: 'Date', sortable: true },
    { key: 'views', label: 'Views', sortable: true, num: true },
    { key: 'likes', label: 'Likes', sortable: true, num: true },
    { key: 'comments', label: 'Comments', sortable: true, num: true },
    { key: 'outlierScore', label: 'Outlier', sortable: true, num: true },
    { key: 'caption', label: 'Caption', sortable: false },
    { key: 'url', label: '', sortable: false },
  ];

  const state = {
    items: [],
    feeds: [],
    creators: new Map(), // key -> {username, tags[]}
    selectedCreators: null, // null = all
    selectedTags: new Set(),
    type: '',
    search: '',
    sortKey: 'views',
    sortDir: -1,
    tagSort: 'name', // 'name' | 'count'
    view: 'posts',
  };

  const $ = (sel) => document.querySelector(sel);

  function fmtNum(n) {
    if (n == null || isNaN(n)) return '';
    if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, '') + 'M';
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(n);
  }

  function fmtDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return isNaN(d) ? '' : d.toISOString().slice(0, 10);
  }

  function creatorTags(username) {
    const rec = state.creators.get(`instagram:${username}`);
    return rec ? rec.tags : [];
  }

  function allTags() {
    const set = new Set();
    for (const rec of state.creators.values()) (rec.tags || []).forEach(t => set.add(t));
    return Array.from(set).sort();
  }

  function allCreatorNames() {
    const names = new Set(state.items.map(i => i.creator).filter(Boolean));
    for (const rec of state.creators.values()) if (rec.username) names.add(rec.username);
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }

  // Tags ⇄ creators linkage: an active tag filter selects exactly the
  // creators carrying one of the selected tags. Clearing tags resets to all.
  function syncCreatorsToTags() {
    if (!state.selectedTags.size) { state.selectedCreators = null; return; }
    const match = new Set();
    for (const name of allCreatorNames()) {
      if (creatorTags(name).some(t => state.selectedTags.has(t))) match.add(name);
    }
    state.selectedCreators = match;
  }

  function filteredItems() {
    const q = state.search.trim().toLowerCase();
    return state.items.filter(it => {
      if (state.selectedCreators && !state.selectedCreators.has(it.creator)) return false;
      if (state.type && it.type !== state.type) return false;
      if (q && !(it.caption || '').toLowerCase().includes(q) && !(it.creator || '').toLowerCase().includes(q)) return false;
      return true;
    }).sort((a, b) => {
      const k = state.sortKey;
      const av = a[k], bv = b[k];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * state.sortDir;
      return String(av).localeCompare(String(bv)) * state.sortDir;
    });
  }

  // ── hover preview (large thumbnail / full caption) ─────────────────────────
  const preview = document.createElement('div');
  preview.className = 'hover-preview';
  document.body.appendChild(preview);

  function placePreview(x, y) {
    const pad = 14;
    const r = preview.getBoundingClientRect();
    let left = x + pad, top = y + pad;
    if (left + r.width > window.innerWidth - 8) left = x - r.width - pad;
    if (top + r.height > window.innerHeight - 8) top = window.innerHeight - r.height - 8;
    preview.style.left = Math.max(8, left) + 'px';
    preview.style.top = Math.max(8, top) + 'px';
  }

  function bindPreview(el, build) {
    el.addEventListener('mouseenter', (e) => {
      preview.replaceChildren();
      preview.appendChild(build());
      preview.classList.add('show');
      placePreview(e.clientX, e.clientY);
    });
    el.addEventListener('mousemove', (e) => placePreview(e.clientX, e.clientY));
    el.addEventListener('mouseleave', () => preview.classList.remove('show'));
  }

  function renderStats() {
    const creators = new Set(state.items.map(i => i.creator));
    $('#stats').innerHTML =
      `<span><strong>${creators.size}</strong> creators</span>` +
      `<span><strong>${state.items.length}</strong> items</span>` +
      `<span><strong>${state.feeds.length}</strong> saved sorts</span>`;
  }

  function renderTagFilters() {
    const root = $('#tag-filters');
    const tags = allTags();
    root.innerHTML = tags.length ? '' : '<span style="color:#4a4a4b;font-size:11px">No tags yet — manage them in the Tags tab.</span>';
    for (const tag of tags) {
      const chip = document.createElement('button');
      chip.type = 'button';
      const on = state.selectedTags.has(tag);
      chip.className = 'tagchip' + (on ? ' active' : '');
      chip.textContent = (on ? '✓ ' : '') + tag;
      chip.addEventListener('click', () => {
        if (state.selectedTags.has(tag)) state.selectedTags.delete(tag);
        else state.selectedTags.add(tag);
        syncCreatorsToTags();
        renderTagFilters();
        renderCreators();
        renderTable();
      });
      root.appendChild(chip);
    }
    if (state.selectedTags.size) {
      const clear = document.createElement('button');
      clear.type = 'button';
      clear.className = 'tagchip tagchip-clear';
      clear.textContent = 'clear';
      clear.addEventListener('click', () => {
        state.selectedTags.clear();
        syncCreatorsToTags();
        renderTagFilters();
        renderCreators();
        renderTable();
      });
      root.appendChild(clear);
    }
  }

  function renderCreators() {
    const root = $('#creator-list');
    root.innerHTML = '<div class="side-title">Filter by creator</div>';
    const counts = new Map();
    for (const it of state.items) counts.set(it.creator, (counts.get(it.creator) || 0) + 1);
    const names = allCreatorNames();
    if (!names.length) {
      const p = document.createElement('div');
      p.style.cssText = 'color:#4a4a4b;font-size:11px';
      p.textContent = 'Nothing saved yet — run a sort on an Instagram profile.';
      root.appendChild(p);
      return;
    }
    for (const name of names) {
      const row = document.createElement('label');
      row.className = 'creator-row';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !state.selectedCreators || state.selectedCreators.has(name);
      cb.addEventListener('change', () => {
        if (!state.selectedCreators) {
          state.selectedCreators = new Set(names);
        }
        if (cb.checked) state.selectedCreators.add(name);
        else state.selectedCreators.delete(name);
        if (state.selectedCreators.size === names.length) state.selectedCreators = null;
        renderTable();
      });
      const nameWrap = document.createElement('span');
      nameWrap.className = 'creator-name';
      const nameEl = document.createElement('span');
      nameEl.textContent = name;
      nameWrap.appendChild(nameEl);
      const tags = creatorTags(name);
      if (tags.length) {
        const tagRow = document.createElement('span');
        tagRow.className = 'c-tags';
        for (const t of tags) {
          const chip = document.createElement('span');
          chip.className = 'tagchip';
          chip.textContent = t;
          tagRow.appendChild(chip);
        }
        nameWrap.appendChild(tagRow);
      }
      const count = document.createElement('span');
      count.className = 'count';
      count.textContent = counts.get(name) || 0;
      row.appendChild(cb);
      row.appendChild(nameWrap);
      row.appendChild(count);
      root.appendChild(row);
    }
  }

  function renderTable() {
    const items = filteredItems();
    $('#result-count').textContent = `${items.length} item${items.length === 1 ? '' : 's'}`;
    const wrap = $('#table-wrap');
    if (!state.items.length) {
      wrap.innerHTML = `<div class="empty"><h2>Library is empty</h2><p>Go to an Instagram profile and run a sort — results are saved here automatically.<br>Tag creators from their profile page or the Creators tab, then filter and compare.</p></div>`;
      return;
    }
    if (!items.length) {
      wrap.innerHTML = '<div class="empty"><h2>No match</h2><p>Loosen the filters.</p></div>';
      return;
    }
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    for (const col of COLUMNS) {
      const th = document.createElement('th');
      th.textContent = col.label + (col.sortable && state.sortKey === col.key ? (state.sortDir === -1 ? ' ↓' : ' ↑') : '');
      if (col.sortable) {
        th.classList.toggle('sorted', state.sortKey === col.key);
        th.addEventListener('click', () => {
          if (state.sortKey === col.key) state.sortDir *= -1;
          else { state.sortKey = col.key; state.sortDir = -1; }
          renderTable();
        });
      } else {
        th.style.cursor = 'default';
      }
      tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    for (const it of items) {
      const row = document.createElement('tr');
      const cells = [];
      const tdThumb = document.createElement('td');
      tdThumb.className = 'thumb';
      if (it.thumbnail) {
        const img = document.createElement('img');
        img.src = it.thumbnail;
        img.loading = 'lazy';
        img.referrerPolicy = 'no-referrer';
        tdThumb.appendChild(img);
        const big = document.createElement('img');
        big.src = it.thumbnail;
        big.referrerPolicy = 'no-referrer';
        bindPreview(img, () => big);
      }
      cells.push(tdThumb);

      const tdCreator = document.createElement('td');
      tdCreator.className = 'creator';
      tdCreator.textContent = it.creator;
      cells.push(tdCreator);

      const tdType = document.createElement('td');
      const pill = document.createElement('span');
      pill.className = 'type-pill';
      pill.textContent = it.type || '';
      tdType.appendChild(pill);
      cells.push(tdType);

      const tdDate = document.createElement('td');
      tdDate.textContent = fmtDate(it.date);
      cells.push(tdDate);

      for (const key of ['views', 'likes', 'comments']) {
        const td = document.createElement('td');
        td.className = 'num';
        td.textContent = fmtNum(it[key]);
        if (it[key] != null) td.title = String(it[key]);
        cells.push(td);
      }

      const tdOut = document.createElement('td');
      tdOut.className = 'num';
      tdOut.textContent = it.outlierScore != null ? Number(it.outlierScore).toFixed(1) + '×' : '';
      cells.push(tdOut);

      const tdCap = document.createElement('td');
      tdCap.className = 'caption';
      const cap = document.createElement('div');
      cap.className = 'cap';
      cap.textContent = it.caption || '';
      tdCap.appendChild(cap);
      if (it.caption) {
        bindPreview(cap, () => {
          const d = document.createElement('div');
          d.className = 'cap-full';
          d.textContent = it.caption;
          return d;
        });
      }
      cells.push(tdCap);

      const tdLink = document.createElement('td');
      if (it.url) {
        const a = document.createElement('a');
        a.className = 'open-link';
        a.href = it.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.textContent = 'open ↗';
        tdLink.appendChild(a);
      }
      cells.push(tdLink);

      for (const td of cells) row.appendChild(td);
      tbody.appendChild(row);
    }
    table.appendChild(tbody);
    wrap.innerHTML = '';
    wrap.appendChild(table);
  }

  function renderSnapshots() {
    const root = $('#snapshots');
    const feeds = [...state.feeds].sort((a, b) => b.savedAt - a.savedAt);
    root.innerHTML = '<h2>Saved sorts</h2>';
    if (!feeds.length) {
      const d = document.createElement('div');
      d.className = 'snap-row';
      d.textContent = 'No snapshots yet.';
      root.appendChild(d);
      return;
    }
    for (const f of feeds.slice(0, 50)) {
      const row = document.createElement('div');
      row.className = 'snap-row';
      const when = document.createElement('span');
      when.className = 'when';
      when.textContent = new Date(f.savedAt).toLocaleString();
      const who = document.createElement('span');
      who.className = 'who';
      who.textContent = f.creator || '—';
      const what = document.createElement('span');
      what.textContent = `${f.count} items · ${f.sortBy || 'sort'} · ${f.surface || ''}${f.postsVsReels ? ' ' + f.postsVsReels.toLowerCase() : ''}`;
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'danger';
      del.textContent = 'Delete';
      del.addEventListener('click', async () => {
        if (!confirm(`Delete this snapshot (${f.count} items)?`)) return;
        await UmbraLibrary.deleteFeed(f.id);
        await reload();
      });
      row.appendChild(when);
      row.appendChild(who);
      row.appendChild(what);
      row.appendChild(del);
      root.appendChild(row);
    }
  }

  // ── Creators view: per-creator tag management ──────────────────────────────
  function renderCreatorsView() {
    const root = $('#creators-panel');
    root.innerHTML = '<h2>Creators</h2>';
    const counts = new Map();
    for (const it of state.items) counts.set(it.creator, (counts.get(it.creator) || 0) + 1);
    const names = allCreatorNames();
    if (!names.length) {
      const d = document.createElement('div');
      d.className = 'ct-row';
      d.textContent = 'No creators yet — run a sort on an Instagram profile.';
      root.appendChild(d);
      return;
    }
    refreshTagDatalist();
    for (const name of names) {
      const row = document.createElement('div');
      row.className = 'ct-row';

      const who = document.createElement('span');
      who.className = 'ct-name';
      who.textContent = name;

      const count = document.createElement('span');
      count.className = 'ct-count';
      count.textContent = `${counts.get(name) || 0} items`;

      const tagBox = document.createElement('span');
      tagBox.className = 'ct-tags';
      for (const t of creatorTags(name)) {
        const chip = document.createElement('span');
        chip.className = 'tagchip';
        chip.textContent = t;
        const x = document.createElement('button');
        x.type = 'button';
        x.className = 'tagchip-x';
        x.textContent = '×';
        x.title = `Remove "${t}" from ${name}`;
        x.addEventListener('click', async () => {
          const next = creatorTags(name).filter(v => v !== t);
          await UmbraLibrary.setCreatorTags('instagram', name, next);
          await reload();
        });
        chip.appendChild(x);
        tagBox.appendChild(chip);
      }

      const input = document.createElement('input');
      input.className = 'ct-add';
      input.setAttribute('list', 'tag-suggestions');
      input.placeholder = '+ add tag';
      input.addEventListener('keydown', async (e) => {
        if (e.key !== 'Enter' && e.key !== ',') return;
        e.preventDefault();
        const parts = input.value.split(',').map(v => v.trim().toLowerCase()).filter(Boolean);
        if (!parts.length) return;
        const next = Array.from(new Set([...creatorTags(name), ...parts]));
        await UmbraLibrary.setCreatorTags('instagram', name, next);
        await reload();
      });

      row.appendChild(who);
      row.appendChild(count);
      row.appendChild(tagBox);
      row.appendChild(input);
      root.appendChild(row);
    }
  }

  function refreshTagDatalist() {
    const dl = $('#tag-suggestions');
    dl.replaceChildren();
    for (const t of allTags()) {
      const opt = document.createElement('option');
      opt.value = t;
      dl.appendChild(opt);
    }
  }

  // ── Tags view: rename / delete / browse tags ───────────────────────────────
  function renderTagsView() {
    const root = $('#tags-panel');
    const usage = new Map();
    for (const rec of state.creators.values()) {
      for (const t of rec.tags || []) usage.set(t, (usage.get(t) || 0) + 1);
    }
    const tags = Array.from(usage.keys()).sort((a, b) =>
      state.tagSort === 'count' ? (usage.get(b) - usage.get(a)) || a.localeCompare(b) : a.localeCompare(b));

    root.innerHTML = '<h2>Tags</h2>';
    const head = document.createElement('div');
    head.className = 'tg-row tg-head';
    const hName = document.createElement('button');
    hName.type = 'button';
    hName.className = 'tg-sort';
    hName.textContent = 'Tag' + (state.tagSort === 'name' ? ' ↓' : '');
    hName.addEventListener('click', () => { state.tagSort = 'name'; renderTagsView(); });
    const hCount = document.createElement('button');
    hCount.type = 'button';
    hCount.className = 'tg-sort';
    hCount.textContent = 'Creators' + (state.tagSort === 'count' ? ' ↓' : '');
    hCount.addEventListener('click', () => { state.tagSort = 'count'; renderTagsView(); });
    head.appendChild(hName);
    head.appendChild(hCount);
    head.appendChild(document.createElement('span'));
    root.appendChild(head);

    if (!tags.length) {
      const d = document.createElement('div');
      d.className = 'tg-row';
      d.textContent = 'No tags yet — add some from a creator profile or the Creators tab.';
      root.appendChild(d);
      return;
    }

    for (const tag of tags) {
      const row = document.createElement('div');
      row.className = 'tg-row';
      const name = document.createElement('span');
      name.className = 'tg-name';
      name.textContent = tag;
      const count = document.createElement('span');
      count.className = 'tg-count';
      count.textContent = `${usage.get(tag)} creator${usage.get(tag) === 1 ? '' : 's'}`;

      const actions = document.createElement('span');
      actions.className = 'tg-actions';
      const ren = document.createElement('button');
      ren.type = 'button';
      ren.textContent = 'Rename';
      ren.addEventListener('click', () => {
        const edit = document.createElement('input');
        edit.className = 'tg-edit';
        edit.value = tag;
        name.replaceChildren(edit);
        edit.focus();
        edit.select();
        const commit = async () => {
          const next = edit.value.trim().toLowerCase();
          if (next && next !== tag) await UmbraLibrary.renameTag(tag, next);
          await reload();
        };
        edit.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') reload();
        });
        edit.addEventListener('blur', commit);
      });
      const del = document.createElement('button');
      del.type = 'button';
      del.className = 'danger';
      del.textContent = 'Delete';
      del.addEventListener('click', async () => {
        if (!confirm(`Delete tag "${tag}" from ${usage.get(tag)} creator(s)?`)) return;
        await UmbraLibrary.deleteTag(tag);
        state.selectedTags.delete(tag);
        await reload();
      });
      actions.appendChild(ren);
      actions.appendChild(del);
      row.appendChild(name);
      row.appendChild(count);
      row.appendChild(actions);
      root.appendChild(row);
    }
  }

  function exportRows(format) {
    const items = filteredItems();
    const rows = items.map(it => ({
      creator: it.creator,
      url: it.url,
      type: it.type,
      date: fmtDate(it.date),
      views: it.views,
      likes: it.likes,
      comments: it.comments,
      outlierScore: it.outlierScore,
      caption: it.caption,
      tags: creatorTags(it.creator).join(' '),
      transcript: it.transcript || '',
    }));
    const stamp = new Date().toISOString().slice(0, 10);
    if (format === 'json') {
      const blob = new Blob([JSON.stringify(rows, null, 2)], { type: 'application/json' });
      downloadBlob(blob, `umbra-library_${stamp}.json`);
      return;
    }
    const esc = (v) => {
      const s = v == null ? '' : String(v);
      return /[",\n ]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s;
    };
    const header = Object.keys(rows[0] || { creator: '', url: '', type: '', date: '', views: '', likes: '', comments: '', outlierScore: '', caption: '', tags: '', transcript: '' });
    const csv = [header.join(','), ...rows.map(r => header.map(k => esc(r[k])).join(','))].join('\n');
    downloadBlob(new Blob([csv], { type: 'text/csv' }), `umbra-library_${stamp}.csv`);
  }

  function downloadBlob(blob, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  }

  async function reload() {
    const { feeds, items, creators } = await UmbraLibrary.getAll();
    state.feeds = feeds;
    state.items = items;
    state.creators = new Map(creators.map(c => [c.key, c]));
    renderStats();
    renderTagFilters();
    renderCreators();
    renderTable();
    renderSnapshots();
    renderCreatorsView();
    renderTagsView();
  }

  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      state.view = btn.dataset.view;
      document.querySelectorAll('.tab').forEach(b => b.classList.toggle('active', b === btn));
      document.querySelectorAll('.view').forEach(v => v.classList.toggle('hidden', v.id !== `view-${state.view}`));
    });
  });

  $('#search').addEventListener('input', (e) => { state.search = e.target.value; renderTable(); });
  $('#type-filter').addEventListener('change', (e) => { state.type = e.target.value; renderTable(); });
  $('#export-csv').addEventListener('click', () => exportRows('csv'));
  $('#export-json').addEventListener('click', () => exportRows('json'));
  $('#clear-all').addEventListener('click', async () => {
    if (!confirm('Clear the whole library (all items, snapshots and tags)?')) return;
    await UmbraLibrary.clearAll();
    await reload();
  });

  reload();
})();
