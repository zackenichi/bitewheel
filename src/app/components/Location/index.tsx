'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const Location: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const selectedPlace = useSelector(
    (state: RootState) => state.map.selectedPlace
  );

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: googleMapsApiKey!,
  });

  if (!isLoaded) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!selectedPlace) {
    return <Typography>No place selected</Typography>;
  }

  const { lat, lng } = selectedPlace;

  return (
    <Container>
      <div style={{ height: '500px', width: '100%' }}>
        <GoogleMap
          mapContainerStyle={{ height: '100%', width: '100%' }}
          center={{ lat, lng }}
          zoom={15}
        >
          <Marker position={{ lat, lng }} />
        </GoogleMap>
      </div>
    </Container>
  );
};

export default Location;
