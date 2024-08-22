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
  const updateData = (key: string, value: string) =>
    props.setData((prevData) => ({ ...prevData, [key]: value }));

  return (
    <SettingsWrapper page="Moodle" back={() => props.setPage('home')}>
      <ColorPicker
        label="Background color"
        defaultValue={moodleDefaults.bgColor}
        data={props.data.bgColor}
        dataKey="bgColor"
        setData={updateData}
      />
      <ColorPicker
        label="Text color"
        defaultValue={moodleDefaults.textColor}
        data={props.data.textColor}
        dataKey="textColor"
        setData={updateData}
      />
      <ColorPicker
        label="Card color"
        defaultValue={moodleDefaults.cardColor}
        data={props.data.cardColor}
        dataKey="cardColor"
        setData={updateData}
      />
      <ColorPicker
        label="Accent color"
        defaultValue={moodleDefaults.accentColor}
        data={props.data.accentColor}
        dataKey="accentColor"
        setData={updateData}
      />
      <ColorPicker
        label="Sidebar color"
        defaultValue={moodleDefaults.sbColor}
        data={props.data.sbColor}
        dataKey="sbColor"
        setData={updateData}
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
