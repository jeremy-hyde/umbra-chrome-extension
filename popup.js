const STORAGE_KEY = 'umbra_enabled';
const btn = document.getElementById('power-btn');
const status = document.getElementById('status');
const siteLabel = document.getElementById('site-label');
const cookieCount = document.getElementById('cookie-count');
const storageCount = document.getElementById('storage-count');
const clearBtn = document.getElementById('clear-btn');

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
});
