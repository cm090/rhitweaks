import { Box, Button, ButtonGroup, Link, Sheet, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { BannerData, MoodleData, Page, ScheduleData } from '../../../types';
import ToggleItem from './ToggleItem';

export enum StorageKeys {
  MOODLE = 'Moodle',
  SCHEDULE = 'Schedule lookup',
  BANNER = 'Banner',
}

interface HomePageProps {
  setPage: (page: Page) => void;
}

const HomePage = (props: HomePageProps): JSX.Element => {
  const [version] = useState<string>(chrome.runtime.getManifest().version);
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
        <ToggleItem
          name={StorageKeys.MOODLE}
          data={moodleData}
          setPage={props.setPage}
        />
        <ToggleItem
          name={StorageKeys.SCHEDULE}
          data={scheduleData}
          setPage={props.setPage}
        />
        <ToggleItem
          name={StorageKeys.BANNER}
          data={bannerData}
          setPage={props.setPage}
        />
      </Box>
      <Button
        color="neutral"
        sx={{ width: '100%', marginBlock: '10px' }}
        onClick={() => props.setPage('additionalSettings')}
      >
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

export default HomePage;
