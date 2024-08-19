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
      fontSize: '1.5rem', // 24px
      fontWeight: 500,
      '@media (min-width:600px)': {
        fontSize: '1.75rem', // 28px
      },
      '@media (min-width:960px)': {
        fontSize: '2rem', // 32px
      },
    },
    h2: {
      fontSize: '1.25rem', // 20px
      fontWeight: 700,
      '@media (min-width:600px)': {
        fontSize: '1.5rem', // 24px
      },
      '@media (min-width:960px)': {
        fontSize: '1.75rem', // 28px
      },
    },
    h3: {
      fontSize: '1.125rem', // 18px
      fontWeight: 500,
      '@media (min-width:600px)': {
        fontSize: '1.25rem', // 20px
      },
      '@media (min-width:960px)': {
        fontSize: '1.5rem', // 24px
      },
    },
    h4: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      '@media (min-width:600px)': {
        fontSize: '1.125rem', // 18px
      },
      '@media (min-width:960px)': {
        fontSize: '1.25rem', // 20px
      },
    },
    body1: {
      fontSize: '0.875rem', // 14px
      '@media (min-width:600px)': {
        fontSize: '1rem', // 16px
      },
      '@media (min-width:960px)': {
        fontSize: '1.125rem', // 18px
      },
    },
    body2: {
      fontSize: '0.75rem', // 12px
      '@media (min-width:600px)': {
        fontSize: '0.875rem', // 14px
      },
      '@media (min-width:960px)': {
        fontSize: '1rem', // 16px
      },
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
