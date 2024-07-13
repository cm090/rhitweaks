const encodeUtf8 = (s: string) => {
  const _PADCHAR = '=';
  const _ALPHA =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  function _getbyte(s: string, i: number) {
    const x = s.charCodeAt(i);
    if (x > 255) {
      throw 'INVALID_CHARACTER_ERR: DOM Exception 5';
    }
    return x;
  }

  let i, b10;
  const x = [],
    imax = s.length - (s.length % 3);
  if (s.length === 0) {
    return s;
  }
  for (i = 0; i < imax; i += 3) {
    b10 =
      (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8) | _getbyte(s, i + 2);
    x.push(_ALPHA.charAt(b10 >> 18));
    x.push(_ALPHA.charAt((b10 >> 12) & 63));
    x.push(_ALPHA.charAt((b10 >> 6) & 63));
    x.push(_ALPHA.charAt(b10 & 63));
  }
  switch (s.length - imax) {
    case 1:
      b10 = _getbyte(s, i) << 16;
      x.push(
        _ALPHA.charAt(b10 >> 18) +
          _ALPHA.charAt((b10 >> 12) & 63) +
          _PADCHAR +
          _PADCHAR,
      );
      break;
    case 2:
      b10 = (_getbyte(s, i) << 16) | (_getbyte(s, i + 1) << 8);
      x.push(
        _ALPHA.charAt(b10 >> 18) +
          _ALPHA.charAt((b10 >> 12) & 63) +
          _ALPHA.charAt((b10 >> 6) & 63) +
          _PADCHAR,
      );
      break;
  }
  return unescape(encodeURIComponent(x.join('')));
};

class ApiExtension {
  logIn = (username: string, password: string) =>
    this.#performApiCall('login', {
      username,
      password: encodeUtf8(password),
      remember: 'on',
    });

  cookieLogIn = (username: string, authCookie: string) =>
    this.#performApiCall('login', {
      username,
      authCookie: `${username}:${authCookie}`,
      remember: 'on',
      firstLogin: true,
    });

  logOut = (username: string) => this.#performApiCall('logout', { username });

  releasePrints = (username: string, printerName: string, jobIds: string[]) =>
    this.#performApiCall('print', { username, printerName, jobIds });

  cancelPrints = (username: string, jobIds: string[]) =>
    this.#performApiCall('cancel', { username, jobIds });

  recentPrinters = (username: string) =>
    this.#performApiCall('recentPrinters', { username });

  allPrinters = (username: string) =>
    this.#performApiCall('allPrinters', { username });

  listJobs = (username: string, printerName: string) =>
    this.#performApiCall('jobs', { username, printerName });

  /**
   * Send API request headers to Chrome storage, and service worker will open the Papercut website.
   * @param method action to perform
   * @param data additional data for POST requests
   */
  #performApiCall = (method: string, data: object) =>
    navigator.locks.request(
      'apiRequest',
      () =>
        new Promise((res) => {
          const onDataChanged = (result: Event) => {
            const data = JSON.parse((result as CustomEvent).detail).newValue
              .request;
            if (!data || data.isRequest) {
              return;
            }
            res(data);
          };

          document.addEventListener('chromeStorageRequest', onDataChanged);
          document.dispatchEvent(
            new CustomEvent('chromeStorageSet', {
              detail: JSON.stringify({
                data: { request: { method, data, isRequest: true } },
              }),
            }),
          );
        }),
    );
}

const loadRhPrint = () => {
  (window as typeof window & { api: ApiExtension }).api = new ApiExtension();
  window.dispatchEvent(new CustomEvent('apiReady'));
};

loadRhPrint();
