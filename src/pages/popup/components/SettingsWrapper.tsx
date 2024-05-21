import { ArrowLeft } from '@mui/icons-material';
import { Box, IconButton, Stack, Typography } from '@mui/joy';
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: '100%' }}
      >
        <IconButton
          size="sm"
          color="primary"
          variant="plain"
          onClick={props.back}
        >
          <ArrowLeft />
        </IconButton>
        <Typography level="h3" textAlign="center" sx={{ fontSize: '19px' }}>
          {props.page} Settings
        </Typography>
        <Box sx={{ width: '32px' }} />
      </Stack>
      {props.children}
    </Box>
  );
};

export default SettingsWrapper;
