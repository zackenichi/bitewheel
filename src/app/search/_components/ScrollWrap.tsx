import { FC } from 'react';
import { PropsWithChildren } from '@/resources/interfaces/propsWithChildren';
import { Box } from '@mui/material';
import { scrollWrapStyle } from './styles';

const ScrollWrap: FC<PropsWithChildren> = ({ children }) => {
  return <Box sx={scrollWrapStyle}>{children}</Box>;
};

export default ScrollWrap;
