import { MoodleData } from '../../../types';
import searchModal from '../search-modal.html';

interface BootstrapModal {
  Modal: {
    jQueryInterface: (
      action:
        | 'toggle'
        | 'show'
        | 'hide'
        | 'handleUpdate'
        | 'dispose'
        | undefined,
    ) => void;
  };
}

const courseData = [['Dashboard', 'https://moodle.rose-hulman.edu/my']];

const addSearchModal = async (
  { pinnedCourses }: MoodleData,
  bootstrap: BootstrapModal,
  $: JQueryStatic,
) => {
  if (
    window.location.href.includes('submission') ||
    window.location.hash.includes('bypass')
  ) {
    return Promise.resolve();
  }

  const header = document.querySelector('#page-header');
  const footer = document.querySelector('footer');
  if (header) {
    header.innerHTML += searchModal;
  } else if (footer) {
    footer.innerHTML += searchModal;
  }
  void setupSearchModal(pinnedCourses, bootstrap, $);
  initializeCourseEvaluations();
  return await Promise.resolve();
};

const setupSearchModal = (
  pinnedCourses: MoodleData['pinnedCourses'],
  bootstrap: BootstrapModal,
  $: JQueryStatic,
) => {
  const resetInput = () => {
    createList('');
    (document.getElementById('rmtSearchInput') as HTMLInputElement).value = '';
    bootstrap.Modal.jQueryInterface.apply($('#rmtSearch'), ['show']);
    setTimeout(() => {
      (document.getElementById('rmtSearchInput') as HTMLInputElement).focus();
    }, 500);
  };

  addClassSidebarItems();

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
  for (const item of pinnedCourses) {
    courseData.push([item.name, `/course/view.php?id=${item.id}`]);
  }
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
    for (const item of courseData) {
      if (item[0].length <= 1) {
        return;
      }
      if (item[0].toLowerCase().includes(value.toLowerCase()) && i < 5) {
        if (item[1].includes('#section-')) {
          document.getElementById(
            'rmtResultList',
          )!.innerHTML += `<div style="margin:0" onclick="window.location='${
            item[1]
          }';window.location.reload()" class=${i === 0 ? 'active' : ''}>${
            item[0]
          }</div>`;
        } else {
          document.getElementById(
            'rmtResultList',
          )!.innerHTML += `<div style="margin:0" onclick="window.location='${
            item[1]
          }'" class=${i === 0 ? 'active' : ''}>${item[0]}</div>`;
        }
        i++;
      }
      if (i === 5) {
        return;
      }
    }
    if (value.length > 0) {
      document.getElementById(
        'rmtResultList',
      )!.innerHTML += `<div style="margin:0" onclick="window.location='https://moodle.rose-hulman.edu/search/index.php?q=${
        (document.getElementById('rmtSearchInput') as HTMLInputElement).value
      }'" class=${i === 0 ? 'active' : ''}>More results</div>`;
    }
  };
  document
    .getElementById('rmtSearchInput')!
    .addEventListener('input', (e) =>
      createList((e.target as HTMLInputElement).value),
    );
  createList('');
  document.addEventListener('keydown', (e) => {
    if (!e.repeat && (e.ctrlKey || e.metaKey) && e.key == 'k') {
      resetInput();
    }
  });
  if (document.querySelector('nav .simplesearchform')) {
    document
      .querySelector('nav .simplesearchform')!
      .addEventListener('click', resetInput);
  }
  return Promise.resolve();
};

const addClassSidebarItems = () => {
  const observer = new MutationObserver(() => {
    const navItems = document.querySelectorAll(
      '#course-index .courseindex-section-title .courseindex-link',
    );
    if (navItems) {
      observer.disconnect();
      for (const item of Array.from(navItems)) {
        const navItem = item as HTMLLinkElement;
        if (!navItem.innerText.length) {
          continue;
        }
        courseData.push([navItem.innerText, navItem.href]);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

const initializeCourseEvaluations = () => {
  if (document.querySelector('#ek-widget > ul.evalkit-widget-links > li > a')) {
    document
      .querySelector('#ek-widget > ul.evalkit-widget-links > li > a')!
      .addEventListener('click', (e) => {
        e.preventDefault();
        window.open((e.target as HTMLLinkElement).href, '_blank');
      });
  }
};

export default addSearchModal;
