/* eslint-disable import/prefer-default-export */
import { extendTheme } from '@chakra-ui/react';
// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    button: {
      bg: '#4a577e',
      color: '#fff',
    },
    backgroundApp: {
      bg: '#bcc5e2',
      bgList: '#b6b9cc',
    },
    placeHolder: {
      bg: '#b6b9cc',
      color: '#fff',
    },
  },
});
