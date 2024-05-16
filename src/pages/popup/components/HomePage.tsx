import { Box, Button, ButtonGroup, Link, Sheet, Typography } from '@mui/joy';
import React, { useState } from 'react';
import { BannerData, MoodleData, Page, ScheduleData } from '../../../types';
import ToggleItem from './ToggleItem';

export enum StorageKeys {
  MOODLE = 'Moodle',
  SCHEDULE = 'Schedule lookup',
  BANNER = 'Banner',
}

interface HomePageProps {
  data: {
    moodleData: MoodleData;
    scheduleData: ScheduleData;
    bannerData: BannerData;
  };
  setData: {
    setMoodleData: React.Dispatch<React.SetStateAction<MoodleData>>;
    setScheduleData: React.Dispatch<React.SetStateAction<ScheduleData>>;
    setBannerData: React.Dispatch<React.SetStateAction<BannerData>>;
  };
  setPage: (page: Page) => void;
}

const HomePage = (props: HomePageProps): JSX.Element => {
  const [version] = useState<string>(chrome.runtime.getManifest().version);

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
          data={props.data.moodleData.enabled}
          setData={(enabled) =>
            props.setData.setMoodleData((data) => ({ ...data, enabled }))
          }
          setPage={props.setPage}
        />
        <ToggleItem
          name={StorageKeys.SCHEDULE}
          data={props.data.scheduleData.enabled}
          setData={(enabled) =>
            props.setData.setScheduleData((data) => ({ ...data, enabled }))
          }
          setPage={props.setPage}
        />
        <ToggleItem
          name={StorageKeys.BANNER}
          data={props.data.bannerData.enabled}
          setData={(enabled) =>
            props.setData.setBannerData((data) => ({ ...data, enabled }))
          }
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
