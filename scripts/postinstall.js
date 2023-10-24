chrome.runtime.onInstalled.addListener((obj) => {
  const externalUrl = "https://link.canon.click/rhitweaks/wiki";

  if (obj.reason === chrome.runtime.OnInstalledReason.INSTALL) {
    chrome.tabs.create({ url: externalUrl });
  }
});
