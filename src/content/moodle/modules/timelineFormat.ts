import { MoodleData } from '../../../types';

const formatTimeline = ({ timeFormat }: MoodleData) => {
  if (!document.querySelector('.block-timeline')) {
    return Promise.reject();
  }
  document
    .querySelectorAll('.timeline-event-list-item small.text-right')
    .forEach((item) => formatTimelineElement(item as HTMLElement, timeFormat));
  if (document.querySelector("[data-action='more-events']")) {
    const btn = document.querySelector(
      "[data-action='more-events']",
    ) as HTMLButtonElement;
    btn.addEventListener('click', () => {
      const wait = () => {
        const btn = document.querySelector("[data-action='more-events']");
        if (!(btn && (btn as HTMLButtonElement).disabled)) {
          setTimeout(formatTimeline, 500);
        } else {
          setTimeout(wait, 500);
        }
      };
      wait();
    });
  }
  return Promise.resolve();
};

const formatTimelineElement = (
  item: HTMLElement,
  timeFormat: MoodleData['timeFormat'],
) => {
  const time = (item as HTMLElement).innerText.split(' ')[0].split(':');
  if (timeFormat == 12) {
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
};

export default formatTimeline;
