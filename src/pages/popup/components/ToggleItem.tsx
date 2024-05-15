import { Settings } from '@mui/icons-material';
import { Box, Checkbox, IconButton } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import { Page, StorageData } from '../../../types';
import { StorageKeys } from './HomePage';

interface ToggleItemProps {
  name: StorageKeys;
  data: StorageData;
  setPage: (page: Page) => void;
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
