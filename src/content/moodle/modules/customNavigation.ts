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
  const listObserver = new MutationObserver((mutations) => {
    if (!mutations.length) {
      return;
    }

    let shouldUpdate = true;
    document
      .querySelectorAll('[data-region="courses-view"] .dropdown-menu')
      .forEach((element) => {
        const menuObserver = new MutationObserver(() => {
          shouldUpdate = !element.checkVisibility();
        });
        menuObserver.observe(element, { attributes: true });
      });
    setTimeout(() => addNavItems(pinnedCourses, shouldUpdate), 500);
  });
  listObserver.observe(
    document.querySelector('[data-region="courses-view"]')!,
    { subtree: true, childList: true },
  );
};

const addNavItems = (
  pinnedCourses: MoodleData['pinnedCourses'],
  shouldUpdate = true,
) => {
  if (!shouldUpdate) {
    return;
  }
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
  items.forEach((card) => createAddToNavButton(card, pinnedCourses));
};

const createAddToNavButton = (
  card: Element,
  pinnedCourses: MoodleData['pinnedCourses'],
) => {
  const dropdown = card.querySelector('.dropdown-menu');
  if (!dropdown) {
    return;
  }
  if (dropdown.innerHTML.includes('navbar')) {
    dropdown.querySelector('a:last-child')!.remove();
  }
  const navItem = document.createElement('a');
  navItem.classList.add('dropdown-item', 'navbar-control');
  navItem.innerText = pinnedCourses.find(
    (item) => item.id == card.getAttribute('data-course-id'),
  )
    ? 'Unpin from navbar'
    : 'Pin to navbar';
  navItem.addEventListener('click', () =>
    handleAddToNavClick(navItem, card, pinnedCourses),
  );
  if (dropdown.innerHTML.includes('navbar')) {
    dropdown.querySelector('a:last-child')!.remove();
  }
  dropdown.append(navItem);
};

const handleAddToNavClick = (
  navItem: HTMLElement,
  card: Element,
  pinnedCourses: MoodleData['pinnedCourses'],
) => {
  if (navItem.innerText == 'Pin to navbar') {
    let name;
    if (card.querySelector('.coursename .multiline .sr-only')) {
      name = (
        card.querySelector('.coursename .multiline .sr-only') as HTMLElement
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
  addNavItems(pinnedCourses);
  void setDataObject(DataType.MoodleData, 'pinnedCourses', pinnedCourses);
};

export default initializeNavItemListeners;
