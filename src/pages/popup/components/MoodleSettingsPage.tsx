import React from 'react';
import { moodleDefaults } from '../../../defaults';
import { MoodleData, Page } from '../../../types';
import ColorPicker from './ColorPicker';
import SettingsWrapper from './SettingsWrapper';

interface MoodleSettingsPageProps {
  data: MoodleData;
  setData: React.Dispatch<React.SetStateAction<MoodleData>>;
  setPage: (page: Page) => void;
}

const MoodleSettingsPage = (props: MoodleSettingsPageProps): JSX.Element => {
  return (
    <SettingsWrapper page="Moodle" back={() => props.setPage('home')}>
      <ColorPicker
        label="Background color"
        defaultValue={moodleDefaults.bgColor}
        data={props.data.bgColor}
        setData={(bgColor) => props.setData((data) => ({ ...data, bgColor }))}
      />
      <ColorPicker
        label="Text color"
        defaultValue={moodleDefaults.textColor}
        data={props.data.textColor}
        setData={(textColor) =>
          props.setData((data) => ({ ...data, textColor }))
        }
      />
      <ColorPicker
        label="Card color"
        defaultValue={moodleDefaults.cardColor}
        data={props.data.cardColor}
        setData={(cardColor) =>
          props.setData((data) => ({ ...data, cardColor }))
        }
      />
      <ColorPicker
        label="Accent color"
        defaultValue={moodleDefaults.accentColor}
        data={props.data.accentColor}
        setData={(accentColor) =>
          props.setData((data) => ({ ...data, accentColor }))
        }
      />
      <ColorPicker
        label="Sidebar color"
        defaultValue={moodleDefaults.sbColor}
        data={props.data.sbColor}
        setData={(sbColor) => props.setData((data) => ({ ...data, sbColor }))}
      />
    </SettingsWrapper>
  );
};

export default MoodleSettingsPage;
