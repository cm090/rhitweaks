import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
} from '@mui/joy';
import React, { ReactNode, useState } from 'react';
import { Course } from '../../../types';

interface EditCourseDialogProps {
  open?: Course;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: (course?: Course) => void;
}

const EditCourseDialog = (props: EditCourseDialogProps): ReactNode => {
  const [courseName, setCourseName] = useState(props.open?.name);

  const handleSubmit = () => {
    if (courseName && courseName.length) {
      props.onConfirm({ ...props.open, name: courseName } as Course);
    }
    props.setOpen(false);
    setCourseName(undefined);
  };

  return (
    <Modal open={props.open != undefined} onClose={() => props.setOpen(false)}>
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
                value={courseName ?? props.open?.name ?? ''}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => props.setOpen(false)}
          >
            Cancel
          </Button>
          <Button variant="solid" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default EditCourseDialog;
