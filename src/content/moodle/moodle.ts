import * as bootstrap from 'bootstrap';
import $ from 'jquery';
import { moodleDefaults } from '../../defaults';
import { MoodleData } from '../../types';
import headerButtons from './header-buttons.html';
import searchModal from './search-modal.html';

const courseData = [['Dashboard', 'https://moodle.rose-hulman.edu/my']];
let moodleData: MoodleData = {} as MoodleData;

const setStyle = async () => {
  import('./styles.css').then(() => {
    document
      .querySelectorAll('style,link[rel="stylesheet"]')
      .forEach((sheet) => {
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
  });
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
  return await Promise.resolve();
};

const modifyURL = () => {
  if (
    ((window.location.pathname.length < 2 && !window.location.search) ||
      window.location.href.includes('enrol')) &&
    !window.location.hash.includes('bypass')
  ) {
    window.location.pathname = '/my';
  }
  document.querySelectorAll('a').forEach((link) => {
    if (link.href.includes('?forcedownload=1')) {
      link.href = link.href.split('?forcedownload')[0];
      link.target = '_blank';
    }
  });
  if (document.querySelector('.navbar .navbar-brand')) {
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

const addButtons = async () => {
  if (window.location.pathname != '/my/') {
    return Promise.reject();
  }
  if (document.querySelector('#page-content')!.clientWidth > 850) {
    const element = document.querySelector('#page-content');
    element!.innerHTML = headerButtons + element!.innerHTML;
  }
  onresize = () => checkButtons();
  return await Promise.resolve();
};

const checkButtons = () =>
  ((document.querySelector('#rmtButtons') as HTMLElement).style.display =
    document.querySelector('#page-content')!.clientWidth <= 850
      ? 'none'
      : 'flex');

const searchListener = () => {
  const wait = () => {
    const navItems = document.querySelectorAll(
      '#course-index .courseindex-section',
    );
    if (navItems) {
      navItems.forEach((item) => {
        const header = item.querySelector(
          '.courseindex-section-title .courseindex-link',
        );
        courseData.push([
          (header as HTMLElement).innerText,
          (header as HTMLLinkElement).href,
        ]);
      });
    } else {
      setTimeout(wait, 500);
    }
  };
  wait();

  let pos = 1;
  if (window.location.href.includes('course/')) {
    try {
      courseData.push([
        'Grades',
        Array.from(document.querySelectorAll('.more-nav > li'))
          .find((item) =>
            item.querySelector('a')!.innerText.includes('Grades'),
          )!
          .querySelector('a')!.href,
      ]);
    } catch {
      // Ignore
    }
  }
  moodleData.pinnedCourses.forEach((item) =>
    courseData.push([item.name, `/course/view.php?id=${item.id}`]),
  );
  courseData.push(
    ['My Rose-Hulman', 'https://rosehulman.sharepoint.com/sites/MyRH'],
    ['Banner Web', 'https://bannerweb.rose-hulman.edu/login'],
    ['Gradescope', 'https://www.gradescope.com'],
    ['Campus Groups', 'https://www.campusgroups.com/shibboleth/rosehulman'],
    ['Dining Hall Menu', 'https://rose-hulman.cafebonappetit.com'],
    ['My Courses', '/my/courses.php'],
  );
  document
    .getElementById('rmtSearchInput')!
    .addEventListener('keydown', (e) => {
      if (e.key == 'ArrowDown') {
        e.preventDefault();
        if (
          pos <
          document.querySelectorAll('#rmtSearch #rmtResultList div').length
        ) {
          document
            .querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`)!
            .classList.remove('active');
          pos++;
          document
            .querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`)!
            .classList.add('active');
        }
      } else if (e.key == 'ArrowUp') {
        e.preventDefault();
        if (pos > 1) {
          document
            .querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`)!
            .classList.remove('active');
          pos--;
          document
            .querySelector(`#rmtSearch #rmtResultList div:nth-child(${pos})`)!
            .classList.add('active');
        }
      } else if (e.key == 'Enter') {
        (
          document.querySelector(
            `#rmtSearch #rmtResultList div:nth-child(${pos})`,
          ) as HTMLButtonElement
        ).click();
        (document.querySelector('#rmtSearchInput') as HTMLInputElement).value =
          '';
        bootstrap.Modal.jQueryInterface.apply($('#rmtSearch'), ['hide']);
      }
    });

  const createList = (value: string) => {
    pos = 1;
    let i = 0;
    document.getElementById('rmtResultList')!.innerHTML = '';
    courseData.forEach((item) => {
      if (item[0].length <= 1) {
        return;
      }
      if (item[0].toLowerCase().includes(value.toLowerCase()) && i < 5) {
        if (item[1].includes('#section-')) {
          document.getElementById(
            'rmtResultList',
          )!.innerHTML += `<div style="margin:0" onclick="window.location='${item[1]}';window.location.reload()">${item[0]}</div>`;
        } else {
          document.getElementById(
            'rmtResultList',
          )!.innerHTML += `<div style="margin:0" onclick="window.location='${item[1]}'">${item[0]}</div>`;
        }
        i++;
      }
      if (i == 5) {
        return;
      }
    });
    if (value.length > 0) {
      document.getElementById(
        'rmtResultList',
      )!.innerHTML += `<div style="margin:0" onclick="window.location='https://moodle.rose-hulman.edu/search/index.php?q=${
        (document.getElementById('rmtSearchInput') as HTMLInputElement).value
      }'">More results</div>`;
    }
    document
      .querySelector('#rmtSearch #rmtResultList div:first-child')!
      .classList.add('active');
  };
  document
    .getElementById('rmtSearchInput')!
    .addEventListener('input', (e) =>
      createList((e.target as HTMLInputElement).value),
    );
  createList('');
  document.addEventListener('keydown', (e) => {
    if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'k') {
      createList('');
      (document.getElementById('rmtSearchInput') as HTMLInputElement).value =
        '';
      bootstrap.Modal.jQueryInterface.apply($('#rmtSearch'), ['show']);
      setTimeout(() => {
        (document.getElementById('rmtSearchInput') as HTMLInputElement).focus();
      }, 500);
    }
  });
  if (document.querySelector('nav .simplesearchform')) {
    document
      .querySelector('nav .simplesearchform')!
      .addEventListener('click', () => {
        createList('');
        (document.getElementById('rmtSearchInput') as HTMLInputElement).value =
          '';
        bootstrap.Modal.jQueryInterface.apply($('#rmtSearch'), ['show']);
        setTimeout(() => {
          (
            document.getElementById('rmtSearchInput') as HTMLInputElement
          ).focus();
        }, 500);
      });
  }
  return Promise.resolve();
};

const updateTimelineFormat = () => {
  if (!document.querySelector('.block-timeline')) {
    return Promise.reject();
  }
  document
    .querySelectorAll('.timeline-event-list-item small.text-right')
    .forEach((item) => {
      const time = (item as HTMLElement).innerText.split(' ')[0].split(':');
      if (moodleData.timeFormat == 12) {
        if (
          (item as HTMLElement).innerText.includes('AM') ||
          (item as HTMLElement).innerText.includes('PM')
        ) {
          return;
        }
        if (parseInt(time[0]) > 12) {
          time[0] = parseInt(time[0]) - 12 + '';
          (item as HTMLElement).innerText = `${time[0]}:${time[1]} PM`;
          return;
        } else if (parseInt(time[0]) == 0) {
          time[0] = '12';
        }
        (item as HTMLElement).innerText = `${parseInt(time[0])}:${time[1]} AM`;
      } else if ((item as HTMLElement).innerText.split(' ').length > 1) {
        const half =
          (item as HTMLElement).innerText.split(' ')[1] === 'AM'
            ? time[0] === '12'
              ? -12
              : 0
            : 12;
        (item as HTMLElement).innerText = `${String(
          parseInt(time[0]) + half,
        ).padStart(2, '0')}:${time[1]}`;
      }
    });
  if (document.querySelector("[data-action='more-events']")) {
    const btn = document.querySelector(
      "[data-action='more-events']",
    ) as HTMLButtonElement;
    btn.addEventListener('click', () => {
      const wait = () => {
        const btn = document.querySelector("[data-action='more-events']");
        if (!(btn && (btn as HTMLButtonElement).disabled)) {
          setTimeout(updateTimelineFormat, 500);
        } else {
          setTimeout(wait, 500);
        }
      };
      wait();
    });
  }
  return Promise.resolve();
};

const searchCode = async () => {
  if (
    window.location.href.includes('submission') ||
    window.location.hash.includes('bypass')
  ) {
    return Promise.resolve();
  }
  if (document.querySelector('#page-header')) {
    document.querySelector('#page-header')!.innerHTML += searchModal;
  } else {
    document.querySelector('footer')!.innerHTML += searchModal;
  }
  searchListener();
  setupCourseEvals();
  return await Promise.resolve();
};

const setupCourseEvals = () => {
  if (document.querySelector('#ek-widget > ul.evalkit-widget-links > li > a')) {
    document
      .querySelector('#ek-widget > ul.evalkit-widget-links > li > a')!
      .addEventListener('click', (e) => {
        e.preventDefault();
        window.open((e.target as HTMLLinkElement).href, '_blank');
      });
  }
};

const updateCourseDropdown = () => {
  const menuItem = document.querySelector('.navbar-nav [data-key="mycourses"]');
  if (menuItem) {
    (menuItem as HTMLElement).style.display = '';
    document
      .querySelectorAll('.custom-courses')
      .forEach((item) => item.remove());
  }
  if (moodleData.pinnedCoursesDisplay === 'dropdown') {
    const div = document.createElement('div');
    div.classList.add('dropdown-menu', 'custom-courses');
    if (moodleData.pinnedCourses.length == 0) {
      div.innerHTML =
        '<p class="mx-2 mb-0">No pinned courses<br />Add one <a href="/my/courses.php">here</a></p>';
    } else {
      moodleData.pinnedCourses.forEach((item) => {
        const a = document.createElement('a');
        a.classList.add('dropdown-item');
        a.href = `/course/view.php?id=${item.id}`;
        a.innerText = item.name;
        div.appendChild(a);
      });
    }
    document.querySelector('body')!.appendChild(div);
    (menuItem as HTMLDivElement).onmouseenter = () => div.classList.add('show');
    div.onmouseenter = () => div.classList.add('show');
    (
      document.querySelector(
        '#page-wrapper > nav > div.primary-navigation > nav',
      ) as HTMLDivElement
    ).onmouseleave = () => div.classList.remove('show');
    div.onmouseleave = () => div.classList.remove('show');
  } else if (moodleData.pinnedCourses.length > 0) {
    (menuItem as HTMLElement).style.display = 'none';
    moodleData.pinnedCourses.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('nav-item', 'custom-courses');
      const a = document.createElement('a');
      a.classList.add('nav-link');
      if (document.body.classList.contains(`course-${item.id}`)) {
        a.classList.add('active');
      }
      a.href = `/course/view.php?id=${item.id}`;
      a.innerText = item.name;
      li.appendChild(a);
      document
        .querySelector('.primary-navigation .moremenu ul')!
        .appendChild(li);
    });
  }
};

