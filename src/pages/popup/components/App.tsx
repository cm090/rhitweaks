import React, { useState } from 'react';
import { BannerData, MoodleData, Page, ScheduleData } from '../../../types';
import BannerSettingsPage from './BannerSettingsPage';
import HomePage from './HomePage';
import MoodleSettingsPage from './MoodleSettingsPage';
import ScheduleSettingsPage from './ScheduleSettingsPage';

const App = (): JSX.Element => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [moodleData, setMoodleData] = useState<MoodleData>({
    enabled: false,
    bgColor: '#000000',
    textColor: '#1d2125',
    cardColor: '#eeeeee',
    accentColor: '#800000',
    sbColor: '#000000',
    timeFormat: 12,
    pinnedCoursesDisplay: 'dropdown',
    pinnedCourses: [],
  });
  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    enabled: false,
    bgColor: '#141414',
    accentColor: '#800000',
    textColor: '#ffffff',
    borderColor: '#808080',
  });
  const [bannerData, setBannerData] = useState<BannerData>({
    enabled: false,
    links: 'student',
  });

  switch (activePage) {
    case 'home':
      return (
        <HomePage
          setPage={setActivePage}
          data={{ moodleData, scheduleData, bannerData }}
          setData={{ setMoodleData, setScheduleData, setBannerData }}
        />
      );
    case 'moodleSettings':
      return (
        <MoodleSettingsPage
          data={moodleData}
          setData={setMoodleData}
          setPage={setActivePage}
        />
      );
    case 'scheduleSettings':
      return (
        <ScheduleSettingsPage
          data={scheduleData}
          setData={setScheduleData}
          setPage={setActivePage}
        />
      );
    case 'bannerSettings':
      return (
        <BannerSettingsPage
          data={bannerData}
          setData={setBannerData}
          setPage={setActivePage}
        />
      );
    case 'pinnedCoursesSettings':
    case 'additionalSettings':
      return <div>Coming soon</div>;
  }
};

export default App;
