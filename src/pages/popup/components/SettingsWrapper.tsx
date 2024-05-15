import { Box, Button, Typography } from '@mui/joy';
import React from 'react';

interface SettingsWrapperProps {
  page: string;
  back: () => void;
  children?: React.ReactNode;
}

const SettingsWrapper = (props: SettingsWrapperProps): JSX.Element => {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <Typography level="h3" textAlign="center">
        {props.page} Settings
      </Typography>
      {props.children}
      <Button size="sm" color="neutral" onClick={props.back}>
        Back
      </Button>
    </Box>
  );
};

export default SettingsWrapper;
