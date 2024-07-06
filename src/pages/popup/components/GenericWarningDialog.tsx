import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy';
import React, { useEffect, useState } from 'react';

interface GenericWarningDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  isError?: boolean;
}

const GenericWarningDialog = (
  props: GenericWarningDialogProps,
): JSX.Element => {
  const [open, setOpen] = useState(props.open);
  const closeDialog = () => {
    setOpen(false);
    props.setOpen(false);
  };

  useEffect(() => setOpen(props.open), [props.open]);

  return (
    <Modal open={open} onClose={closeDialog}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>{props.isError ? 'Error' : 'Warning'}</DialogTitle>
        <Divider />
        <DialogContent>{props.message}</DialogContent>
        <DialogActions>
          <Button variant="plain" color="neutral" onClick={closeDialog}>
            Close
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default GenericWarningDialog;
