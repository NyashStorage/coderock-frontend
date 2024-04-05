import type { JSX } from 'react';
import { useState } from 'react';
import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Stack } from '@mui/material';

export function PasswordInput(props: TextFieldProps): JSX.Element {
  const [isVisible, setVisible] = useState(false);

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <TextField type={isVisible ? 'text' : 'password'} {...props} />

      {isVisible ? (
        <VisibilityOffIcon
          onClick={() => setVisible(false)}
          fontSize="large"
          sx={{ color: 'secondary.main' }}
        />
      ) : (
        <VisibilityIcon
          onClick={() => setVisible(true)}
          fontSize="large"
          sx={{ color: 'secondary.main' }}
        />
      )}
    </Stack>
  );
}
