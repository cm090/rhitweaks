import { Button, FormControl, FormLabel, Option, Select } from '@mui/joy';
import React, { ReactNode } from 'react';
import { moodleDefaults } from '../../../defaults';
import { MoodleData, Page } from '../../../types';
import ColorPicker from './ColorPicker';
import SettingsWrapper from './SettingsWrapper';

interface MoodleSettingsPageProps {
  data: MoodleData;
  setData: React.Dispatch<React.SetStateAction<MoodleData>>;
  setPage: (page: Page) => void;
}

const MoodleSettingsPage = (props: MoodleSettingsPageProps): ReactNode => {
  return (
    <SettingsWrapper page="Moodle" back={() => props.setPage('home')}>
      <ColorPicker
        label="Background color"
        defaultValue={moodleDefaults.bgColor}
        data={props.data.bgColor}
        setData={(bgColor) =>
          props.setData((prevData) => ({ ...prevData, bgColor }))
        }
      />
      <ColorPicker
        label="Text color"
        defaultValue={moodleDefaults.textColor}
        data={props.data.textColor}
        setData={(textColor) =>
          props.setData((prevData) => ({ ...prevData, textColor }))
        }
      />
      <ColorPicker
        label="Card color"
        defaultValue={moodleDefaults.cardColor}
        data={props.data.cardColor}
        setData={(cardColor) =>
          props.setData((prevData) => ({ ...prevData, cardColor }))
        }
      />
      <ColorPicker
        label="Accent color"
        defaultValue={moodleDefaults.accentColor}
        data={props.data.accentColor}
        setData={(accentColor) =>
          props.setData((prevData) => ({ ...prevData, accentColor }))
        }
      />
      <ColorPicker
        label="Sidebar color"
        defaultValue={moodleDefaults.sbColor}
        data={props.data.sbColor}
        setData={(sbColor) =>
          props.setData((prevData) => ({ ...prevData, sbColor }))
        }
      />
      <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
        <FormLabel>Timeline format</FormLabel>
        <Select
          value={props.data.timeFormat}
          onChange={(_, timeFormat) =>
            timeFormat &&
            props.setData((prevData) => ({ ...prevData, timeFormat }))
          }
        >
          <Option value={12}>12 hour (AM/PM)</Option>
          <Option value={24}>24 hour</Option>
        </Select>
      </FormControl>
      <Button
        color="neutral"
        sx={{ width: '100%', marginBlock: '10px' }}
        onClick={() => props.setPage('pinnedCoursesSettings')}
      >
        Pinned courses
      </Button>
    </SettingsWrapper>
  );
};

export default MoodleSettingsPage;
