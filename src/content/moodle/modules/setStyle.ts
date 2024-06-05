const applyStyle = async () =>
  import('../styles.css').then(() => {
    replaceAccentColor();
    styleGradeBookPage();
  });

const replaceAccentColor = () => {
  document.querySelectorAll('style,link[rel="stylesheet"]').forEach((sheet) => {
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
        newRules.forEach((rule) => styleSheet.insertRule(rule));
      } catch (e) {
        // Ignore
      }
    }
  });
};

const styleGradeBookPage = () => {
  if (document.querySelector('.gradeparent')) {
    const wait = () => {
      const shortcuts = document.querySelector('#available_shortcuts_popup');
      const page = document.querySelector('#page');
      if (shortcuts && page) {
        (shortcuts as HTMLElement).style.display = 'none';
        (page as HTMLElement).style.marginBottom = '62px';
        document
          .querySelectorAll('.drawercontent')
          .forEach((item) => item.classList.add('onGradebookPage'));
      } else {
        setTimeout(wait, 500);
      }
    };
    wait();
  }
};

export default applyStyle;
