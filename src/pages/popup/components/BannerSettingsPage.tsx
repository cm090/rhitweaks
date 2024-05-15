import React from 'react';
import { BannerData, Page } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface BannerSettingsPageProps {
  setPage: (page: Page) => void;
  data: BannerData;
  setData: (data: BannerData) => void;
}

const BannerSettingsPage = (props: BannerSettingsPageProps): JSX.Element => {
  return (
    <SettingsWrapper page="Banner" back={() => props.setPage('home')}>
      <div>Coming soon</div>
    </SettingsWrapper>
  );
};

export default BannerSettingsPage;
