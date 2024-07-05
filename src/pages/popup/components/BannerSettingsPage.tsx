import { Box, FormControl, FormLabel, Option, Select } from '@mui/joy';
import React from 'react';
import { BannerData, Page } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface BannerSettingsPageProps {
  setPage: (page: Page) => void;
  data: BannerData;
  setData: React.Dispatch<React.SetStateAction<BannerData>>;
}

const BannerSettingsPage = (props: BannerSettingsPageProps): JSX.Element => {
  return (
    <SettingsWrapper page="Banner" back={() => props.setPage('home')}>
      <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
        <FormLabel>Links category</FormLabel>
        <Select
          value={props.data.links}
          onChange={(_, links) =>
            links && props.setData((prevData) => ({ ...prevData, links }))
          }
        >
          <Option value="student">Student</Option>
          <Option value="faculty">Faculty (in progress)</Option>
        </Select>
      </FormControl>
      <Box sx={{ marginBlock: '50px' }} />
    </SettingsWrapper>
  );
};

export default BannerSettingsPage;
