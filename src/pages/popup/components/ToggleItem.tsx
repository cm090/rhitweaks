import { Settings } from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/joy';
import React from 'react';
import { Page } from '../../../types';
import { StorageKeys } from './HomePage';

interface ToggleItemProps {
  name: StorageKeys;
  data: boolean;
  setData: (data: boolean) => void;
  setPage: (page: Page) => void;
}

const ToggleItem = (props: ToggleItemProps): JSX.Element => {
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
        onChange={(e) => props.setData(e.target.checked)}
        checked={props.data ?? false}
      />
      {props.data && (
        <IconButton
          variant="solid"
          color="primary"
          size="sm"
          sx={{ borderRadius: '50%' }}
          onClick={() =>
            props.setPage(
              `${props.name.split(' ')[0].toLowerCase()}Settings` as Page,
            )
          }
        >
          <Settings />
        </IconButton>
      )}
    </Box>
  );
};

export default ToggleItem;
