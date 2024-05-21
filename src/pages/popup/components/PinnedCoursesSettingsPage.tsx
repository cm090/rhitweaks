import { FormControl, FormLabel, Option, Select } from '@mui/joy';
import React from 'react';
import { MoodleData, Page } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface ScheduleSettingsPageProps {
  setPage: (page: Page) => void;
  data: MoodleData;
  setData: React.Dispatch<React.SetStateAction<MoodleData>>;
}

const PinnedCoursesSettingsPage = (
  props: ScheduleSettingsPageProps,
): JSX.Element => {
  return (
    <SettingsWrapper
      page="Pinned Courses"
      back={() => props.setPage('moodleSettings')}
    >
      <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
        <FormLabel>Timeline format</FormLabel>
        <Select
          value={props.data.pinnedCoursesDisplay}
          onChange={(_, pinnedCoursesDisplay) =>
            props.setData(
              (prevData) =>
                ({ ...prevData, pinnedCoursesDisplay } as MoodleData),
            )
          }
        >
          <Option value="dropdown">Dropdown</Option>
          <Option value="header">In header</Option>
        </Select>
      </FormControl>
    </SettingsWrapper>
  );
};

export default PinnedCoursesSettingsPage;
