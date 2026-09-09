const STORAGE_KEY = 'umbra_enabled';
const btn = document.getElementById('power-btn');
const status = document.getElementById('status');
const siteLabel = document.getElementById('site-label');
const cookieCount = document.getElementById('cookie-count');
const storageCount = document.getElementById('storage-count');
const clearBtn = document.getElementById('clear-btn');
const cookiesDlBtn = document.getElementById('cookies-dl-btn');
const suspendBtn = document.getElementById('suspend-btn');
const notionDlBtn = document.getElementById('notion-dl-btn');
const colorPickBtn = document.getElementById('color-pick-btn');
const colorHistory = document.getElementById('color-history');
const colorSwatches = document.getElementById('color-swatches');
const tabList = document.getElementById('tab-list');

// ── Color history ──────────────────────────────────────────────────────
function loadColorHistory() {
  chrome.storage.local.get('umbra_color_history', (res) => {
    const history = res.umbra_color_history || [];
    renderColorSwatches(history);
  });
}

function renderColorSwatches(history) {
  if (!history.length) {
    colorHistory.style.display = 'none';
    return;
  }
  colorHistory.style.display = '';
  colorSwatches.innerHTML = history.map(hex => `
    <div class="color-swatch-item" style="background:${hex};" data-hex="${hex}" title="${hex}">
      <span class="copy-tooltip">${hex}</span>
    </div>
  `).join('');

  // Click to copy
  colorSwatches.querySelectorAll('.color-swatch-item').forEach(el => {
    el.addEventListener('click', () => {
      const hex = el.dataset.hex;
      navigator.clipboard.writeText(hex).catch(() => {});
      // Brief flash feedback
      const tooltip = el.querySelector('.copy-tooltip');
      tooltip.textContent = 'Copied!';
      tooltip.style.color = '#4fbdba';
      setTimeout(() => {
        tooltip.textContent = hex;
        tooltip.style.color = '';
      }, 1000);
    });
  });
}

// Listen for storage changes so history stays fresh when popup reopens
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.umbra_color_history) {
    renderColorSwatches(changes.umbra_color_history.newValue || []);
  }
});

// Load on open
loadColorHistory();

function setUI(enabled) {
  btn.classList.toggle('on', enabled);
  status.textContent = enabled ? 'On' : 'Off';
  status.classList.toggle('on', enabled);
}

function setCount(el, n) {
  el.textContent = n;
  el.classList.toggle('has-data', n > 0);
}

async function loadCounts(tab) {
  const url = new URL(tab.url);

  // Cookies via chrome.cookies API
  const cookies = await chrome.cookies.getAll({ domain: url.hostname });
  setCount(cookieCount, cookies.length);

  // localStorage + sessionStorage item counts via scripting
  try {
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => window.localStorage.length + window.sessionStorage.length,
    });
    setCount(storageCount, result?.result ?? 0);
  } catch (_) {
    storageCount.textContent = '—';
  }
}

async function clearSiteData(tab) {
  const url = new URL(tab.url);

  // Remove all cookies for this domain (including subdomains)
  const cookies = await chrome.cookies.getAll({ domain: url.hostname });
  await Promise.all(cookies.map(c => {
    const cookieUrl = `${c.secure ? 'https' : 'http'}://${c.domain.replace(/^\./, '')}${c.path}`;
    return chrome.cookies.remove({ url: cookieUrl, name: c.name });
  }));

  // Clear localStorage, sessionStorage, and IndexedDB via scripting
  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      localStorage.clear();
      sessionStorage.clear();
      if (indexedDB.databases) {
        indexedDB.databases().then(dbs => dbs.forEach(db => indexedDB.deleteDatabase(db.name)));
      }
    },
  });

  // Feedback then refresh counts
  clearBtn.textContent = 'Cleared';
  clearBtn.classList.add('cleared');
  setTimeout(() => {
    clearBtn.textContent = 'Clear Site Data';
    clearBtn.classList.remove('cleared');
  }, 1500);

  setCount(cookieCount, 0);
  setCount(storageCount, 0);
}

