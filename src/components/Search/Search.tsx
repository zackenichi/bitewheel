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

const SEARCH_ENDPOINT = '/api/autocomplete'; // Updated endpoint
const GEOCODE_ENDPOINT = '/api/geocode'; // Endpoint to get formatted address

interface OptionType {
  place_id: string;
  description: string;
}

const SearchBar: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>(''); // For text input
  const [options, setOptions] = useState<OptionType[]>([]); // For autocomplete options
  const [selectedValue, setSelectedValue] = useState<OptionType | null>(null); // For selected option

  // Function to get current location and set it as input value
  const setCurrentLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Debugging
          try {
            const response = await fetch(
              `${GEOCODE_ENDPOINT}?lat=${latitude}&lng=${longitude}`
            );
            const data = await response.json();
            console.log('Geocode API response:', data); // Debugging
            if (data.formattedAddress) {
              setInputValue(data.formattedAddress);
              setSelectedValue({
                place_id: '',
                description: data.formattedAddress,
              }); // Set selected value
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
    // Set current location when component mounts
    setCurrentLocation();
  }, []);

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
        console.log('Autocomplete API response:', data); // Debugging
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

  const handleOptionChange = (
    event: React.SyntheticEvent,
    value: OptionType | null
  ) => {
    setSelectedValue(value);
    setInputValue(value ? value.description : ''); // Update the text in the search bar with the place name
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
          getOptionLabel={(option) => option.description}
          value={selectedValue} // Use value to manage selected option
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
            option.place_id === value.place_id
          }
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
