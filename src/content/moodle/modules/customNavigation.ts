import { MoodleData } from '../../../types';
import { DataType, setDataObject } from '../../common/chromeData';

const addNavItemListeners = (
  { pinnedCourses, pinnedCoursesDisplay }: MoodleData,
  updateCourseDropdown: (
    pinnedCourses: MoodleData['pinnedCourses'],
    pinnedCoursesDisplay: MoodleData['pinnedCoursesDisplay'],
  ) => void,
) => {
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
        navItem.innerText = pinnedCourses.find(
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
            pinnedCourses.push({
              id: card.getAttribute('data-course-id') as string,
              name:
                name!.split(' ')[0].search(/(?:\w+\d+)/) !== -1
                  ? name!.split(' ')[0]
                  : (name as string),
            });
          } else {
            pinnedCourses = pinnedCourses.filter(
              (item) => item.id != card.getAttribute('data-course-id'),
            );
          }
          addNavItems();
          updateCourseDropdown(pinnedCourses, pinnedCoursesDisplay);
          setDataObject(DataType.MoodleData, 'pinnedCourses', pinnedCourses);
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

export default addNavItemListeners;
