import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import React, { FC } from 'react';
import { useRouter } from 'next/router';

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

export default function LinearBuffer() {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
}

const EmptyList: FC = () => {
  const handleRefresh = () => {
    const router = useRouter();
    router.replace(router.asPath); // Refresh the page by navigating to the same path
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h3">No restaurants found</Typography>
      <Button variant="contained" sx={{ mt: 2 }} onClick={handleRefresh}>
        Refresh
      </Button>
    </Grid>
  );
};

export { StyledCard, CardDivider, LinearBuffer, EmptyList };
