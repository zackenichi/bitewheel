'use client';

import React from 'react';
import {
  Grid,
  Button,
  TextField,
  Paper,
  IconButton,
  Autocomplete,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';

const options = [
  { label: 'Pizza Place' },
  { label: 'Burger Joint' },
  { label: 'Sushi Bar' },
  { label: 'Coffee Shop' },
  { label: 'Ice Cream Parlor' },
];

const SearchBar: React.FC = () => {
  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        pb: 2,
        backgroundColor: 'white',
        borderRadius: '10px',
      }}
    >
      <Grid item xs={12} sm={8} md={9}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for food places"
              variant="outlined"
              fullWidth
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {params.InputProps.endAdornment}
                    <IconButton
                      type="button"
                      sx={{ p: '10px' }}
                      aria-label="locate me"
                    >
                      <MyLocationIcon />
                    </IconButton>
                  </>
                ),
              }}
            />
          )}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<SearchIcon />}>
          Find Food
        </Button>
      </Grid>
    </Grid>
  );
};

export { SearchBar };
