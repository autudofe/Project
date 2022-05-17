import { createTheme } from '@mui/material';

const defaultTheme = createTheme({
  palette: {
    primary: {
      light: '#ed4b82',
      main: '#e91e63',
      dark: '#a31545',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
      contrastText: '#000',
    },
  },
});

export default defaultTheme;
