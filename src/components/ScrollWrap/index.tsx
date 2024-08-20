import { FC } from 'react';
import { PropsWithChildren } from '@/resources/interfaces/propsWithChildren';
import { Box } from '@mui/material';

const ScrollWrap: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      sx={{
        paddingRight: '8px',
        overflowY: 'auto',
        maxHeight: '70vh',
        height: '100%',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#228B22',
          borderRadius: '4px',
          backgroundClip: 'content-box',
          border: '2px solid transparent',
        },
        '&::-webkit-scrollbar-track': {
          //   background: 'linear-gradient(to bottom, #9A3E96, #000000)',
          //   borderRadius: '4px',
        },
      }}
    >
      {children}
    </Box>
  );
};

export default ScrollWrap;
