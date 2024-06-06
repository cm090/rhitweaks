declare module '*.css';

export type HexValue = `#${string}`;

export interface Course {
  id: string;
  name: string;
}

export interface MoodleData {
  enabled: boolean;
  bgColor: HexValue;
  textColor: HexValue;
  cardColor: HexValue;
  accentColor: HexValue;
  sbColor: HexValue;
  timeFormat: 12 | 24;
  pinnedCoursesDisplay: 'dropdown' | 'header';
  pinnedCourses: Course[];
}

export interface ScheduleData {
  enabled: boolean;
  bgColor: HexValue;
  accentColor: HexValue;
  textColor: HexValue;
  borderColor: HexValue;
}

export interface BannerData {
  enabled: boolean;
  links: 'student' | 'faculty';
}

export type StorageData = MoodleData | ScheduleData | BannerData;

export type Page =
  | 'home'
  | 'pinnedCoursesSettings'
  | 'additionalSettings'
  | 'moodleSettings'
  | 'scheduleSettings'
  | 'bannerSettings';
