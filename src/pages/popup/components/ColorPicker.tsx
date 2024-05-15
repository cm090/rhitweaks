import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Typography,
} from '@mui/joy';
import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { HexValue } from '../../../types';

interface ColorPickerProps {
  label: string;
}

const ColorPicker = (props: ColorPickerProps): JSX.Element => {
  const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<HexValue>('#000000');

  return (
    <FormControl sx={{ width: '100%', marginBottom: '10px' }}>
      <FormLabel>{props.label}</FormLabel>
      <Input
        variant="outlined"
        color={color.match(/^#([A-Fa-f0-9]{6})$/) ? 'neutral' : 'danger'}
        value={color}
        onChange={(e) => setColor(e.target.value as HexValue)}
        slotProps={{ input: { pattern: '^#([A-Fa-f0-9]{6})$', maxLength: 7 } }}
        sx={{ '--Input-focusedThickness': '0px' }}
        endDecorator={
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setDisplayColorPicker(true)}
            sx={{
              backgroundColor: color,
              '&:hover': {
                backgroundColor: color,
              },
              borderWidth: '2px',
            }}
          />
        }
      />
      <Modal
        open={displayColorPicker}
        onClose={() => setDisplayColorPicker(false)}
      >
        <ModalDialog>
          <ModalClose />
          <Typography level="h4">{props.label}</Typography>
          <HexColorPicker
            color={color}
            onChange={(e) => setColor(e as HexValue)}
            style={{ width: '100%' }}
          />
        </ModalDialog>
      </Modal>
    </FormControl>
  );
};

export default ColorPicker;
