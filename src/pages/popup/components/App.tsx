import React, { useState } from 'react';
import { Page } from '../../../types';
import BannerSettingsPage from './BannerSettingsPage';
import HomePage from './HomePage';
import MoodleSettingsPage from './MoodleSettingsPage';
import ScheduleSettingsPage from './ScheduleSettingsPage';

const App = (): JSX.Element => {
  const [activePage, setActivePage] = useState<Page>('home');

  switch (activePage) {
    case 'home':
      return <HomePage setPage={setActivePage} />;
    case 'moodleSettings':
      return <MoodleSettingsPage setPage={setActivePage} />;
    case 'scheduleSettings':
      return <ScheduleSettingsPage setPage={setActivePage} />;
    case 'bannerSettings':
      return <BannerSettingsPage setPage={setActivePage} />;
    case 'pinnedCoursesSettings':
    case 'additionalSettings':
      return <div>Coming soon</div>;
  }
};

export default App;
