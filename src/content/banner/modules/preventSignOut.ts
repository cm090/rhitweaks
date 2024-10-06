const preventSignOut = () => {
  const observer = new MutationObserver(() => {
    const notification = document.querySelector(
      '.notification-center-message-with-prompts .notification-item-message',
    );
    const button = document.querySelector(
      '.notification-center-message-with-prompts .notification-flyout-item.primary',
    );
    if (!notification) {
      return;
    }
    if (
      (notification as HTMLElement).innerText.includes(
        'Would you like to logout now?',
      ) &&
      button
    ) {
      (button as HTMLButtonElement).click();
      window.location.reload();
    }
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

export default preventSignOut;
