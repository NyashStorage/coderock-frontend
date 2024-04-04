import { JSX } from 'react';
import type { Preview, StoryContext } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Theme from '../src/utils/constants/theme.constants';

export const withMuiTheme = (Story: JSX.ElementType, _: StoryContext) => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  );
};

export const parameters: Preview = {};
export const decorators = [withMuiTheme];
