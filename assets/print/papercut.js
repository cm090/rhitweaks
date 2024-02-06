class ApiRequest {
  #PAPERCUT_URL = "https://print.rose-hulman.edu:9192/rpc/api/rest/internal/";
  #MOBILERELEASE_ENDPOINT = "mobilerelease/api/";
  #WEBCLIENT_ENDPOINT = "webclient/";
  #endpoints = {
    login: {
      url: `${this.#PAPERCUT_URL}${
        this.#WEBCLIENT_ENDPOINT
      }users/[USERNAME]/log-in`,
      method: "POST",
    },
    print: {
      url: `${this.#PAPERCUT_URL}${
        this.#MOBILERELEASE_ENDPOINT
      }held-jobs/release?username=[USERNAME]`,
      method: "POST",
    },
    cancel: {
      url: `${this.#PAPERCUT_URL}${
        this.#MOBILERELEASE_ENDPOINT
      }held-jobs/cancel?username=[USERNAME]`,
      method: "POST",
    },
    recentPrinters: {
      url: `${this.#PAPERCUT_URL}${
        this.#MOBILERELEASE_ENDPOINT
      }recent-popular-printers?username=[USERNAME]`,
      method: "GET",
    },
    allPrinters: {
      url: `${this.#PAPERCUT_URL}${
        this.#MOBILERELEASE_ENDPOINT
      }all-printers?username=[USERNAME]`,
      method: "GET",
    },
    jobs: {
      url: `${this.#PAPERCUT_URL}${
        this.#MOBILERELEASE_ENDPOINT
      }held-jobs?username=[USERNAME]&printerName=[PRINTER]`,
      method: "GET",
    },
  };

  constructor() {
    document.addEventListener("chromeStorageCallback", this.#runCall);
    document.dispatchEvent(new CustomEvent("chromeStorageGet"));
  }

  /**
   * Checks request data to prepare API call.
   * @param request request headers
   */
  #runCall = (req) => {
    const request = JSON.parse(req.detail);
    try {
      if (request === null || !request.isRequest) {
        return;
      } else if (!request.data.username) {
        throw "User is null";
      } else if (request.method === "logout") {
        this.#performLogOut();
      } else {
        this.#apiRequest(request);
      }
    } catch (e) {
      document.dispatchEvent(
        new CustomEvent("chromeStorageSet", {
          detail: JSON.stringify({
            data: {
              request: {
                result: { success: false, error: e },
                call: request.method,
              },
            },
          }),
        })
      );
      this.#postRequestAction();
    }
  };

  /**
   * Performs log out request.
   */
  #performLogOut = () => {
    let responseData;
    try {
      client.logOut(true);
      responseData = { success: true };
    } catch (e) {
      responseData = { success: false };
    }

    document.dispatchEvent(
      new CustomEvent("chromeStorageSet", {
        detail: JSON.stringify({
          data: { request: { result: responseData, call: "logout" } },
        }),
      })
    );
    this.#postRequestAction();
  };

  /**
   * Performs API call from a predefined endpoint.
   * @param request request headers
   */
  #apiRequest = (request) => {
    const apiCall = this.#endpoints[request.method];
    if (apiCall.url.includes("[USERNAME]")) {
      apiCall.url = apiCall.url.replace("[USERNAME]", request.data.username);
      delete request.data.username;
    }
    if (apiCall.url.includes("[PRINTER]")) {
      apiCall.url = apiCall.url.replace("[PRINTER]", request.data.printerName);
      delete request.data.printerName;
    }
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(request.data)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          params.append(`${key}[]`, item);
        }
      } else {
        params.append(key, value);
      }
    }

    const apiData = {
      method: apiCall.method,
      body: params,
    };
    if (apiCall.method === "GET") {
      delete apiData.body;
    }

    fetch(apiCall.url, apiData)
      .then((res) =>
        res.ok ? res.json() : { success: false, error: res.statusText }
      )
      .then((res) => {
        if (res["error-msg"]) {
          const error = res["error-msg"];
          delete res["error-msg"];
          res.error = error;
        }
        document.dispatchEvent(
          new CustomEvent("chromeStorageSet", {
            detail: JSON.stringify({
              data: { request: { result: res, call: request.method } },
            }),
          })
        );
        this.#postRequestAction();
      });
  };

  /**
   * Performs an action after the API call is complete.
   */
  #postRequestAction = () => window.close();
}

new ApiRequest();
