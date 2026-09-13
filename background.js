const OPENROUTER_URL = 'https://openrouter.ai/api/v1/audio/transcriptions';
const OPENROUTER_MODEL = 'openai/whisper-large-v3-turbo';
const OPENROUTER_KEY = 'umbra_openrouter_api_key';
const MAX_MEDIA_BYTES = 25 * 1024 * 1024;
const REQUEST_TIMEOUT_MS = 150000;
const activeJobs = new Map();

chrome.storage.local.get([
  'sort_feed_state_type_flag',
  'sort_feed_user_id',
  'sortfeed_ig_download_enabled',
  'sortfeed_ig_transcribe_enabled',
  'sortfeed_ig_open_in',
  'umbra_instagram_download_enabled',
  'umbra_instagram_transcribe_enabled',
  'umbra_instagram_open_in',
]).then(data => {
  const defaults = {};
  if (!data.sort_feed_state_type_flag) defaults.sort_feed_state_type_flag = 'pro';
  if (!data.sort_feed_user_id) defaults.sort_feed_user_id = 'umbra-local';
  if (data.sortfeed_ig_download_enabled == null) defaults.sortfeed_ig_download_enabled = data.umbra_instagram_download_enabled !== false;
  if (data.sortfeed_ig_transcribe_enabled == null) defaults.sortfeed_ig_transcribe_enabled = data.umbra_instagram_transcribe_enabled !== false;
  if (!data.sortfeed_ig_open_in) defaults.sortfeed_ig_open_in = data.umbra_instagram_open_in === 'instagram' ? 'instagram' : 'player';
  if (Object.keys(defaults).length) chrome.storage.local.set(defaults);
});

function isInstagramSender(sender) {
  try {
    return sender.tab?.id != null && new URL(sender.url || sender.tab.url).hostname === 'www.instagram.com';
  } catch (_) {
    return false;
  }
}

function isInstagramMediaUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (
      url.hostname === 'www.instagram.com' ||
      url.hostname.endsWith('.instagram.com') ||
      url.hostname.endsWith('.cdninstagram.com') ||
      url.hostname.endsWith('.fbcdn.net')
    );
  } catch (_) {
    return false;
  }
}

function errorDetails(error, status = 0) {
  if (error?.name === 'AbortError') return { code: 'cancelled', message: 'Transcription cancelled.' };
  if (status === 401) return { code: 'invalid_key', message: 'The OpenRouter API key is invalid.' };
  if (status === 402) return { code: 'no_credits', message: 'The OpenRouter account has insufficient credits.' };
  if (status === 413) return { code: 'too_large', message: 'The media is larger than 25 MB.' };
  if (status === 429) return { code: 'rate_limited', message: 'OpenRouter rate limit reached. Try again later.' };
  if (status >= 500) return { code: 'provider_error', message: 'The transcription provider is unavailable.' };
  return { code: 'transcription_failed', message: error?.message || 'Transcription failed.' };
}

// Codes sent to the content scripts must match the `ft` message table in
// Instagram/content.js (media_fetch_failed also triggers the in-page
// download-and-resend fallback).
function clientErrorCode(code) {
  const map = {
    too_large: 'media_too_large',
    transcription_failed: 'whisper_failed',
  };
  return map[code] || code || 'internal_error';
}

function extensionFor(blob, sourceUrl = '') {
  const byType = {
    'audio/aac': 'aac',
    'audio/flac': 'flac',
    'audio/m4a': 'm4a',
    'audio/mp4': 'm4a',
    'audio/mpeg': 'mp3',
    'audio/ogg': 'ogg',
    'audio/wav': 'wav',
    'audio/webm': 'webm',
    'video/mp4': 'mp4',
    'video/webm': 'webm',
  };
  if (byType[blob.type]) return byType[blob.type];
  try {
    const match = new URL(sourceUrl).pathname.match(/\.([a-z0-9]{2,5})$/i);
    if (match) return match[1].toLowerCase();
  } catch (_) {}
  return 'mp4';
}

function base64ToBlob(value, mime = 'video/mp4') {
  const raw = value.includes(',') ? value.slice(value.indexOf(',') + 1) : value;
  if (raw.length * 0.75 > MAX_MEDIA_BYTES) throw Object.assign(new Error('The media is larger than 25 MB.'), { code: 'too_large' });
  const binary = atob(raw);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

async function readLimitedBlob(response, signal) {
  if (!response.body) return response.blob();
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    size += value.byteLength;
    if (size > MAX_MEDIA_BYTES) {
      await reader.cancel();
      throw Object.assign(new Error('The media is larger than 25 MB.'), { code: 'too_large' });
    }
    chunks.push(value);
  }
  return new Blob(chunks, { type: response.headers.get('content-type') || 'application/octet-stream' });
}

