import { MoodleData } from '../../../types';

const buildCourseDropdown = (moodleData: MoodleData) => {
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

export default buildCourseDropdown;
