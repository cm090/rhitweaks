import * as bootstrap from 'bootstrap';
import $ from 'jquery';
import { moodleDefaults } from '../../defaults';
import { MoodleData } from '../../types';
import addButtonsToPageContent from './modules/addButtons';
import buildCourseDropdown from './modules/courseDropdown';
import addNavItemListeners from './modules/customNavigation';
import transformUrl from './modules/modifyUrl';
import applyStyle from './modules/setStyle';
import addSearchModal from './modules/siteSearch';
import formatTimeline from './modules/timelineFormat';

const reloadPageIfNecessary = () => {
  if (
    window.location.pathname !== '/my/' ||
    window.location.hash.includes('bypass')
  ) {
    return;
  }
  const courseListElement = document.querySelector(
    ".block_myoverview [data-region='loading-placeholder-content']",
  );
  if (courseListElement) {
    window.location.reload();
  }
};

const configureMoodle = () => {
  chrome.storage.local.get('moodleData', (data) => {
    const moodleData = { ...moodleDefaults, ...data.moodleData };
    setStyleProperties(moodleData);
    if (moodleData.enabled && document.getElementById('page-wrapper')) {
      initialize(moodleData);
    }
  });
  chrome.storage.local.onChanged.addListener((changes) => {
    const { oldValue: oldData, newValue: newData } = changes.moodleData;
    if (oldData.enabled != newData.enabled) {
      window.location.reload();
      return;
    }
    setStyleProperties(newData);
    buildCourseDropdown(newData);
    formatTimeline(newData).catch(() => null);
  });
};

const setStyleProperties = (data: MoodleData) => {
  const root = document.querySelector(':root') as HTMLElement;
  root.style.setProperty('--bg-color', data.bgColor);
  root.style.setProperty('--card-color', data.cardColor);
  root.style.setProperty('--accent-color', data.accentColor);
  root.style.setProperty('--sidebar-color', data.sbColor);
  root.style.setProperty('--text-color', data.textColor);
};

const initialize = (moodleData: MoodleData) => {
  console.log(
    'Starting RHITweaks by cm090\nhttps://github.com/cm090/rhitweaks',
  );
  transformUrl()
    .then(() => {
      console.log('RHITweaks > Finished URL check');
      applyStyle();
    })
    .then(() => {
      console.log('RHITweaks > Custom styles activated');
      addButtonsToPageContent().then(
        () => console.log('RHITweaks > Added custom buttons'),
        () => console.log('RHITweaks > Skipped custom buttons'),
      );
    })
    .then(() => {
      const wait = () => {
        if (
          document.querySelector(
            '.block_timeline [data-region="event-list-loading-placeholder"].hidden',
          )
        ) {
          formatTimeline(moodleData).then(
            () => console.log('RHITweaks > Timeline format updated'),
            () => console.log('RHITweaks > Skipped timeline format update'),
          );
        } else {
          setTimeout(wait, 500);
        }
      };
      if (document.querySelector('.block_timeline')) {
        wait();
      }
    })
    .then(() => {
      document.addEventListener('keydown', (e) => {
        if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'k') {
          e.preventDefault();
        }
      });
      setTimeout(() => addSearchModal(moodleData, bootstrap, $), 2000);
      console.log('RHITweaks > Search program ready, press Ctrl+K to use');
    })
    .then(() => {
      buildCourseDropdown(moodleData);
      addNavItemListeners(moodleData, buildCourseDropdown);
      setTimeout(reloadPageIfNecessary, 5000);
    });
};

configureMoodle();
