const PAPERCUT_URL = "https://print.rose-hulman.edu:9192/client";

chrome.storage.local.onChanged.addListener((res) => {
  if (!res.print) {
    return;
  }
  try {
    if (res.print.newValue.request.isRequest) {
      chrome.tabs.create({
        url: PAPERCUT_URL,
        active: false,
      });
    }
  } catch (e) {}
});
