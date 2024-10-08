const transformUrl = () => {
  if (
    ((window.location.pathname.length < 2 && !window.location.search) ||
      window.location.href.includes('enrol')) &&
    !window.location.hash.includes('bypass')
  ) {
    window.location.pathname = '/my';
  }
  for (const link of Array.from(document.querySelectorAll('a'))) {
    if (link.href.includes('?forcedownload=1')) {
      link.href = link.href.split('?forcedownload')[0];
      link.target = '_blank';
    }
  }
  if (
    document.querySelector('.navbar .navbar-brand') &&
    !window.location.pathname.includes('/my')
  ) {
    (document.querySelector('.navbar .navbar-brand') as HTMLLinkElement).href =
      '/my';
  }
  if (window.location.pathname.includes('/login')) {
    (
      document.querySelector('.login-identityprovider-btn') as HTMLButtonElement
    ).click();
  }
  return Promise.resolve();
};

export default transformUrl;
