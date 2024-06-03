const applyStyle = async () => {
  import('../styles.css').then(replaceAccentColor);
  styleGradeBookPage();
  return await Promise.resolve();
};

const replaceAccentColor = () => {
  document.querySelectorAll('style,link[rel="stylesheet"]').forEach((sheet) => {
    if (sheet) {
      try {
        const rules =
          (sheet as HTMLStyleElement).sheet!.cssRules ||
          (sheet as HTMLStyleElement).sheet!.rules;
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          if (
            rule.cssText.includes('maroon') ||
            rule.cssText.includes('rgb(128, 0, 0)')
          ) {
            const newRule = rule.cssText.replace(
              /maroon|rgb\(128, 0, 0\)/g,
              '--accent-color',
            );
            (sheet as HTMLStyleElement).sheet!.deleteRule(i);
            (sheet as HTMLStyleElement).sheet!.insertRule(newRule, i);
          }
        }
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
