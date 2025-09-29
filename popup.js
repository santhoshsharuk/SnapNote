document.getElementById('captureBtn').addEventListener('click', () => {
  chrome.runtime.sendMessage({action: 'captureAndOpenEditor'});
  window.close(); // close popup
});
