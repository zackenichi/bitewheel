import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBar from '@/app/components/Search/SearchBar';
import Location from '@/app/components/Location';
// import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center', mt: 4 }}>
      <Box mb={4}>
        <Typography variant="h1">
          Discover Local Dining Spots with a Spin
        </Typography>
      </Box>
      <Box mb={4}>
        <SearchBar />
      </Box>
      <Location />
    </Container>
  );
}
