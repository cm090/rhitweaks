import { Dispatch, SetStateAction } from 'react';

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

export type ExtensionData = {
  moodleData: MoodleData;
  scheduleData: ScheduleData;
  bannerData: BannerData;
};

export type SetExtensionData = {
  setMoodleData: Dispatch<SetStateAction<MoodleData>>;
  setScheduleData: Dispatch<SetStateAction<ScheduleData>>;
  setBannerData: Dispatch<SetStateAction<BannerData>>;
};

export type StorageData = MoodleData | ScheduleData | BannerData;

export type Page =
  | 'home'
  | 'pinnedCoursesSettings'
  | 'additionalSettings'
  | 'moodleSettings'
  | 'scheduleSettings'
  | 'bannerSettings';

export interface BannerLink {
  title: string;
  icon: string;
  url: string;
}
