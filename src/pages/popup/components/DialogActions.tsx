import { Button, DialogActions as Actions } from '@mui/joy';
import React from 'react';

interface DialogActionsProps {
  actionText: string;
  onConfirm: VoidFunction;
  onCancel: VoidFunction;
  colorPrimary?: boolean;
}

export const DialogActions = (props: DialogActionsProps) => (
  <Actions>
    <Button
      variant="solid"
      color={props.colorPrimary ? 'primary' : 'danger'}
      onClick={props.onConfirm}
    >
      {props.actionText}
    </Button>
    <Button variant="plain" color="neutral" onClick={props.onCancel}>
      Cancel
    </Button>
  </Actions>
);
