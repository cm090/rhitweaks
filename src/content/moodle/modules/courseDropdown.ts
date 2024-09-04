import { MoodleData } from '../../../types';

const buildCourseDropdown = ({
  pinnedCourses,
  pinnedCoursesDisplay,
}: MoodleData) => {
  const menuItem = document.querySelector('.navbar-nav [data-key="mycourses"]');
  if (menuItem) {
    (menuItem as HTMLElement).style.display = '';
    for (const item of Array.from(
      document.querySelectorAll('.custom-courses'),
    )) {
      item.remove();
    }
  }
  if (pinnedCoursesDisplay === 'dropdown') {
    displayCoursesInDropdown(pinnedCourses, menuItem as HTMLElement);
  } else if (pinnedCourses.length > 0) {
    displayCoursesInNavbar(pinnedCourses, menuItem as HTMLElement);
  }
};

const displayCoursesInDropdown = (
  pinnedCourses: MoodleData['pinnedCourses'],
  menuItem: HTMLElement,
) => {
  const div = document.createElement('div');
  div.classList.add('dropdown-menu', 'custom-courses');
  if (pinnedCourses.length == 0) {
    // noinspection HtmlUnknownTarget
    div.innerHTML =
      '<p class="mx-2 mb-0">No pinned courses<br />Add one <a href="/my/courses.php">here</a></p>';
  } else {
    for (const item of pinnedCourses) {
      const a = document.createElement('a');
      a.classList.add('dropdown-item');
      a.href = `/course/view.php?id=${item.id}`;
      a.innerText = item.name;
      div.appendChild(a);
    }
  }
  document.querySelector('body')!.appendChild(div);
  menuItem.onmouseenter = () => div.classList.add('show');
  div.onmouseenter = () => div.classList.add('show');
  (document.querySelector('.navbar') as HTMLDivElement).onmouseleave = () =>
    div.classList.remove('show');
  div.onmouseleave = () => div.classList.remove('show');
};

const displayCoursesInNavbar = (
  pinnedCourses: MoodleData['pinnedCourses'],
  menuItem: HTMLElement,
) => {
  (menuItem as HTMLElement).style.display = 'none';
  for (const item of pinnedCourses) {
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
    document.querySelector('.primary-navigation .moremenu ul')!.appendChild(li);
  }
};

export default buildCourseDropdown;
