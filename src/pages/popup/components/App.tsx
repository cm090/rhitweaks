import { Button, ButtonGroup, Sheet, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import ToggleItem, { StorageKeys } from './ToggleItem';
import { MoodleData, ScheduleData, BannerData } from '../../../types';

const App = (): JSX.Element => {
  const [moodleData, setMoodleData] = useState<MoodleData>({} as MoodleData);
  const [scheduleData, setScheduleData] = useState<ScheduleData>(
    {} as ScheduleData,
  );
  const [bannerData, setBannerData] = useState<BannerData>({} as BannerData);

  useEffect(
    () =>
      chrome.storage.sync.get(
        ['moodleData', 'scheduleData', 'bannerData'],
        (result) => {
          setMoodleData(result.moodleData);
          setScheduleData(result.scheduleData);
          setBannerData(result.bannerData);
        },
      ),
    [],
  );

  return (
    <Sheet>
      <Typography level="h2" textAlign="center">
        RHITweaks
      </Typography>
      <ToggleItem name={StorageKeys.MOODLE} data={moodleData} />
      <ToggleItem name={StorageKeys.SCHEDULE} data={scheduleData} />
      <ToggleItem name={StorageKeys.BANNER} data={bannerData} />
      <Button color="neutral" sx={{ width: '100%' }}>
        Additional settings
      </Button>
      <ButtonGroup>
        <Button variant="outlined" color="neutral">
          Docs
        </Button>
        <Button variant="outlined" color="neutral">
          Report a problem
        </Button>
      </ButtonGroup>
      <Typography level="body-sm" textAlign="center">
        Version
      </Typography>
      <Typography level="body-sm" textAlign="center">
        &copy; 2023 Canon Maranda
      </Typography>
    </Sheet>
  );
};

export default App;
