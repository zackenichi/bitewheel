'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Typography } from '@mui/material';
import { SearchBar } from '@/components/Search';
import { Restaurants } from '@/components/Restaurants';
import { setRestaurants } from '@/store/restaurant';
import { RootState } from '@/store';
import { Restaurant } from '@/resources/interfaces/restaurant';

// Define the interface for the API response

export default function SearchPage() {
  const dispatch = useDispatch();
  const restaurants = useSelector(
    (state: RootState) => state.restaurant.restaurants
  );

  const selectedPlace = useSelector(
    (state: RootState) => state.map.selectedPlace
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRestaurants() {
      setLoading(true);

      try {
        const response = await fetch(
          `/api/restaurants?lat=${selectedPlace?.lat}&lng=${selectedPlace?.lng}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: any = await response.json();

        // Dispatch the transformed data to Redux
        dispatch(setRestaurants(data));
      } catch (error) {
        setError('Failed to fetch restaurants');
        console.error('Failed to fetch restaurants', error);
      } finally {
        setLoading(false);
      }
    }

    if (selectedPlace?.lat && selectedPlace?.lng) {
      fetchRestaurants();
    }
  }, [selectedPlace, selectedPlace?.lat, selectedPlace?.lng, dispatch]);

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 4 }}>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12}>
          <SearchBar />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">Roulette</Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : (
            <Restaurants restaurants={restaurants} />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
