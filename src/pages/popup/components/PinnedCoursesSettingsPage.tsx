import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormLabel,
  IconButton,
  List,
  ListItem,
  ListItemContent,
  Option,
  Select,
  Typography,
} from '@mui/joy';
import React, { ReactNode, useState } from 'react';
import { Course, MoodleData, Page } from '../../../types';
import ResetWarningDialog from './ResetWarningDialog';
import SettingsWrapper from './SettingsWrapper';
import EditCourseDialog from './EditCourseDialog';
import RemoveCourseDialog from './RemoveCourseDialog';

interface PinnedCoursesSettingsPageProps {
  setPage: (page: Page) => void;
  data: MoodleData;
  setData: React.Dispatch<React.SetStateAction<MoodleData>>;
}

const PinnedCoursesSettingsPage = (
  props: PinnedCoursesSettingsPageProps,
): ReactNode => {
  const [editCourseDialog, setEditCourseDialog] = useState<Course>();
  const [removeCourseDialog, setRemoveCourseDialog] = useState<Course>();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const updateCourseName = (current?: Course) =>
    current &&
    props.setData((prevData) => ({
      ...prevData,
      pinnedCourses: prevData.pinnedCourses.map((course) =>
        course.id === current.id ? current : course,
      ),
    }));

  const deleteCourse = (current?: Course) =>
    current &&
    props.setData((prevData) => ({
      ...prevData,
      pinnedCourses: prevData.pinnedCourses.filter(
        (course) => course.id !== current?.id,
      ),
    }));

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
        <FormLabel>Edit courses</FormLabel>
        {props.data.pinnedCourses.length ? (
          <List sx={{ maxHeight: 150, overflow: 'auto' }}>
            {props.data.pinnedCourses.map((course) => (
              <ListItem key={course.id}>
                <ListItemContent>
                  <Typography
                    title={course.name}
                    sx={{
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {course.name}
                  </Typography>
                </ListItemContent>
                <IconButton onClick={() => setEditCourseDialog(course)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={() => setRemoveCourseDialog(course)}>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No pinned courses</Typography>
        )}
      </FormControl>
      <Button
        color="danger"
        sx={{ width: '100%', marginBlock: '10px' }}
        onClick={() => setResetDialogOpen(true)}
      >
        Clear pinned courses
      </Button>
      <EditCourseDialog
        open={editCourseDialog}
        setOpen={() => setEditCourseDialog(undefined)}
        onConfirm={updateCourseName}
      />
      <RemoveCourseDialog
        open={removeCourseDialog}
        setOpen={() => setRemoveCourseDialog(undefined)}
        onConfirm={deleteCourse}
      />
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
