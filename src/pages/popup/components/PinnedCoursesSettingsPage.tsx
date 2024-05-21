import { FormControl, FormLabel, Option, Select } from '@mui/joy';
import React from 'react';
import { Course, MoodleData, Page } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface PinnedCoursesSettingsPageProps {
  setPage: (page: Page) => void;
  data: MoodleData;
  setData: React.Dispatch<React.SetStateAction<MoodleData>>;
}

const PinnedCoursesSettingsPage = (
  props: PinnedCoursesSettingsPageProps,
): JSX.Element => {
  const [selectedCourse, setSelectedCourse] = React.useState<Course>();

  return (
    <SettingsWrapper
      page="Pinned Courses"
      back={() => props.setPage('moodleSettings')}
    >
      <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
        <FormLabel>Display mode</FormLabel>
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
      <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
        <FormLabel>Edit course</FormLabel>
        <Select
          value={selectedCourse?.id ?? ''}
          onChange={(_, course) =>
            setSelectedCourse(
              props.data.pinnedCourses.find((c) => c.id === course),
            )
          }
        >
          {props.data.pinnedCourses.map((course) => (
            <Option key={course.id} value={course.id}>
              {course.name}
            </Option>
          ))}
        </Select>
      </FormControl>
    </SettingsWrapper>
  );
};

export default PinnedCoursesSettingsPage;
