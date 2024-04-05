import type { ThemeOptions } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import type { GlobalStylesProps } from '@mui/material/GlobalStyles/GlobalStyles';

export const GLOBAL_STYLES: GlobalStylesProps['styles'] = {
  '::-webkit-scrollbar': {
    width: 'calc(.5vw + .5vh)',
  },

  '::-webkit-scrollbar-track': {
    background: '#4B4647',
  },

  '::-webkit-scrollbar-thumb': {
    background: '#C0B128',
    borderRadius: '50%',
  },
};

const baseTheme: ThemeOptions = {
  palette: {
    primary: {
      main: '#000',
      light: '#000',
      contrastText: '#FFF',
    },
    secondary: {
      main: '#C0B128',
      light: '#FDFD3A',
      contrastText: '#FFF',
    },
    text: {
      primary: '#FFF',
      secondary: '#000',
    },
  },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: `${theme.palette.secondary.main} !important`,
          borderRadius: '20px !important',

          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${theme.palette.secondary.main} !important`,
            borderWidth: '2px !important',
          },
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme }) => ({
          borderColor: theme.palette.secondary.main,
        }),
      },
    },
  },
};

export default createTheme(baseTheme);
