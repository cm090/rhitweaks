import {
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
} from '@mui/joy';
import React, { memo, ReactNode, useEffect, useState } from 'react';
import { Course } from '../../../types';
import { DialogActions } from './DialogActions';

interface EditCourseDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  course?: Course;
  onConfirm: (value: string) => void;
}

const EditCourseDialog = (props: EditCourseDialogProps): ReactNode => {
  const [courseName, setCourseName] = useState<string>();

  useEffect(() => setCourseName(props.course?.name), [props.course]);

  const handleSubmit = () => {
    if (courseName && courseName.trim().length) {
      props.onConfirm(courseName.trim());
    }
    props.setOpen(false);
    setCourseName(undefined);
  };

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>Edit course</DialogTitle>
        <Divider />
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <FormControl>
              <FormLabel>Course name</FormLabel>
              <Input
                value={courseName ?? ''}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions
          actionText="Save"
          onConfirm={handleSubmit}
          onCancel={() => props.setOpen(false)}
          colorPrimary={true}
        />
      </ModalDialog>
    </Modal>
  );
};

export default memo(EditCourseDialog);
