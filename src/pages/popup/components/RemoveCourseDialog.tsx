import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy';
import React, { memo, ReactNode } from 'react';
import { Course } from '../../../types';

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
      <DialogActions>
        <Button
          variant="solid"
          color="danger"
          onClick={() => {
            props.onConfirm();
            props.setOpen(false);
          }}
        >
          Remove
        </Button>
        <Button
          variant="plain"
          color="neutral"
          onClick={() => props.setOpen(false)}
        >
          Cancel
        </Button>
      </DialogActions>
    </ModalDialog>
  </Modal>
);

export default memo(RemoveCourseDialog);
