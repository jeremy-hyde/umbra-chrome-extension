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

  return false;
});
