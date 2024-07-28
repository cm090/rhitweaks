import { Box, Button, ButtonGroup } from '@mui/joy';
import React, { useState } from 'react';
import {
  bannerDefaults,
  moodleDefaults,
  scheduleDefaults,
} from '../../../defaults';
import { ExtensionData, Page, SetExtensionData } from '../../../types';
import GenericWarningDialog from './GenericWarningDialog';
import ResetWarningDialog from './ResetWarningDialog';
import SettingsWrapper from './SettingsWrapper';

interface AdditionalSettingsPageProps {
  data: ExtensionData;
  setData: SetExtensionData;
  setPage: (page: Page) => void;
}

const updateBorderColor = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
) => {
  const button = e.target as HTMLButtonElement;
  if (!button) {
    return;
  }
  button.style.backgroundColor = 'green';
  setTimeout(() => {
    button.style.background = '';
  }, 2000);
};

const AdditionalSettingsPage = (
  props: AdditionalSettingsPageProps,
): JSX.Element => {
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [warningIsError, setWarningIsError] = useState(false);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const importData = (
    button: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const fileSelector = document.createElement('input');
    fileSelector.type = 'file';
    fileSelector.accept = 'application/json';
    fileSelector.addEventListener('change', (e) => handleFileSelect(e, button));
    fileSelector.click();
    fileSelector.remove();
  };

  const handleFileSelect = (
    e: Event,
    button: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const inputElement = e.target as HTMLInputElement;
    if (!(inputElement.files && inputElement.files)) {
      return;
    }
    const file = inputElement.files[0];
    const reader = new FileReader();
    reader.onload = (data) => {
      let contents;
      try {
        contents = JSON.parse(data.target!.result as string) as {
          version: string;
          moodle: ExtensionData['moodleData'];
          schedule: ExtensionData['scheduleData'];
          banner: ExtensionData['bannerData'];
        };
        if (
          !(
            contents.moodle &&
            contents.schedule &&
            contents.banner &&
            contents.version
          )
        ) {
          throw new Error();
        }
      } catch (e) {
        setWarningMessage('Invalid file selected');
        setWarningIsError(true);
        setWarningDialogOpen(true);
        return;
      }
      if (contents.version != chrome.runtime.getManifest().version) {
        setWarningMessage(
          "The data you're trying to import is from an older version of RHITweaks. Some of your settings may not be updated.",
        );
        setWarningIsError(false);
        setWarningDialogOpen(true);
      }
      props.setData.setMoodleData(contents.moodle);
      props.setData.setScheduleData(contents.schedule);
      props.setData.setBannerData(contents.banner);
      updateBorderColor(button);
    };
    reader.readAsText(file);
  };

  const exportData = (
    button: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const result = {
      version: chrome.runtime.getManifest().version,
      moodle: props.data.moodleData,
      schedule: props.data.scheduleData,
      banner: props.data.bannerData,
    };
    const a = document.createElement('a');
    const blob = new Blob([JSON.stringify(result)], {
      type: 'application/json',
    });
    a.href = URL.createObjectURL(blob);
    a.download = 'rhitweaks.json';
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
    updateBorderColor(button);
  };

  const resetToDefaults = () => {
    props.setData.setMoodleData(moodleDefaults);
    props.setData.setScheduleData(scheduleDefaults);
    props.setData.setBannerData(bannerDefaults);
  };

  return (
    <SettingsWrapper page="Additional" back={() => props.setPage('home')}>
      <ButtonGroup sx={{ marginBlock: '10px', width: '100%' }}>
        <Button variant="solid" sx={{ width: '50%' }} onClick={importData}>
          Import data
        </Button>
        <Button variant="solid" sx={{ width: '50%' }} onClick={exportData}>
          Export data
        </Button>
      </ButtonGroup>
      <Button
        color="danger"
        sx={{ width: '100%' }}
        onClick={() => setResetDialogOpen(true)}
      >
        Reset to defaults
      </Button>
      <GenericWarningDialog
        open={warningDialogOpen}
        setOpen={setWarningDialogOpen}
        message={warningMessage}
        isError={warningIsError}
      />
      <ResetWarningDialog
        open={resetDialogOpen}
        setOpen={setResetDialogOpen}
        onConfirm={resetToDefaults}
        isAllData={true}
      />
      <Box sx={{ height: '150px' }} />
    </SettingsWrapper>
  );
};

export default AdditionalSettingsPage;
