import { Delete } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
} from '@mui/joy';
import React, { useState } from 'react';
import { Course, MoodleData, Page } from '../../../types';
import ResetWarningDialog from './ResetWarningDialog';
import SettingsWrapper from './SettingsWrapper';

interface PinnedCoursesSettingsPageProps {
  setPage: (page: Page) => void;
  data: MoodleData;
  setData: React.Dispatch<React.SetStateAction<MoodleData>>;
}

const PinnedCoursesSettingsPage = (
  props: PinnedCoursesSettingsPageProps,
): JSX.Element => {
  const [selectedCourse, setSelectedCourse] = useState<Course>();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

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
      <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
        <FormLabel>Label</FormLabel>
        <Input
          variant="outlined"
          value={selectedCourse?.name}
          onChange={() => null}
          endDecorator={
            <>
              <IconButton onClick={() => null}>
                <Delete />
              </IconButton>
            </>
          }
        />
      </FormControl>
      <Button
        color="danger"
        sx={{ width: '100%', marginBlock: '10px' }}
        onClick={() => setResetDialogOpen(true)}
      >
        Clear pinned courses
      </Button>
      <ResetWarningDialog
        open={resetDialogOpen}
        setOpen={setResetDialogOpen}
        onConfirm={() =>
          props.setData((prevData) => ({
            ...prevData,
            pinnedCourses: [],
          }))
        }
        dataType="pinned courses"
      />
    </SettingsWrapper>
  );
};

export default PinnedCoursesSettingsPage;
