import { Box, Button, ButtonGroup, Link, Sheet, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { BannerData, MoodleData, ScheduleData } from '../../../types';
import ToggleItem, { StorageKeys } from './ToggleItem';

const App = (): JSX.Element => {
  const [version] = useState<string>(chrome.runtime.getManifest().version);
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
    <Sheet
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography level="h2" textAlign="center">
        RHITweaks
      </Typography>
      <Box sx={{ width: '100%' }}>
        <ToggleItem name={StorageKeys.MOODLE} data={moodleData} />
        <ToggleItem name={StorageKeys.SCHEDULE} data={scheduleData} />
        <ToggleItem name={StorageKeys.BANNER} data={bannerData} />
      </Box>
      <Button color="neutral" sx={{ width: '100%', marginBlock: '10px' }}>
        Additional settings
      </Button>
      <ButtonGroup sx={{ marginBlock: '10px' }}>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() => window.open('https://link.canon.click/rhitweaks/wiki')}
        >
          Docs
        </Button>
        <Button
          variant="outlined"
          color="neutral"
          onClick={() =>
            window.open('https://link.canon.click/rhitweaks/issues')
          }
        >
          Report a problem
        </Button>
      </ButtonGroup>
      <Typography level="body-sm" textAlign="center">
        Version {version}
      </Typography>
      <Typography level="body-sm" textAlign="center">
        &copy; 2023-{new Date().getFullYear()}{' '}
        <Link
          color="neutral"
          onClick={() => window.open('https://about.canon.click')}
        >
          Canon Maranda
        </Link>
      </Typography>
    </Sheet>
  );
};

export default App;
