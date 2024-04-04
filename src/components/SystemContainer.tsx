import type { JSX, PropsWithChildren } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import Theme, { GLOBAL_STYLES } from '../utils/constants/theme.constants';
import { GlobalStyles } from '@mui/material';

export default function SystemContainer({
  children,
}: PropsWithChildren): JSX.Element {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles styles={GLOBAL_STYLES} />

      {children}
    </ThemeProvider>
  );
}
