import { Settings } from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/joy';
import React from 'react';

interface ToggleItemProps {
  name: string;
}

const ToggleItem = (props: ToggleItemProps): JSX.Element => {
  return (
    <Box>
      <Checkbox variant="outlined" label={`${props.name} tweaks`} />
      <IconButton variant="solid" color="primary" size="sm">
        <Settings />
      </IconButton>
    </Box>
  );
};

export default ToggleItem;
