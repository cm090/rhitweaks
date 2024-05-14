const injectScript = (path) => {
  const node = document.getElementsByTagName("body")[0];
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", chrome.runtime.getURL(path));
  node.appendChild(script);
};

const main = () => {
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
  chrome.storage.local.onChanged.addListener((changes) =>
    document.dispatchEvent(
      new CustomEvent("chromeStorageRequest", {
        detail: JSON.stringify(changes.print),
      })
    )
  );

  if (window.location.hostname === "print.rose-hulman.edu") {
    injectScript("assets/print/papercut.js");
  } else {
    injectScript("popup/jquery.min.js");
    injectScript("assets/print/base64.js");
    injectScript("assets/print/rhprint.js");
  }
};

main();
