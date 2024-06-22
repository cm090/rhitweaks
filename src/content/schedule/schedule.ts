import { scheduleDefaults } from '../../defaults';
import { ScheduleData, StorageData } from '../../types';
import detailPage from './detail-page.html';
import homePage from './home-page.html';
import lookupPage from './lookup-page.html';
import matrixPage from './matrix-page.html';

export enum DataType {
  MoodleData = 'moodleData',
  ScheduleData = 'scheduleData',
  BannerData = 'bannerData',
}

type Listener = {
  scope: DataType;
  callback: (oldData: StorageData, newData: StorageData) => void;
};

const getDataObject = (scope: DataType): Promise<StorageData> =>
  new Promise((resolve, reject) => {
    try {
      chrome.storage.local.get(scope, (data) => {
        if (!data[scope]) {
          throw new Error('Data not found');
        }
        resolve(data[scope]);
      });
    } catch (e) {
      reject(e);
    }
  });

const dataListeners: Listener[] = [];

const onDataChanged = (scope: DataType, callback: Listener['callback']) =>
  dataListeners.push({ scope, callback });

chrome.storage.local.onChanged.addListener((changes) => {
  for (const listener of dataListeners) {
    if (changes[listener.scope]) {
      listener.callback(
        changes[listener.scope].oldValue,
        changes[listener.scope].newValue,
      );
    }
  }
});

const printListener = () =>
  document.addEventListener('keydown', (e) => {
    if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'p') {
      e.preventDefault();
      window.location.hash = 'print';
      window.location.reload();
    }
  });

const getData = () => {
  getDataObject(DataType.ScheduleData)
    .then((data) => {
      const scheduleData = { ...scheduleDefaults, ...data };
      attemptAppStart(scheduleData);
    })
    .catch(() => {
      attemptAppStart(scheduleDefaults);
    });
  onDataChanged(DataType.ScheduleData, (oldData, newData) => {
    if (oldData.enabled != newData.enabled) {
      window.location.reload();
      return;
    }
    buildStyleProperties(newData as ScheduleData);
  });
};

const attemptAppStart = (scheduleData: ScheduleData) => {
  buildStyleProperties(scheduleData);
  if (scheduleData.enabled) {
    runApp();
  }
};

const buildStyleProperties = (data: ScheduleData) => {
  const root = document.querySelector(':root') as HTMLElement;
  root.style.setProperty('--bg-color', data.bgColor);
  root.style.setProperty('--accent-color', data.accentColor);
  root.style.setProperty('--text-color', data.textColor);
  root.style.setProperty('--border-color', data.borderColor);
};

const setStyles = () => {
  const htmlElement = document.querySelector('html');
  if (
    document.forms[0] &&
    document.querySelector(
      'body > form > table > tbody > tr:nth-child(4) > td:nth-child(1)',
    ) &&
    (
      document.querySelector(
        'body > form > table > tbody > tr:nth-child(4) > td:nth-child(1)',
      ) as HTMLElement
    ).innerText.includes('Last Name')
  ) {
    const quarters = document.forms[0].termcode.innerHTML;
    if (htmlElement) {
      htmlElement.innerHTML = homePage;
      const quartersElement = document.querySelector('#quarters');
      if (quartersElement) {
        quartersElement.innerHTML = quarters;
        htmlElement.setAttribute('page', 'home');
      }
    }
  } else if (document.title.includes('Course Matrix View')) {
    appendToPage(htmlElement, matrixPage, 'matrix');
  } else if (document.querySelectorAll('table').length > 1) {
    appendToPage(htmlElement, detailPage, 'detail');
  } else if (document.title.includes('Schedule Options')) {
    appendToPage(htmlElement, lookupPage, 'lookup');
  }
  import('./styles.css');
  document.querySelectorAll('table').forEach((table) => {
    table.setAttribute('bgcolor', '');
  });
};

const appendToPage = (
  htmlElement: HTMLElement | null,
  module: string,
  pageAttribute: string,
) => {
  const body = document.querySelector('body');
  if (body) {
    body.innerHTML = module + body.innerHTML;
  }
  if (htmlElement) {
    htmlElement.setAttribute('page', pageAttribute);
  }
};

const runApp = () => {
  if (window.location.hash == '#print') {
    window.print();
    window.location.hash = '';
  }
  printListener();
  setStyles();

  setTimeout(() => {
    const signOut = document.getElementById('signOut');
    if (signOut) {
      signOut.onclick = () => {
        window.location.href =
          'https://prodwebxe-hv.rose-hulman.edu/regweb-cgi/CASlogout.pl?url=https%3A%2F%2Fprodwebxe-hv.rose-hulman.edu%3A443%2Fregweb-cgi%2Freg-sched.pl';
      };
      try {
        const downloadRoster = document.getElementById('downloadRoster');
        if (downloadRoster) {
          downloadRoster.onclick = () => {
            const courseName = (
              prompt('Enter course name with section number (ex. MA111-01)') ??
              ''
            ).toUpperCase();
            (
              document.querySelectorAll(
                '#courseRosterDownload input',
              )[0] as HTMLInputElement
            ).value = courseName;
            (
              document.querySelectorAll(
                '#courseRosterDownload input',
              )[1] as HTMLButtonElement
            ).click();
          };
        }
      } catch {
        // do nothing
      }
    }
  }, 1000);
};

getData();
