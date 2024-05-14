import { Settings } from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/joy';
import React, { useState } from 'react';

interface ToggleItemProps {
  name: string;
}

const ToggleItem = (props: ToggleItemProps): JSX.Element => {
  const [enabled, setEnabled] = useState<boolean>(false);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '40px',
      }}
    >
      <Checkbox
        variant="solid"
        label={`${props.name} tweaks`}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      {enabled && (
        <IconButton variant="solid" color="primary" size="sm">
          <Settings />
        </IconButton>
      )}
    </Box>
  );
};

export default ToggleItem;
