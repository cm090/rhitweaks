import {
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy';
import React, { memo, ReactNode } from 'react';
import { Course } from '../../../types';
import { DialogActions } from './DialogActions';

interface RemoveCourseDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  course?: Course;
  onConfirm: () => void;
}

const RemoveCourseDialog = (props: RemoveCourseDialogProps): ReactNode => (
  <Modal open={props.open} onClose={() => props.setOpen(false)}>
    <ModalDialog variant="outlined" role="alertdialog">
      <DialogTitle>Remove course</DialogTitle>
      <Divider />
      <DialogContent>
        Are you sure you want to remove {props.course?.name ?? 'this course'}?
        This cannot be undone.
      </DialogContent>
      <DialogActions
        actionText="Remove"
        onConfirm={() => {
          props.onConfirm();
          props.setOpen(false);
        }}
        onCancel={() => props.setOpen(false)}
      />
    </ModalDialog>
  </Modal>
);
export default memo(RemoveCourseDialog);
