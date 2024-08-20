import {
  Box,
  Button,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material';
import { FC } from 'react';
import { useIsSmallScreen } from '@hooks/useIsSmallScreen';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@redux/store';
import {
  removeRestaurantFromList,
  setShowRestaurant,
} from '@/redux/restaurant';
import { exclamations } from '@resources/content/winner';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const SelectedRestaurant: FC = () => {
  const isMobile = useIsSmallScreen();
  const dispatch = useDispatch();

  const showRestaurant = useSelector(
    (state: RootState) => state.restaurant.showRestaurant
  );
  const selectedRestaurant = useSelector(
    (state: RootState) => state.restaurant.selectedRestaurant
  );
  const restaurants = useSelector(
    (state: RootState) => state.restaurant.restaurants
  );

  const { name, photo, address, lat, lng } =
    restaurants[selectedRestaurant] || {};

  const handleClose = () => {
    dispatch(setShowRestaurant(false));
  };

  const handleRemove = () => {
    dispatch(removeRestaurantFromList(selectedRestaurant));
    handleClose();
  };

  const getRandomExclamation = () => {
    const randomIndex = Math.floor(Math.random() * exclamations.length);
    return exclamations[randomIndex];
  };

  const handleDirections = () => {
    // const destination = encodeURIComponent(address);
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  };

  const imageSrc = photo
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo}&key=${API_KEY}`
    : 'https://via.placeholder.com/200x200';

  return (
    <Modal open={showRestaurant}>
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: isMobile ? '20%' : '30%',
          left: isMobile ? '0%' : '30%',
          // transform: 'translate(-50%, -50%)',
          width: isMobile ? '100vw' : '40vw',
          bgcolor: '#FFFFFF',
          boxShadow: 24,
          borderRadius: 4,
          p: 4,
          height: isMobile ? 'auto' : 'auto',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <Typography variant="h3">{getRandomExclamation()}</Typography>
          </Grid>
          <Grid item xs={2} textAlign="right">
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h2" sx={{ color: '#980BFF' }}>
              {name || '-'}
            </Typography>
          </Grid>
          {/* might remove this, check with billing if it matters */}
          <Grid item xs={12}>
            <img
              src={imageSrc}
              alt={`placePhoto-${name}`}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="outlined"
              fullWidth
              href={handleDirections()}
              // onClick={handleDirections}
              disabled={!address}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button variant="contained" fullWidth onClick={handleRemove}>
              Remove
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default SelectedRestaurant;
