import {
  Button,
  FormControl,
  FormLabel,
  List,
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
import CourseListItem from './CourseListItem';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

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
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) =>
    active.id !== over?.id &&
    props.setData((prevData) => {
      const oldIndex = prevData.pinnedCourses.findIndex(
        (course) => course.id === active.id,
      );
      const newIndex = prevData.pinnedCourses.findIndex(
        (course) => course.id === over?.id,
      );

      return {
        ...prevData,
        pinnedCourses: arrayMove(prevData.pinnedCourses, oldIndex, newIndex),
      };
    });

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <List
              sx={(theme) => ({
                maxHeight: 150,
                overflowX: 'hidden',
                overflowY: 'scroll',
                scrollbarWidth: 'thin',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: `${theme.radius.md} 0 0 ${theme.radius.md}`,
              })}
            >
              <SortableContext
                items={props.data.pinnedCourses.map((course) => course.id)}
                strategy={verticalListSortingStrategy}
              >
                {props.data.pinnedCourses.map((course) => (
                  <CourseListItem
                    course={course}
                    onEdit={setEditCourseDialog}
                    onRemove={setRemoveCourseDialog}
                    key={course.id}
                  />
                ))}
              </SortableContext>
            </List>
          </DndContext>
        ) : (
          <Typography>No pinned courses</Typography>
        )}
      </FormControl>
      <Button
        color="danger"
        sx={{ width: '100%', marginBlock: '10px' }}
        onClick={() => setResetDialogOpen(true)}
        disabled={!props.data.pinnedCourses.length}
      >
        Clear pinned courses
      </Button>
      <EditCourseDialog
        open={editCourseDialog !== undefined}
        setOpen={() => setEditCourseDialog(undefined)}
        course={editCourseDialog}
        onConfirm={(name) => updateCourseName({ ...editCourseDialog!, name })}
      />
      <RemoveCourseDialog
        open={removeCourseDialog !== undefined}
        setOpen={() => setRemoveCourseDialog(undefined)}
        course={removeCourseDialog}
        onConfirm={() => deleteCourse(removeCourseDialog)}
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