async function resolveMedia(message, signal) {
  if (message.base64 || message.ReelBase64) {
    return { blob: base64ToBlob(message.base64 || message.ReelBase64, message.mimeType), sourceUrl: '' };
  }
  const sourceUrl = message.mediaUrl || message.ReelURL;
  if (!isInstagramMediaUrl(sourceUrl)) {
    throw Object.assign(new Error('Unsupported Instagram media URL.'), { code: 'media_fetch_failed' });
  }
  let response;
  try {
    response = await fetch(sourceUrl, { signal, credentials: 'omit' });
  } catch (error) {
    if (error?.name === 'AbortError') throw error;
    throw Object.assign(new Error(`Media download failed (${error?.message || 'network error'}).`), { code: 'media_fetch_failed' });
  }
  if (!response.ok) {
    throw Object.assign(new Error(`Media download failed (${response.status}).`), { code: 'media_fetch_failed' });
  }
  const length = Number(response.headers.get('content-length'));
  if (length > MAX_MEDIA_BYTES) {
    const error = new Error('The media is larger than 25 MB.');
    error.code = 'too_large';
    throw error;
  }
  const blob = await readLimitedBlob(response, signal);
  return { blob, sourceUrl };
}

async function transcribe(message, sender) {
  const tabId = sender.tab.id;
  const jobId = message.jobId ?? crypto.randomUUID();
  const legacySingle = message.command === 'InstagramReelTranscribe';
  const legacyMission = message.command === 'SelectMissionTranscribe';
  const key = `${tabId}:${jobId}`;
  const controller = new AbortController();
  let timedOut = false;
  const timeout = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, REQUEST_TIMEOUT_MS);
  const keepalive = setInterval(() => chrome.runtime.getPlatformInfo(() => {}), 20000);
  activeJobs.set(key, controller);
  if (legacySingle) {
    chrome.tabs.sendMessage(tabId, { type: 'TRANS_STARTED', jobId, clientJobId: `umbra_${jobId}` }).catch(() => {});
    chrome.tabs.sendMessage(tabId, { type: 'TRANS_LOADING', jobId }).catch(() => {});
  }
  if (legacyMission) chrome.tabs.sendMessage(tabId, { type: 'MISSION_TRANS_LOADING', jobId }).catch(() => {});

  try {
    const stored = await chrome.storage.local.get(OPENROUTER_KEY);
    const apiKey = String(stored[OPENROUTER_KEY] || '').trim();
    if (!apiKey) throw Object.assign(new Error('Add an OpenRouter API key in Umbra first.'), { code: 'missing_key' });
    const { blob, sourceUrl } = await resolveMedia(message, controller.signal);
    if (blob.size > MAX_MEDIA_BYTES) throw Object.assign(new Error('The media is larger than 25 MB.'), { code: 'too_large' });
    const extension = extensionFor(blob, sourceUrl);
    const form = new FormData();
    form.append('model', OPENROUTER_MODEL);
    form.append('file', blob, `instagram-media.${extension}`);
    let response;
    try {
      response = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
        signal: controller.signal,
      });
    } catch (error) {
      if (error?.name === 'AbortError') throw error;
      throw Object.assign(new Error(`Could not reach OpenRouter (${error?.message || 'network error'}).`), { code: 'network' });
    }
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw Object.assign(new Error(result.error?.message || `OpenRouter error (${response.status}).`), { status: response.status });
    const text = String(result.text || '').trim();
    if (!text) throw Object.assign(new Error('OpenRouter returned an empty transcript.'), { code: 'empty_transcript' });
    if (legacyMission) {
      await chrome.tabs.sendMessage(tabId, { type: 'MISSION_TRANS_RESULT', transcription: text, partial: false, jobId });
    } else if (legacySingle) {
      await chrome.tabs.sendMessage(tabId, {
        type: 'TRANSCRIPTION_RESULT',
        data: {
          ReelType: message.ReelType,
          ReelURL: message.ReelURL,
          transcription: text,
          partial: !!message.partialHint,
          duration_seconds: result.usage?.seconds,
        },
        jobId,
      });
    } else {
      await chrome.tabs.sendMessage(tabId, {
        type: message.mission ? 'umbra_instagram_bulk_transcription_result' : 'umbra_instagram_transcription_result',
        jobId,
        itemId: message.itemId || message.reelIdUi,
        text,
        usage: result.usage || null,
      });
    }
  } catch (error) {
    const details = timedOut
      ? { code: 'timeout', message: 'OpenRouter did not finish the transcription in time.' }
      : errorDetails(error, error.status);
    if (error.code) details.code = error.code;
    details.code = clientErrorCode(details.code);
    const errorMessage = legacyMission
      ? { type: 'MISSION_TRANS_ERROR', jobId, errorCode: details.code, error: details.message }
      : legacySingle
        ? { type: 'TRANSCRIPTION_ERROR', jobId, errorCode: details.code, error: details.message }
        : {
            type: message.mission ? 'umbra_instagram_bulk_transcription_error' : 'umbra_instagram_transcription_error',
            jobId,
            itemId: message.itemId || message.reelIdUi,
            ...details,
          };
    await chrome.tabs.sendMessage(tabId, errorMessage).catch(() => {});
  } finally {
    clearTimeout(timeout);
    clearInterval(keepalive);
    activeJobs.delete(key);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message?.type === 'umbra_capture_visible_tab') {
    if (sender.tab?.id == null || !sender.tab.active) {
      sendResponse({ ok: false, error: 'The source tab is not active.' });
      return false;
    }
    chrome.tabs.captureVisibleTab(sender.tab.windowId, { format: 'png' })
      .then(dataUrl => sendResponse({ ok: true, dataUrl }))
      .catch(error => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  if (message?.type === 'umbra_instagram_sort_request' || message?.refresh === 'ON') {
    const tabId = message.tabId || sender.tab?.id;
    if (tabId != null) {
      chrome.tabs.sendMessage(tabId, {
        type: 'umbra_instagram_sort',
        action: 'refreshPage',
        sortBy: message.sortBy || message.sort_by,
        scopeMode: message.scopeMode || message.dates_items,
        scopeValue: message.scopeValue || message.no_items,
        sort_by: message.sortBy || message.sort_by,
        dates_items: message.scopeMode || message.dates_items,
        no_items: message.scopeValue || message.no_items,
        outlier_scores: (message.sortBy || message.sort_by) === 'outlier',
      }).then(() => sendResponse({ ok: true })).catch(error => sendResponse({ ok: false, error: error.message }));
      return true;
    }
  }

  if (message?.type === 'umbra_instagram_transcribe' || message?.command === 'InstagramReelTranscribe' || message?.command === 'SelectMissionTranscribe') {
    if (!isInstagramSender(sender)) {
      sendResponse({ ok: false, error: 'Invalid sender.' });
      return false;
    }
    transcribe({ ...message, mission: message.mission || message.command === 'SelectMissionTranscribe' }, sender);
    sendResponse({ ok: true });
    return false;
  }

  if (message?.type === 'umbra_instagram_cancel_transcription' || message?.command === 'cancelTranscription') {
    if (!isInstagramSender(sender)) return false;
    const controller = activeJobs.get(`${sender.tab.id}:${message.jobId}`);
    if (controller) controller.abort();
    sendResponse({ ok: !!controller });
    return false;
  }

  if (message?.type === 'umbra_instagram_cancel_all' || message?.command === 'cancelSelectMission') {
    if (!isInstagramSender(sender)) return false;
    const prefix = `${sender.tab.id}:`;
    for (const [key, controller] of activeJobs) if (key.startsWith(prefix)) controller.abort();
    sendResponse({ ok: true });
    return false;
  }

  if (message?.type === 'umbra_instagram_download') {
    if (!isInstagramSender(sender) || !isInstagramMediaUrl(message.url)) {
      sendResponse({ ok: false, error: 'Invalid download.' });
      return false;
    }
    chrome.downloads.download({ url: message.url, filename: message.filename, saveAs: false })
      .then(id => sendResponse({ ok: true, id }))
      .catch(error => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  if (message?.export_click && sender.tab?.id != null) {
    chrome.tabs.sendMessage(sender.tab.id, {
      export_click_background: true,
      posts_vs_reels: message.posts_vs_reels,
      sorted_data: message.sorted_data,
      export_format: message.export_format,
    }).then(() => sendResponse({ ok: true })).catch(error => sendResponse({ ok: false, error: error.message }));
    return true;
  }

  if (message?.command === 'checkProStatus') {
    sendResponse({ isPro: true });
    return false;
  }

  if (message?.type === 'GET_STATE_BASED_USERID') {
    sendResponse({ type: 'HANDLE_STATE_BASED_USERID', userState: 'pro' });
    return false;
  }

  if (message?.type === 'CHECK_SERVER_USER') {
    sendResponse({ ok: true, found: true, row: { stateType: 'pro' } });
    return false;
  }

  if (message?.command === 'fetchTransQuotaInfo' || message?.command === 'refundTransJob') {
    sendResponse({ ok: true });
    return false;
  }

  return false;
});
