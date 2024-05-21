import React, { useEffect, useState } from 'react';
import {
  bannerDefaults,
  moodleDefaults,
  scheduleDefaults,
} from '../../../defaults';
import { BannerData, MoodleData, Page, ScheduleData } from '../../../types';
import BannerSettingsPage from './BannerSettingsPage';
import HomePage from './HomePage';
import MoodleSettingsPage from './MoodleSettingsPage';
import ScheduleSettingsPage from './ScheduleSettingsPage';

const App = (): JSX.Element => {
  const [ready, setReady] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<Page>('home');
  const [moodleData, setMoodleData] = useState<MoodleData>(moodleDefaults);
  const [scheduleData, setScheduleData] =
    useState<ScheduleData>(scheduleDefaults);
  const [bannerData, setBannerData] = useState<BannerData>(bannerDefaults);

  useEffect(
    () =>
      chrome.storage.local.get(null, (result) => {
        setMoodleData((prevData) => ({ ...prevData, ...result.moodleData }));
        setScheduleData((prevData) => ({
          ...prevData,
          ...result.scheduleData,
        }));
        setBannerData((prevData) => ({ ...prevData, ...result.bannerData }));
        setReady(true);
      }),
    [],
  );

  useEffect(() => {
    if (ready) {
      chrome.storage.local.set({ moodleData, scheduleData, bannerData });
    }
  }, [moodleData, scheduleData, bannerData]);

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
