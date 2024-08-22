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
import React, { ReactNode, useState } from 'react';
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
): ReactNode => {
  const emptyCourse: Course = { id: '', name: '' };
  const [selectedCourse, setSelectedCourse] = useState<Course>(emptyCourse);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const updateCourseName = ({ target }: React.ChangeEvent<HTMLInputElement>) =>
    setSelectedCourse((prevCourse) => {
      const updatedCourse = { ...prevCourse, name: target.value } as Course;
      props.setData((prevData) => ({
        ...prevData,
        pinnedCourses: prevData.pinnedCourses.map((course) =>
          course.id === selectedCourse?.id ? updatedCourse : course,
        ),
      }));
      return updatedCourse;
    });
  const deleteSelectedCourse = () => {
    props.setData((prevData) => ({
      ...prevData,
      pinnedCourses: prevData.pinnedCourses.filter(
        (course) => course.id !== selectedCourse?.id,
      ),
    }));
    setSelectedCourse(emptyCourse);
  };

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
            pinnedCoursesDisplay &&
            props.setData((prevData) => ({ ...prevData, pinnedCoursesDisplay }))
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
              props.data.pinnedCourses.find((c) => c.id === course) ??
                emptyCourse,
            )
          }
        >
          {props.data.pinnedCourses.map((course) => (
            <Option key={course.id} value={course.id} sx={{ width: 'inherit' }}>
              {course.name}
            </Option>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
        <FormLabel>Label</FormLabel>
        <Input
          variant="outlined"
          disabled={!selectedCourse.id}
          value={selectedCourse?.name}
          onChange={updateCourseName}
          endDecorator={
            <>
              <IconButton
                onClick={deleteSelectedCourse}
                disabled={!selectedCourse.id}
              >
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
