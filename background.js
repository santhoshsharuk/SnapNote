chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === 'captureAndOpenEditor') {
    // capture visible tab
    chrome.tabs.captureVisibleTab(null, {format: 'png'}, (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) {
        alert('Capture failed: ' + (chrome.runtime.lastError?.message || 'unknown'));
        return;
      }

      // store image in storage
      chrome.storage.local.set({captureImage: dataUrl}, () => {
        // open editor in new tab
        const url = chrome.runtime.getURL('editor.html');
        chrome.tabs.create({url});
      });
    });
  }
});
