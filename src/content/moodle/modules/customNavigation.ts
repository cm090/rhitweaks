import { MoodleData } from '../../../types';
import {
  DataType,
  getDataItem,
  onDataChanged,
  setDataObject,
} from '../../common/chromeData';

const initializeNavItemListeners = () => {
  if (!window.location.pathname.includes('/my/courses')) {
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
    let items = Array.from(
      document.querySelectorAll(
        '[data-region="courses-view"] .card-grid > div > div',
      ),
    );
    if (!items.length) {
      items = Array.from(
        document.querySelectorAll(
          '[data-region="courses-view"] .list-group > li',
        ),
      );
    }
    for (const card of items) {
      const dropdown = card.querySelector('.dropdown-menu');
      if (!dropdown) {
        continue;
      }
      if (dropdown.innerHTML.includes('navbar')) {
        dropdown.querySelector('a:last-child')!.remove();
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
      dropdown.append(navItem);
    }
  };
  const refresh = () => {
    if (
      document.querySelector('.course-card .coursename') ||
      document.querySelector('.course-listitem .coursename')
    ) {
      addNavItems();
    }
    setTimeout(refresh, 500);
  };
  refresh();
};

export default initializeNavItemListeners;
