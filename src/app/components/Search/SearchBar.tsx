'use client';
import React, { useState, useCallback, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  IconButton,
  Grid,
  Button,
} from '@mui/material';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlace } from '@/redux/map'; // Import the action
import _debounce from 'lodash/debounce';
import { RootState } from '@redux/store'; // Import RootState type
import Link from 'next/link';

const SEARCH_ENDPOINT = '/api/autocomplete'; // Updated endpoint
const GEOCODE_ENDPOINT = '/api/geocode'; // Endpoint to get formatted address

interface OptionType {
  place_id: string;
  description: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(''); // For text input
  const [options, setOptions] = useState<OptionType[]>([]); // For autocomplete options
  const [selectedValue, setSelectedValue] = useState<OptionType | null>(null); // For selected option
  const [open, setOpen] = useState<boolean>(false); // State to manage dropdown open/close
  const dispatch = useDispatch(); // Initialize dispatch
  const selectedPlace = useSelector(
    (state: RootState) => state.map.selectedPlace
  ); // Access selectedPlace from Redux state

  // Function to get current location and set it as input value
  const setCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          console.log('Current location:', latitude, longitude);

          try {
            const response = await fetch(
              `${GEOCODE_ENDPOINT}?lat=${latitude}&lng=${longitude}`
            );
            const data = await response.json();

            if (data.formattedAddress) {
              setInputValue(data.formattedAddress);
              setSelectedValue({
                place_id: '', // If you have a place_id from the API, use it here
                description: data.formattedAddress,
                geometry: {
                  location: {
                    lat: latitude,
                    lng: longitude,
                  },
                },
              }); // Set selected value
              dispatch(
                setSelectedPlace({
                  lat: latitude,
                  lng: longitude,
                  name: data.formattedAddress,
                })
              ); // Update Redux state
            } else {
              console.error('No formatted address found in response');
            }
          } catch (error) {
            console.error('Error fetching address from coordinates', error);
          }
        },
        (error) => {
          console.error('Error getting geolocation', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser');
    }
  };

  useEffect(() => {
    // If no selectedPlace in Redux state, set the current location
    if (!selectedPlace) {
      setCurrentLocation();
    } else {
      // If selectedPlace is available, set it in the component state
      setInputValue(selectedPlace.name);
      setSelectedValue({
        place_id: '', // If you have a place_id, use it here
        description: selectedPlace.name,
        geometry: {
          location: {
            lat: selectedPlace.lat,
            lng: selectedPlace.lng,
          },
        },
      });
    }
  }, [selectedPlace]); // Add selectedPlace as a dependency

  const handleInputChange = useCallback(
    async (event: React.ChangeEvent<{}>, value: string) => {
      setInputValue(value);
      if (!value) {
        setOptions([]);
        return;
      }

      try {
        const response = await fetch(`${SEARCH_ENDPOINT}?input=${value}`);
        const data = await response.json();

        if (data.predictions) {
          setOptions(data.predictions); // Ensure your API returns predictions in this format
        } else {
          setOptions([]);
        }
      } catch (error) {
        console.error(error);
        setOptions([]);
      }
    },
    []
  );

  const handleOptionChange = async (
    event: React.SyntheticEvent,
    value: OptionType | null
  ) => {
    if (value) {
      setInputValue(value.description);
      setSelectedValue(value);

      // Fetch detailed place information using place_id
      const response = await fetch(
        `/api/placeDetails?placeId=${value.place_id}`
      );
      const placeDetails = await response.json();

      if (placeDetails.geometry) {
        dispatch(
          setSelectedPlace({
            lat: placeDetails.geometry.location.lat,
            lng: placeDetails.geometry.location.lng,
            name: value.description,
          })
        );
      } else {
        console.error('Failed to fetch geometry data');
      }
    }
  };

  return (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{ pb: 2, backgroundColor: 'white', borderRadius: '10px' }}
    >
      <Grid item xs={12} sm={8} md={9}>
        <Autocomplete
          options={options}
          getOptionLabel={(option) => option.description || ''} // Ensure a string is returned
          value={selectedValue || null} // Handle value for the dropdown
          open={open} // Control whether the dropdown is open
          onOpen={() => setOpen(true)} // Set open to true when dropdown opens
          onClose={() => setOpen(false)} // Set open to false when dropdown closes
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
                      onClick={setCurrentLocation}
                    >
                      <MyLocationIcon />
                    </IconButton>
                  </>
                ),
              }}
            />
          )}
          inputValue={inputValue} // Maintain inputValue state
          onInputChange={handleInputChange}
          onChange={handleOptionChange}
          isOptionEqualToValue={(option, value) =>
            value !== null &&
            value !== undefined &&
            option.place_id === value.place_id
          }
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SearchIcon />}
          LinkComponent={Link}
          href="search"
        >
          Find Food
        </Button>
      </Grid>
    </Grid>
  );
};

export default SearchBar;
