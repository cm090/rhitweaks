import { MoodleData } from '../../../types';
import {
  DataType,
  getDataItem,
  onDataChanged,
  setDataObject,
} from '../../common/chromeData';

const initializeNavItemListeners = () => {
  if (!window.location.pathname.includes('/my/courses.php')) {
    return;
  }
  getDataItem(DataType.MoodleData, 'pinnedCourses').then((pinnedCourses) =>
    updateNavItemButtons(pinnedCourses as MoodleData['pinnedCourses']),
  );
  onDataChanged(DataType.MoodleData, (oldData, newData) => {
    const oldCourses = (oldData as MoodleData).pinnedCourses;
    const newCourses = (newData as MoodleData).pinnedCourses;
    if (oldCourses != newCourses) {
      updateNavItemButtons(newCourses);
    }
  });
};

const updateNavItemButtons = (pinnedCourses: MoodleData['pinnedCourses']) => {
  const addNavItems = () => {
    for (const card of Array.from(
      document.querySelectorAll(
        '.dashboard-card-deck .dashboard-card, .list-group .course-listitem',
      ),
    )) {
      if (card.querySelector('.dropdown-menu')!.innerHTML.includes('navbar')) {
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
            name = (card.querySelector('.coursename') as HTMLElement).innerText
              .split('\n')
              .at(-1);
          }
          pinnedCourses.push({
            id: card.getAttribute('data-course-id') as string,
            name:
              name!.split(' ')[0].search(/\w+\d+/) !== -1
                ? name!.split(' ')[0]
                : (name as string),
          });
        } else {
          pinnedCourses = pinnedCourses.filter(
            (item) => item.id != card.getAttribute('data-course-id'),
          );
        }
        addNavItems();
        void setDataObject(DataType.MoodleData, 'pinnedCourses', pinnedCourses);
      });
      card.querySelector('.dropdown-menu')!.append(navItem);
    }
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
  for (const item of Array.from(document.querySelectorAll('.main-inner a'))) {
    item.addEventListener('click', () => setTimeout(wait, 500));
  }
  document
    .querySelector('.main-inner .searchbar input')!
    .addEventListener('input', () => setTimeout(wait, 1500));
  wait();
};

export default initializeNavItemListeners;
