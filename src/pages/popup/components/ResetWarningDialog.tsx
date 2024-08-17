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

interface ResetWarningDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  dataType?: string;
  isAllData?: boolean;
}

const ResetWarningDialog = (props: ResetWarningDialogProps): ReactNode => (
  <Modal open={props.open} onClose={() => props.setOpen(false)}>
    <ModalDialog variant="outlined" role="alertdialog">
      <DialogTitle>Reset {props.dataType ?? 'all'} data</DialogTitle>
      <Divider />
      <DialogContent>
        Are you sure you want to reset {props.isAllData ? 'all ' : ''}your{' '}
        {props.dataType ? `${props.dataType} ` : ''}data? This cannot be undone.
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
          Reset
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

export default ResetWarningDialog;
