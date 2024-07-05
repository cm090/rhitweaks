import React, { useEffect, useState } from 'react';
import { getAllData, setAllData } from '../../../content/common/chromeData';
import {
  bannerDefaults,
  moodleDefaults,
  scheduleDefaults,
} from '../../../defaults';
import { BannerData, MoodleData, Page, ScheduleData } from '../../../types';
import BannerSettingsPage from './BannerSettingsPage';
import HomePage from './HomePage';
import MoodleSettingsPage from './MoodleSettingsPage';
import PinnedCoursesSettingsPage from './PinnedCoursesSettingsPage';
import ScheduleSettingsPage from './ScheduleSettingsPage';
import AdditionalSettingsPage from './AdditionalSettingsPage';

const App = (): JSX.Element => {
  const [ready, setReady] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<Page>('home');
  const [moodleData, setMoodleData] = useState<MoodleData>(moodleDefaults);
  const [scheduleData, setScheduleData] =
    useState<ScheduleData>(scheduleDefaults);
  const [bannerData, setBannerData] = useState<BannerData>(bannerDefaults);

  useEffect(() => {
    getAllData().then((result) => {
      setMoodleData((prevData) => ({ ...prevData, ...result.moodleData }));
      setScheduleData((prevData) => ({
        ...prevData,
        ...result.scheduleData,
      }));
      setBannerData((prevData) => ({ ...prevData, ...result.bannerData }));
      setReady(true);
    });
  }, []);

  useEffect(() => {
    if (ready) {
      setAllData({ moodleData, scheduleData, bannerData });
    }
  }, [ready, moodleData, scheduleData, bannerData]);

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
      return (
        <PinnedCoursesSettingsPage
          data={moodleData}
          setData={setMoodleData}
          setPage={setActivePage}
        />
      );
    case 'additionalSettings':
      return <AdditionalSettingsPage setPage={setActivePage} />;
  }
};

export default App;