async function downloadCookiesTxt(tab) {
  try {
    const url = new URL(tab.url);

    // Get all cookies for this domain (including subdomains)
    const cookies = await chrome.cookies.getAll({ domain: url.hostname });
    // Also try with URL-based lookup (catches cookies set with path restrictions etc.)
    const cookiesByUrl = await chrome.cookies.getAll({ url: tab.url });

    // Merge deduplicating by name+domain+path
    const seen = new Set();
    const merged = [];
    for (const c of [...cookies, ...cookiesByUrl]) {
      const key = `${c.name}::${c.domain}::${c.path}`;
      if (seen.has(key)) continue;
      seen.add(key);
      merged.push(c);
    }

    if (merged.length === 0) {
      cookiesDlBtn.textContent = 'No cookies found';
      cookiesDlBtn.classList.add('error');
      setTimeout(() => {
        cookiesDlBtn.textContent = '↓ Download Cookies.txt';
        cookiesDlBtn.classList.remove('error');
      }, 2000);
      return;
    }

    // Build Netscape cookie file format
    const lines = [
      '# Netscape HTTP Cookie File',
      '# https://curl.haxx.se/rfc/cookie_spec.html',
      '# This is a generated file! Do not edit.',
      '',
    ];

    for (const c of merged) {
      const domain = c.domain || '';
      const includeSub = domain.startsWith('.') ? 'TRUE' : 'FALSE';
      const path = c.path || '/';
      const secure = c.secure ? 'TRUE' : 'FALSE';
      const expiry = c.expirationDate ? Math.floor(c.expirationDate).toString() : '0';
      const name = c.name || '';
      const value = c.value || '';
      lines.push([domain, includeSub, path, secure, expiry, name, value].join('\t'));
    }

    const text = lines.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const blobUrl = URL.createObjectURL(blob);
    const filename = url.hostname + '_cookies.txt';

    const downloadId = await chrome.downloads.download({
      url: blobUrl,
      filename: filename,
      saveAs: false,
    });

    // Clean up blob URL once download completes or fails
    const onChange = (delta) => {
      if (delta.id === downloadId && delta.state && delta.state.current !== 'in_progress') {
        chrome.downloads.onChanged.removeListener(onChange);
        URL.revokeObjectURL(blobUrl);
      }
    };
    chrome.downloads.onChanged.addListener(onChange);

    cookiesDlBtn.textContent = '✓ Downloaded';
    cookiesDlBtn.classList.add('success');
    setTimeout(() => {
      cookiesDlBtn.textContent = '↓ Download Cookies.txt';
      cookiesDlBtn.classList.remove('success');
    }, 2000);

  } catch (err) {
    cookiesDlBtn.textContent = '✗ Error';
    cookiesDlBtn.classList.add('error');
    setTimeout(() => {
      cookiesDlBtn.textContent = '↓ Download Cookies.txt';
      cookiesDlBtn.classList.remove('error');
    }, 2000);
    console.error('Umbra: failed to download cookies.txt:', err);
  }
}

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  try {
    siteLabel.textContent = new URL(tab.url).hostname;
  } catch (_) {}

  // Dark mode toggle
  chrome.storage.local.get(STORAGE_KEY, (res) => {
    setUI(res[STORAGE_KEY] !== false);
  });
  btn.addEventListener('click', () => {
    chrome.storage.local.get(STORAGE_KEY, (res) => {
      const enabled = !(res[STORAGE_KEY] !== false);
      chrome.storage.local.set({ [STORAGE_KEY]: enabled });
      chrome.tabs.sendMessage(tab.id, { type: 'umbra_toggle', enabled });
      setUI(enabled);
    });
  });

  // Load counts
  loadCounts(tab);

  // Clear button
  clearBtn.addEventListener('click', () => clearSiteData(tab));

  // Cookies.txt download button
  cookiesDlBtn.addEventListener('click', async () => {
    await downloadCookiesTxt(tab);
  });

  // Color picker button
  colorPickBtn.addEventListener('click', async () => {
    try {
      await chrome.tabs.sendMessage(tab.id, { type: 'umbra_color_picker' });
      // Popup closes here — history will refresh on next open via storage listener
    } catch (_) {
      colorPickBtn.textContent = '✗ Unavailable';
      colorPickBtn.style.borderColor = '#e06c75';
      colorPickBtn.style.color = '#e06c75';
      setTimeout(() => {
        colorPickBtn.innerHTML = '<span class="swatch"></span>Pick Color';
        colorPickBtn.style.borderColor = '';
        colorPickBtn.style.color = '';
      }, 2000);
    }
  });

  // Notion download button — only show on notion.so / notion.site pages
  const isNotion = tab.url && /notion\.(so|site|com)/.test(tab.url);
  if (isNotion) {
    notionDlBtn.style.display = 'block';
    notionDlBtn.addEventListener('click', async () => {
      notionDlBtn.textContent = 'Extracting…';
      notionDlBtn.style.pointerEvents = 'none';
      try {
        const resp = await chrome.tabs.sendMessage(tab.id, { type: 'umbra_notion_download' });
        if (resp && resp.ok) {
          notionDlBtn.textContent = '✓ Downloaded';
          notionDlBtn.classList.add('success');
        } else {
          notionDlBtn.textContent = '✗ ' + ((resp && resp.error) || 'Failed');
          notionDlBtn.classList.add('error');
        }
      } catch (err) {
        // sendMessage rejects if content script isn't reachable
        notionDlBtn.textContent = '✗ No connection';
        notionDlBtn.classList.add('error');
      }
      setTimeout(() => {
        notionDlBtn.textContent = '↓ Download as Markdown';
        notionDlBtn.classList.remove('success', 'error');
        notionDlBtn.style.pointerEvents = '';
      }, 2000);
    });
  }

  // Suspend unpinned tabs button
  suspendBtn.addEventListener('click', async () => {
    const allTabs = await chrome.tabs.query({ currentWindow: true, pinned: false });
    const targets = allTabs
      .filter(t => t.id !== tab.id && t.url && !t.url.startsWith('chrome://') && !t.url.startsWith('chrome-extension://'));
    // Discard each individually — some may reject (audio, WebRTC, etc.)
    const results = await Promise.allSettled(targets.map(t => chrome.tabs.discard(t.id)));
    const succeeded = results.filter(r => r.status === 'fulfilled').length;
    suspendBtn.textContent = `Suspended ${succeeded}/${targets.length} Tab${targets.length !== 1 ? 's' : ''}`;
    suspendBtn.classList.add('done');
    setTimeout(() => {
      suspendBtn.textContent = 'Suspend Unpinned Tabs';
      suspendBtn.classList.remove('done');
    }, 2000);
  });

  // Load tab resource usage
  loadTabResources(tab.id);
});

