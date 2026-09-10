const PROVIDERS = {
  openrouter: {
    storageKey: 'umbra_openrouter_api_key',
    validate: value => /^sk-or-v1-[A-Za-z0-9_-]+$/.test(value),
    invalidMessage: 'Enter a valid OpenRouter key that starts with sk-or-v1-.',
  },
};

function setMessage(root, text, state = '') {
  const message = root.querySelector('.message');
  message.textContent = text;
  message.className = `message ${state}`.trim();
}

function setStatus(root, configured) {
  const status = root.querySelector('.status');
  status.textContent = configured ? 'Configured' : 'Not configured';
  status.classList.toggle('configured', configured);
}

for (const root of document.querySelectorAll('[data-provider]')) {
  const provider = PROVIDERS[root.dataset.provider];
  if (!provider) continue;
  const input = root.querySelector('.provider-key');

  chrome.storage.local.get(provider.storageKey).then(data => setStatus(root, !!data[provider.storageKey]));

  root.querySelector('.save-key').addEventListener('click', async () => {
    const value = input.value.trim();
    if (!provider.validate(value)) {
      setMessage(root, provider.invalidMessage, 'error');
      return;
    }
    await chrome.storage.local.set({ [provider.storageKey]: value });
    input.value = '';
    setStatus(root, true);
    setMessage(root, 'Key saved locally.', 'ok');
  });

  root.querySelector('.remove-key').addEventListener('click', async () => {
    const data = await chrome.storage.local.get(provider.storageKey);
    if (!data[provider.storageKey]) {
      setStatus(root, false);
      setMessage(root, 'No saved key to remove.');
      return;
    }
    if (!confirm('Remove the saved API key?')) return;
    await chrome.storage.local.remove(provider.storageKey);
    input.value = '';
    setStatus(root, false);
    setMessage(root, 'Key removed.');
  });
}

// ── Instagram behavior ─────────────────────────────────────────────────
const igOpenIn = document.getElementById('instagram-open-in');
const igDownloadToggle = document.getElementById('instagram-download-toggle');
const igTranscribeToggle = document.getElementById('instagram-transcribe-toggle');

if (igOpenIn) {
  chrome.storage.local.get([
    'umbra_instagram_open_in',
    'umbra_instagram_download_enabled',
    'umbra_instagram_transcribe_enabled',
    'sortfeed_ig_open_in',
    'sortfeed_ig_download_enabled',
    'sortfeed_ig_transcribe_enabled',
  ]).then(saved => {
    igOpenIn.value = saved.sortfeed_ig_open_in || saved.umbra_instagram_open_in || 'player';
    igDownloadToggle.checked = (saved.sortfeed_ig_download_enabled ?? saved.umbra_instagram_download_enabled) !== false;
    igTranscribeToggle.checked = (saved.sortfeed_ig_transcribe_enabled ?? saved.umbra_instagram_transcribe_enabled) !== false;
  });

  igOpenIn.addEventListener('change', () => chrome.storage.local.set({
    umbra_instagram_open_in: igOpenIn.value,
    sortfeed_ig_open_in: igOpenIn.value,
  }));
  igDownloadToggle.addEventListener('change', () => chrome.storage.local.set({
    umbra_instagram_download_enabled: igDownloadToggle.checked,
    sortfeed_ig_download_enabled: igDownloadToggle.checked,
  }));
  igTranscribeToggle.addEventListener('change', () => chrome.storage.local.set({
    umbra_instagram_transcribe_enabled: igTranscribeToggle.checked,
    sortfeed_ig_transcribe_enabled: igTranscribeToggle.checked,
  }));
}
