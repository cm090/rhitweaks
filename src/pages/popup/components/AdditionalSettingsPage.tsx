import React from 'react';
import { Page } from '../../../types';
import SettingsWrapper from './SettingsWrapper';

interface AdditionalSettingsPageProps {
  setPage: (page: Page) => void;
}

const AdditionalSettingsPage = (
  props: AdditionalSettingsPageProps,
): JSX.Element => {
  return (
    <SettingsWrapper page="Additional" back={() => props.setPage('home')}>
      <div>Coming soon</div>
    </SettingsWrapper>
  );
};

export default AdditionalSettingsPage;
