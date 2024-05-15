import { Settings } from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { StorageData } from '../../../types';

interface ToggleItemProps {
  name: StorageKeys;
  data: StorageData;
}

export enum StorageKeys {
  MOODLE = 'Moodle',
  SCHEDULE = 'Schedule lookup',
  BANNER = 'Banner',
}

const ToggleItem = (props: ToggleItemProps): JSX.Element => {
  const [data, setData] = useState<StorageData>(
    props.data ?? ({} as StorageData),
  );

  const updateVisibility = (enabled: boolean) => {
    chrome.storage.sync.set(
      {
        [`${props.name.split(' ')[0].toLowerCase()}Data`]: {
          ...props.data,
          enabled,
        },
      },
      () => {
        setData((data) => ({ ...data, enabled }));
      },
    );
  };

  useEffect(() => setData(props.data), [props.data]);

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
        onChange={(e) => updateVisibility(e.target.checked)}
        checked={data.enabled ?? false}
      />
      {data.enabled && (
        <IconButton
          variant="solid"
          color="primary"
          size="sm"
          sx={{ borderRadius: '50%' }}
        >
          <Settings />
        </IconButton>
      )}
    </Box>
  );
};

export default ToggleItem;
