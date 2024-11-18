import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Course } from '../../../types';
import {
  IconButton,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Typography,
} from '@mui/joy';
import { Delete, DragHandle, Edit } from '@mui/icons-material';

interface CourseListItemProps {
  course: Course;
  onEdit: (course: Course) => void;
  onRemove: (course: Course) => void;
}

const CourseListItem = (props: CourseListItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.course.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <ListItem>
        <ListItemDecorator>
          <DragHandle sx={{ cursor: 'ns-resize' }} />
        </ListItemDecorator>
        <ListItemContent>
          <Typography
            title={props.course.name}
            sx={{
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            {props.course.name}
          </Typography>
        </ListItemContent>
        <IconButton onClick={() => props.onEdit(props.course)}>
          <Edit />
        </IconButton>
        <IconButton onClick={() => props.onRemove(props.course)}>
          <Delete />
        </IconButton>
      </ListItem>
    </div>
  );
};

export default CourseListItem;
