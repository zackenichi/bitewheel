import { Grid, Paper } from '@mui/material';
import React, { FC } from 'react';

interface CardProps {
  children: React.ReactNode;
  sx?: {};
}

const StyledCard: FC<CardProps> = ({ children, sx }) => {
  return (
    <Paper
      sx={{
        textAlign: 'left',
        fontWeight: 800,
        padding: 2,
        borderRadius: '8px',
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
};

const CardDivider: FC = () => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        borderBottom: '2px black solid',
        marginTop: '10px',
        marginBottom: '10px',
      }}
    />
  );
};

export { StyledCard, CardDivider };
