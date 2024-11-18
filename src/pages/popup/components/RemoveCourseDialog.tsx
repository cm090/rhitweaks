import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy';
import React, { ReactNode } from 'react';
import { Course } from '../../../types';

interface RemoveCourseDialogProps {
  open?: Course;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (course?: Course) => void;
}

const RemoveCourseDialog = (props: RemoveCourseDialogProps): ReactNode => (
  <Modal open={props.open != undefined} onClose={() => props.setOpen(false)}>
    <ModalDialog variant="outlined" role="alertdialog">
      <DialogTitle>Remove course</DialogTitle>
      <Divider />
      <DialogContent>
        Are you sure you want to remove {props.open?.name ?? ''}? This cannot be
        undone.
      </DialogContent>
      <DialogActions>
        <Button
          variant="solid"
          color="danger"
          onClick={() => {
            props.onConfirm(props.open);
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

export default RemoveCourseDialog;
