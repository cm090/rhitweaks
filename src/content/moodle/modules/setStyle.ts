// noinspection JSDeprecatedSymbols

const applyStyle = async () => {
  await import('../styles.css');
  replaceAccentColor();
  styleGradeBookPage();
};

const replaceAccentColor = () => {
  for (const sheet of Array.from(
    document.querySelectorAll('style,link[rel="stylesheet"]'),
  )) {
    if (sheet) {
      try {
        const styleSheet = (sheet as HTMLLinkElement).sheet;
        if (!styleSheet) {
          return;
        }
        const rules = styleSheet.cssRules || styleSheet.rules;
        const newRules = Array.from(rules).map((rule) =>
          rule.cssText.replace(/maroon|rgb\(128, 0, 0\)/g, '--accent-color'),
        );
        Array(rules).forEach((_, index) => styleSheet.deleteRule(index));
        for (const rule of newRules) {
          styleSheet.insertRule(rule);
        }
      } catch (e) {
        // Ignore
      }
    }
  }
};

const styleGradeBookPage = () => {
  const observer = new MutationObserver((mutations) =>
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        const gradebook = document.querySelector('.gradeparent');
        if (!gradebook) {
          return;
        }
        const shortcuts = document.querySelector('#available-shortcuts-popup');
        if (shortcuts) {
          (shortcuts as HTMLElement).style.display = 'none';
        }
        const page = document.querySelector('#page');
        if (page) {
          (page as HTMLElement).style.marginBottom = '62px';
        }
        document
          .querySelectorAll('.drawercontent')
          .forEach((item) => item.classList.add('onGradebookPage'));
      }
    }),
  );
  observer.observe(document.body, { childList: true, subtree: true });
};

export default applyStyle;
