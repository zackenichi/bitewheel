'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Location: React.FC = () => {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const fetchLocation = () => {
      if (!navigator.geolocation) {
        setError('Geolocation is not supported by your browser');
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position);
          setLoading(false);
        },
        (error) => {
          setError('Unable to retrieve your location');
          setLoading(false);
        }
      );
    };

    fetchLocation();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!position) {
    return <Typography>No location data available</Typography>;
  }

  const { latitude, longitude } = position.coords;

  return (
    <Container>
      <div style={{ height: '500px', width: '100%' }}>
        <LoadScript googleMapsApiKey={googleMapsApiKey!}>
          <GoogleMap
            mapContainerStyle={{ height: '100%', width: '100%' }}
            center={{ lat: latitude, lng: longitude }}
            zoom={15}
          >
            <Marker position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        </LoadScript>
      </div>
    </Container>
  );
};

export { Location };
