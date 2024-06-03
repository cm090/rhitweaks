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
  moodleData: MoodleData,
  bootstrap: BootstrapModal,
  $: JQueryStatic,
) => {
  if (
    window.location.href.includes('submission') ||
    window.location.hash.includes('bypass')
  ) {
    return Promise.resolve();
  }
  if (document.querySelector('#page-header')) {
    document.querySelector('#page-header')!.innerHTML += searchModal;
  } else if (document.querySelector('footer')) {
    document.querySelector('footer')!.innerHTML += searchModal;
  }
  setupSearchModal(moodleData, bootstrap, $);
  initializeCourseEvaluations();
  return await Promise.resolve();
};

const setupSearchModal = (
  moodleData: MoodleData,
  bootstrap: BootstrapModal,
  $: JQueryStatic,
) => {
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

const addClassSidebarItems = () => {
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
