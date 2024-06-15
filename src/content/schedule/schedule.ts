import { scheduleDefaults } from '../../defaults';
import { DataType, getDataObject } from '../common/chromeData';
import detailPage from './detail-page.html';
import homePage from './home-page.html';
import lookupPage from './lookup-page.html';
import matrixPage from './matrix-page.html';

const printListener = () =>
  document.addEventListener('keydown', (e) => {
    if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'p') {
      e.preventDefault();
      window.location.assign(window.location.href + '#print');
    }
  });

const getData = () => {
  getDataObject(DataType.ScheduleData).then((data) => {
    const scheduleData = { ...scheduleDefaults, ...data };
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--bg-color', scheduleData.bgColor);
    root.style.setProperty('--accent-color', scheduleData.accentColor);
    root.style.setProperty('--text-color', scheduleData.textColor);
    root.style.setProperty('--border-color', scheduleData.borderColor);
    if (scheduleData.enabled) {
      runApp(true);
    }
  });
  chrome.storage.local.onChanged.addListener((changes) => {
    const oldData = changes.schedule.oldValue;
    const newData = changes.schedule.newValue;
    if (oldData.enabled != newData.enabled) {
      window.location.reload();
      return;
    }
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--bg-color', newData.bgColor || '#000000');
    root.style.setProperty('--accent-color', newData.accentColor || '#800000');
    root.style.setProperty('--text-color', newData.textColor || '#ffffff');
    root.style.setProperty('--border-color', newData.borderColor || '#808080');
  });
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
    const body = document.querySelector('body');
    if (body) {
      body.innerHTML = matrixPage + body.innerHTML;
    }
    if (htmlElement) {
      htmlElement.setAttribute('page', 'matrix');
    }
  } else if (document.querySelectorAll('table').length > 1) {
    const body = document.querySelector('body');
    if (body) {
      body.innerHTML = detailPage + body.innerHTML;
    }
    if (htmlElement) {
      htmlElement.setAttribute('page', 'detail');
    }
  } else if (document.title.includes('Schedule Options')) {
    const body = document.querySelector('body');
    if (body) {
      body.innerHTML = lookupPage + body.innerHTML;
    }
    if (htmlElement) {
      htmlElement.setAttribute('page', 'lookup');
    }
  }
  import('./styles.css');
  document.querySelectorAll('table').forEach((table) => {
    table.setAttribute('bgcolor', '');
  });
};

const runApp = (allowPrint: boolean) => {
  if (window.location.hash == '#print' && allowPrint) {
    window.print();
    window.history.back();
    runApp(false);
    return;
  }
  printListener();
  setStyles();

  setTimeout(() => {
    const signOut = document.getElementById('signOut');
    if (signOut) {
      signOut.onclick = () =>
        (window.location.href =
          'https://prodwebxe-hv.rose-hulman.edu/regweb-cgi/CASlogout.pl?url=https%3A%2F%2Fprodwebxe-hv.rose-hulman.edu%3A443%2Fregweb-cgi%2Freg-sched.pl');
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
