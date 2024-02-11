class ApiExtension {
  logIn = (username, password) =>
    this.#performApiCall("login", {
      username,
      password: $.base64.encodeUtf8(password),
      remember: "on",
    });

  cookieLogIn = (username, authCookie) =>
    this.#performApiCall("login", {
      username,
      authCookie: `${username}:${authCookie}`,
      remember: "on",
      firstLogin: true,
    });

  logOut = (username) => this.#performApiCall("logout", { username });

  releasePrints = (username, printerName, jobIds) =>
    this.#performApiCall("print", { username, printerName, jobIds });

  cancelPrints = (username, jobIds) =>
    this.#performApiCall("cancel", { username, jobIds });

  recentPrinters = (username) =>
    this.#performApiCall("recentPrinters", { username });

  allPrinters = (username) => this.#performApiCall("allPrinters", { username });

  listJobs = (username, printerName) =>
    this.#performApiCall("jobs", { username, printerName });

  /**
   * Send API request headers to Chrome storage, and service worker will open the Papercut website.
   * @param method "GET" or "POST"
   * @param data additional data for POST requests
   */
  #performApiCall = (method, data) =>
    navigator.locks.request(
      "apiRequest",
      () =>
        new Promise((res) => {
          const onDataChanged = (result) => {
            const data = JSON.parse(result.detail).newValue.request;
            if (!data || data.isRequest) {
              return;
            }
            res(data);
          };

          document.addEventListener("chromeStorageRequest", onDataChanged);
          document.dispatchEvent(
            new CustomEvent("chromeStorageSet", {
              detail: JSON.stringify({
                data: { request: { method, data, isRequest: true } },
              }),
            })
          );
        })
    );
}

const main = () => {
  window.api = new ApiExtension();
  window.dispatchEvent(new CustomEvent("apiReady"));
};

main();