// --- Tab Resource Monitor ---

const SAMPLE_DURATION = 5; // collect ~5 samples over ~5 seconds

async function loadTabResources(activeTabId) {
  try {
    const tabs = await chrome.tabs.query({ currentWindow: true });

    // Collect CPU samples over SAMPLE_DURATION ticks (~1s each)
    let sampleCount = 0;
    const cpuSamples = new Map(); // tabId -> [cpu1, cpu2, ...]
    const latestMem = new Map(); // tabId -> last mem reading

    const listener = (processes) => {
      sampleCount++;

      // Extract per-tab CPU & mem from this tick
      for (const [pid, proc] of Object.entries(processes)) {
        if (!proc.tasks) continue;
        for (const task of proc.tasks) {
          if (task.tabId === undefined || task.tabId <= 0) continue;
          const cpu = proc.cpu || 0;
          const mem = proc.privateMemory || 0;

          if (!cpuSamples.has(task.tabId)) cpuSamples.set(task.tabId, []);
          const samples = cpuSamples.get(task.tabId);
          // Only one entry per tick per tab (keep highest if multiple processes)
          if (samples.length < sampleCount) {
            samples.push(cpu);
          } else {
            samples[samples.length - 1] = Math.max(samples[samples.length - 1], cpu);
          }
          // Always keep latest memory
          latestMem.set(task.tabId, Math.max(latestMem.get(task.tabId) || 0, mem));
        }
      }

      // Update the UI on each tick so user sees it refining
      renderFromSamples(tabs, cpuSamples, latestMem, activeTabId, sampleCount);

      if (sampleCount >= SAMPLE_DURATION) {
        chrome.processes.onUpdatedWithMemory.removeListener(listener);
      }
    };

    chrome.processes.onUpdatedWithMemory.addListener(listener);

    // Timeout fallback
    setTimeout(() => {
      chrome.processes.onUpdatedWithMemory.removeListener(listener);
      if (sampleCount === 0) {
        tabList.innerHTML = '<div class="tab-empty">Process API unavailable (requires Dev channel)</div>';
      }
    }, 8000);

  } catch (e) {
    tabList.innerHTML = '<div class="tab-empty">Unable to read process info</div>';
  }
}

