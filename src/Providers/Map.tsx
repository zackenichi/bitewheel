import React from 'react';
import { LoadScript } from '@react-google-maps/api';

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const MapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <LoadScript
    googleMapsApiKey={googleMapsApiKey!}
    loadingElement={<div>Loading...</div>}
    onLoad={() => console.log('Google Maps script loaded')}
    onError={(error) =>
      console.error('Google Maps script failed to load', error)
    }
  >
    {children}
  </LoadScript>
);

export default MapProvider;
