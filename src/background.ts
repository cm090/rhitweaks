const PAPERCUT_URL = 'https://print.rose-hulman.edu:9192/client';

// Open Papercut on new request (in the background)
chrome.storage.local.onChanged.addListener((res) => {
  const changes = res;
  if (!changes.print) {
    return;
  }
  try {
    console.log(changes);
    if (changes.print.newValue.request.isRequest) {
      void chrome.tabs.create({
        url: PAPERCUT_URL,
        active: false,
      });
    }
  } catch (e) {
    // Do nothing
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab.url !== undefined &&
    tab.url.includes('moodle.rose-hulman.edu/my')
  ) {
    void chrome.scripting.executeScript({
      target: { tabId: tabId, allFrames: true },
      world: 'MAIN',
      func: (): void => {
        const moodleComponents = [
          'timeline',
          'myoverview',
          'recentlyaccesseditems',
          'recentlyaccessedcourses',
        ];
        const loadMoodleComponents = () => {
          let script = '';
          moodleComponents.forEach((component) => {
            const element = document.querySelector(`.block-${component}`);
            if (!element) {
              return;
            }
            script += `require(['jquery', 'block_${component}/main'], function ($, Main) { Main.init($('#${element.id}')); });`;
          });
          const scriptElement = document.createElement('script');
          scriptElement.textContent = script;
          document.body.appendChild(scriptElement);
          setTimeout(() => {
            scriptElement.remove();
          }, 500);
        };
        loadMoodleComponents();
        setTimeout(loadMoodleComponents, 1000);
      },
    });
  }
});
