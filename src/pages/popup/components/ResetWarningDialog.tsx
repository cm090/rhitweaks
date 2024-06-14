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

interface ResetWarningDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  dataType: string;
}

const ResetWarningDialog = (props: ResetWarningDialogProps): JSX.Element => {
  const [open, setOpen] = useState(props.open);
  const closeDialog = () => {
    setOpen(false);
    props.setOpen(false);
  };

  useEffect(() => setOpen(props.open), [props.open]);

  return (
    <Modal open={open} onClose={closeDialog}>
      <ModalDialog variant="outlined" role="alertdialog">
        <DialogTitle>Reset {props.dataType} data</DialogTitle>
        <Divider />
        <DialogContent>
          Are you sure you want to reset your {props.dataType} data? This cannot
          be undone.
        </DialogContent>
        <DialogActions>
          <Button
            variant="solid"
            color="danger"
            onClick={() => {
              props.onConfirm();
              closeDialog();
            }}
          >
            Reset
          </Button>
          <Button variant="plain" color="neutral" onClick={closeDialog}>
            Cancel
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  );
};

export default ResetWarningDialog;
