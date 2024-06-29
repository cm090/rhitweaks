import { BannerData, MoodleData, ScheduleData } from './types';

const moodleDefaults: MoodleData = {
  enabled: false,
  bgColor: '#000000',
  textColor: '#1d2125',
  cardColor: '#eeeeee',
  accentColor: '#800000',
  sbColor: '#000000',
  timeFormat: 12,
  pinnedCoursesDisplay: 'dropdown',
  pinnedCourses: [],
};

const scheduleDefaults: ScheduleData = {
  enabled: false,
  bgColor: '#141414',
  accentColor: '#800000',
  textColor: '#ffffff',
  borderColor: '#808080',
};

const bannerDefaults: BannerData = {
  enabled: false,
  links: 'student',
};

export { bannerDefaults, moodleDefaults, scheduleDefaults };