function renderFromSamples(tabs, cpuSamples, latestMem, activeTabId, sampleCount) {
  const tabData = tabs
    .filter(t => t.url && !t.url.startsWith('chrome://') && !t.url.startsWith('chrome-extension://'))
    .map(t => {
      const samples = cpuSamples.get(t.id) || [];
      const avgCpu = samples.length > 0 ? samples.reduce((a, b) => a + b, 0) / samples.length : 0;
      const mem = latestMem.get(t.id) || 0;
      return {
        id: t.id,
        title: t.title || t.url,
        favIconUrl: t.favIconUrl,
        url: t.url,
        cpu: avgCpu,
        mem,
        isActive: t.id === activeTabId,
        discarded: t.discarded,
      };
    })
    .sort((a, b) => b.cpu - a.cpu);

  renderTabList(tabData, sampleCount);
}

function renderTabList(tabData, sampleCount) {
  if (!tabData.length) {
    tabList.innerHTML = '<div class="tab-empty">No tabs to show</div>';
    return;
  }

  tabList.innerHTML = '';

  // Show sampling indicator while collecting
  if (sampleCount !== undefined && sampleCount < SAMPLE_DURATION) {
    const indicator = document.createElement('div');
    indicator.className = 'tab-empty';
    indicator.textContent = `Sampling… ${sampleCount}/${SAMPLE_DURATION}s`;
    tabList.appendChild(indicator);
  }

  for (const t of tabData) {
    const row = document.createElement('div');
    row.className = 'tab-row';
    if (t.cpu > 30) row.classList.add('high-cpu');
    else if (t.cpu > 10) row.classList.add('mid-cpu');

    const cpuStr = t.cpu.toFixed(1) + '%';
    const memStr = formatMem(t.mem);

    row.innerHTML = `
      ${t.favIconUrl ? `<img class="tab-favicon" src="${escapeHtml(t.favIconUrl)}" onerror="this.style.display='none'">` : ''}
      <div class="tab-info">
        <div class="tab-title" title="${escapeHtml(t.title)}">${escapeHtml(truncate(t.title, 30))}</div>
        <div class="tab-metrics">
          <span class="metric-cpu">CPU ${cpuStr}</span>
          <span class="metric-mem">${memStr}</span>
        </div>
      </div>
    `;

    // Suspend button
    const suspBtn = document.createElement('button');
    suspBtn.className = 'tab-suspend-btn';
    if (t.discarded) {
      suspBtn.textContent = '💤';
      suspBtn.classList.add('suspended');
    } else if (t.isActive) {
      suspBtn.textContent = '⏸';
      suspBtn.disabled = true;
      suspBtn.style.opacity = '0.3';
      suspBtn.title = 'Cannot suspend active tab';
    } else {
      suspBtn.textContent = '⏸';
      suspBtn.title = 'Suspend this tab';
      suspBtn.addEventListener('click', async () => {
        try {
          await chrome.tabs.discard(t.id);
          suspBtn.textContent = '💤';
          suspBtn.classList.add('suspended');
        } catch (_) {
          suspBtn.textContent = '✗';
        }
      });
    }
    row.appendChild(suspBtn);
    tabList.appendChild(row);
  }
}

function formatMem(bytes) {
  if (!bytes) return '';
  const mb = bytes / (1024 * 1024);
  return mb >= 1000 ? (mb / 1024).toFixed(1) + ' GB' : mb.toFixed(0) + ' MB';
}

function truncate(str, len) {
  return str.length > len ? str.slice(0, len) + '…' : str;
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