const reloadIfWaiting = () => {
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

const navItemsManager = () => {
  if (!window.location.pathname.includes('/my/courses.php')) {
    return;
  }
  const addNavItems = () => {
    document
      .querySelectorAll(
        '.dashboard-card-deck .dashboard-card, .list-group .course-listitem',
      )
      .forEach((card) => {
        if (
          card.querySelector('.dropdown-menu')!.innerHTML.includes('navbar')
        ) {
          card.querySelector('.dropdown-menu a:last-child')!.remove();
        }
        const navItem = document.createElement('a');
        navItem.classList.add('dropdown-item');
        navItem.href = '#';
        navItem.innerText = moodleData.pinnedCourses.find(
          (item) => item.id == card.getAttribute('data-course-id'),
        )
          ? 'Unpin from navbar'
          : 'Pin to navbar';
        navItem.addEventListener('click', () => {
          if (navItem.innerText == 'Pin to navbar') {
            let name;
            if (card.querySelector('.coursename .multiline .sr-only')) {
              name = (
                card.querySelector(
                  '.coursename .multiline .sr-only',
                ) as HTMLElement
              ).innerText;
            } else {
              name = (
                card.querySelector('.coursename') as HTMLElement
              ).innerText
                .split('\n')
                .at(-1);
            }
            moodleData.pinnedCourses.push({
              id: card.getAttribute('data-course-id') as string,
              name:
                name!.split(' ')[0].search(/(?:\w+\d+)/) !== -1
                  ? name!.split(' ')[0]
                  : (name as string),
            });
          } else {
            moodleData.pinnedCourses = moodleData.pinnedCourses.filter(
              (item) => item.id != card.getAttribute('data-course-id'),
            );
          }
          addNavItems();
          updateCourseDropdown();
          chrome.storage.local.set({
            moodle: {
              moodleData,
            },
          });
        });
        card.querySelector('.dropdown-menu')!.append(navItem);
      });
  };
  const wait = () => {
    if (
      document.querySelector('.dashboard-card-deck .dashboard-card') ||
      document.querySelector('.course-listitem .coursename')
    ) {
      addNavItems();
    } else {
      setTimeout(wait, 500);
    }
  };
  document
    .querySelectorAll('.main-inner a')
    .forEach((item) =>
      item.addEventListener('click', () => setTimeout(wait, 500)),
    );
  document
    .querySelector('.main-inner .searchbar input')!
    .addEventListener('input', () => setTimeout(wait, 1500));
  wait();
};

const start = () => {
  console.log(
    'Starting RHITweaks by cm090\nhttps://github.com/cm090/rhitweaks',
  );
  modifyURL()
    .then(() => {
      console.log('RHITweaks > Finished URL check');
      setStyle();
    })
    .then(() => {
      console.log('RHITweaks > Custom styles activated');
      addButtons().then(
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
          updateTimelineFormat().then(
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
      setTimeout(searchCode, 2000);
      console.log('RHITweaks > Search program ready, press Ctrl+K to use');
    })
    .then(() => {
      updateCourseDropdown();
      navItemsManager();
      setTimeout(reloadIfWaiting, 5000);
    });
};

const moodleLoader = () => {
  chrome.storage.local.get('moodleData', (data) => {
    moodleData = { ...moodleDefaults, ...data.moodleData };
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--bg-color', moodleData.bgColor);
    root.style.setProperty('--card-color', moodleData.cardColor);
    root.style.setProperty('--accent-color', moodleData.accentColor);
    root.style.setProperty('--sidebar-color', moodleData.sbColor);
    root.style.setProperty('--text-color', moodleData.textColor);
    if (moodleData.enabled && document.getElementById('page-wrapper')) {
      start();
    }
  });
  chrome.storage.local.onChanged.addListener((changes) => {
    const oldData = changes.moodleData.oldValue;
    const newData = changes.moodleData.newValue;
    if (oldData.enabled != newData.enabled) {
      window.location.reload();
      return;
    }
    moodleData = newData;
    const root = document.querySelector(':root') as HTMLElement;
    root.style.setProperty('--bg-color', newData.bgColor);
    root.style.setProperty('--card-color', newData.cardColor);
    root.style.setProperty('--accent-color', newData.accentColor);
    root.style.setProperty('--sidebar-color', newData.sbColor);
    root.style.setProperty('--text-color', newData.textColor);
    updateCourseDropdown();
    updateTimelineFormat().catch(() => null);
  });
};

moodleLoader();
