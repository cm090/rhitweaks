import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy';
import React, { useEffect } from 'react';

interface GenericWarningDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  isError?: boolean;
}

const GenericWarningDialog = (
  props: GenericWarningDialogProps,
): JSX.Element => {
  useEffect(() => props.setOpen(props.open), [props.open]);

  return (
    <Modal open={props.open} onClose={() => props.setOpen(false)}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>{props.isError ? 'Error' : 'Warning'}</DialogTitle>
        <Divider />
        <DialogContent>{props.message}</DialogContent>
        <DialogActions>
          <Button
            variant="plain"
            color="neutral"
            onClick={() => props.setOpen(false)}
          >
            Close
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default GenericWarningDialog;
