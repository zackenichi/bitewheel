'use client';
import { Noto_Sans } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

// const roboto = Roboto({
//   weight: ['300', '400', '500', '700'],
//   subsets: ['latin'],
//   display: 'swap',
// });
const noto = Noto_Sans({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#228B22', // Deep forest green
    },
    secondary: {
      main: '#3CB371', // Medium sea green
    },
    background: {
      default: '#F5F5DC', // Soft ivory
    },
    text: {
      primary: '#333333', // Dark charcoal
    },
  },
  typography: {
    fontFamily: noto.style.fontFamily,
    h1: {
      fontSize: '32px',
      fontWeight: 500,
    },
    h2: {
      fontSize: '25px',
      fontWeight: 700,
    },
    h3: {
      fontSize: '20px',
      fontWeight: 700,
    },
    h4: {
      fontSize: '25px',
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    // MuiAlert: {
    //   styleOverrides: {
    //     root: ({ ownerState }) => ({
    //       ...(ownerState.severity === 'info' && {
    //         backgroundColor: '#60a5fa',
    //       }),
    //     }),
    //   },
    // },
  },
});

export default theme;
