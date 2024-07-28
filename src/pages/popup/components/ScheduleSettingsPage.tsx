import React, { ReactNode } from 'react';
import { scheduleDefaults } from '../../../defaults';
import { Page, ScheduleData } from '../../../types';
import ColorPicker from './ColorPicker';
import SettingsWrapper from './SettingsWrapper';

interface ScheduleSettingsPageProps {
  setPage: (page: Page) => void;
  data: ScheduleData;
  setData: React.Dispatch<React.SetStateAction<ScheduleData>>;
}

const ScheduleSettingsPage = (props: ScheduleSettingsPageProps): ReactNode => {
  return (
    <SettingsWrapper page="Schedule Lookup" back={() => props.setPage('home')}>
      <ColorPicker
        label="Background color"
        defaultValue={scheduleDefaults.bgColor}
        data={props.data.bgColor}
        setData={(bgColor) =>
          props.setData((prevData) => ({ ...prevData, bgColor }))
        }
      />
      <ColorPicker
        label="Accent color"
        defaultValue={scheduleDefaults.accentColor}
        data={props.data.accentColor}
        setData={(accentColor) =>
          props.setData((prevData) => ({ ...prevData, accentColor }))
        }
      />
      <ColorPicker
        label="Text color"
        defaultValue={scheduleDefaults.textColor}
        data={props.data.textColor}
        setData={(textColor) =>
          props.setData((prevData) => ({ ...prevData, textColor }))
        }
      />
      <ColorPicker
        label="Border color"
        defaultValue={scheduleDefaults.borderColor}
        data={props.data.borderColor}
        setData={(borderColor) =>
          props.setData((prevData) => ({ ...prevData, borderColor }))
        }
      />
    </SettingsWrapper>
  );
};

export default ScheduleSettingsPage;
