import {
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalDialog,
} from '@mui/joy';
import React, { ReactNode } from 'react';
import { DialogActions } from './DialogActions';

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
      <DialogActions
        actionText="Reset"
        onConfirm={() => {
          props.onConfirm();
          props.setOpen(false);
        }}
        onCancel={() => props.setOpen(false)}
      />
    </ModalDialog>
  </Modal>
);

export default ResetWarningDialog;
