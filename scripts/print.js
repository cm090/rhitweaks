const injectScript = (path) => {
  const node = document.getElementsByTagName("body")[0];
  let script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", chrome.runtime.getURL(path));
  node.appendChild(script);
};

const main = () => {
  // Create event listeners for getting and setting Chrome storage
  document.addEventListener("chromeStorageSet", ({ detail }) =>
    chrome.storage.local.set({ print: JSON.parse(detail).data })
  );
  document.addEventListener("chromeStorageGet", () =>
    chrome.storage.local.get("print", (res) => {
      const data = res.print.request;
      document.dispatchEvent(
        new CustomEvent("chromeStorageCallback", {
          detail: JSON.stringify(data),
        })
      );
    })
  );
  chrome.storage.local.onChanged.addListener((changes) => {
    const data = changes.print;
    document.dispatchEvent(
      new CustomEvent("chromeStorageRequest", { detail: JSON.stringify(data) })
    );
  });

  // Inject scripts to appropriate pages
  if (window.location.hostname === "print.rose-hulman.edu") {
    injectScript("assets/print/papercut.js");
  } else {
    injectScript("popup/jquery.min.js");
    injectScript("assets/print/base64.js");
    injectScript("assets/print/rhprint.js");
  }
};

main();
