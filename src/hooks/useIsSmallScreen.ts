import { useMediaQuery } from '@mui/material';

/**
 * Custom React Hook that checks if the screen size is small.
 *
 * This hook uses the Material-UI's useMediaQuery hook to check if the screen width is less than or equal to 1024px.
 * It returns a boolean value that is true when the screen width is less than or equal to 1024px and false otherwise.
 *
 * @example
 * const isSmallScreen = useIsSmallScreen();
 * if (isSmallScreen) {
 *   // Do something for small screens
 * }
 *
 * @returns {boolean} True if the screen width is less than or equal to 1024px, false otherwise.
 */

export const useIsSmallScreen = () => {
  return useMediaQuery('(max-width: 1024px)');
};
