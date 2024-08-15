import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Box mb={4}>
        <Typography variant="h2" gutterBottom>
          Bitewheel
        </Typography>
        <Typography variant="h5">
          Discover Local Dining Spots with a Spin
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        size="large"
        component={Link}
        href="/search"
      >
        Start Searching
      </Button>
    </Container>
  );
}
