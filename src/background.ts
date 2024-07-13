const PAPERCUT_URL = "https://print.rose-hulman.edu:9192/client";

// Open Papercut on new request (in the background)
chrome.storage.local.onChanged.addListener((res) => {
  const changes = res;
  if (!changes.print) {
    return;
  }
  try {
    console.log(changes);
    if (changes.print.newValue.request.isRequest) {
      chrome.tabs.create({
        url: PAPERCUT_URL,
        active: false,
      });
    }
  } catch (e) {
    // Do nothing
  }
});
