const UMBRA_STT_KEY = 'umbra_openrouter_api_key';

const input = document.getElementById('openrouter-key');
const statusEl = document.getElementById('key-status');
const saveBtn = document.getElementById('save-key');

chrome.storage.local.get({ [UMBRA_STT_KEY]: '' }, (v) => {
  input.value = (v && v[UMBRA_STT_KEY]) || '';
});

saveBtn.addEventListener('click', () => {
  const key = input.value.trim();
  statusEl.classList.remove('error');
  if (key && !/^sk-or-v1-[A-Za-z0-9_-]+$/.test(key)) {
    statusEl.textContent = 'OpenRouter keys look like "sk-or-v1-…". Saved anyway.';
  }
  chrome.storage.local.set({ [UMBRA_STT_KEY]: key }, () => {
    statusEl.textContent = key ? 'Saved.' : 'Key removed.';
    setTimeout(() => { statusEl.textContent = ''; }, 2500);
  });
});
