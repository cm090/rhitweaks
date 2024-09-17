const preventSignOut = () => {
  const observer = new MutationObserver(() => {
    if (
      (
        document.querySelector(
          '.notification-center-message-with-prompts .notification-item-message',
        ) as HTMLElement
      ).innerText.includes('Would you like to logout now?')
    ) {
      (
        document.querySelector(
          '.notification-center-message-with-prompts .notification-flyout-item.primary',
        ) as HTMLButtonElement
      ).click();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

export default preventSignOut;
