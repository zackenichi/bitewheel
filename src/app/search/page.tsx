import React from 'react';

import { Button, Container, Grid, TextField } from '@mui/material';

export default function SearchPage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <TextField fullWidth label="Search..." />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="outlined" color="secondary">
            My Location
          </Button>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="contained" color="primary">
            Search
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
