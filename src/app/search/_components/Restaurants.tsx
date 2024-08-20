import {
  Button,
  Grid,
  IconButton,
  Rating,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { CardDivider, StyledCard } from './ui';
import { Restaurant } from '@/resources/interfaces/restaurant';
import ScrollWrap from './ScrollWrap';
import BackspaceIcon from '@mui/icons-material/Backspace';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeRestaurant,
  setView,
  shuffleRestaurants,
} from '@/redux/restaurant';
import ListIcon from '@mui/icons-material/List';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import { RootState } from '@redux/store';

const RestaurantCard: React.FC<Restaurant> = ({
  id,
  name,
  address,
  rating,
  //   photo,
}) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeRestaurant(id));
  };

  return (
    <StyledCard>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={10}>
          <Typography variant="body1" fontWeight="bold">
            {name}
          </Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <IconButton onClick={handleRemove}>
            <BackspaceIcon />
          </IconButton>
        </Grid>
        <CardDivider />
        <Grid item xs={12}>
          <Rating name="read-only" value={rating} readOnly precision={0.5} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">{address}</Typography>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

const RestaurantControls: React.FC = () => {
  const dispatch = useDispatch();
  const view = useSelector((state: RootState) => state.restaurant.view);

  const handleChangeView = (view: 'simple' | 'details') => {
    dispatch(setView(view));
  };

  const handleShuffle = () => {
    dispatch(shuffleRestaurants());
  };

  return (
    <Stack direction="row-reverse" spacing={2}>
      <Tooltip title="Details">
        <IconButton
          sx={{ background: view === 'details' ? '#3CB371' : 'none' }}
          onClick={() => handleChangeView('details')}
        >
          <DashboardIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Simple">
        <IconButton
          sx={{ background: view === 'simple' ? '#3CB371' : 'none' }}
          onClick={() => handleChangeView('simple')}
        >
          <ListIcon />
        </IconButton>
      </Tooltip>
      <Button
        variant="outlined"
        color="secondary"
        startIcon={<ShuffleIcon />}
        onClick={handleShuffle}
        fullWidth
      >
        Shuffle
      </Button>
    </Stack>
  );
};
interface RestaurantsProps {
  restaurants: Restaurant[];
}

const RestaurantList: React.FC<Restaurant> = ({ name, id }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeRestaurant(id));
  };

  return (
    <StyledCard>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={10}>
          <Typography variant="body2">{name}</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <IconButton onClick={handleRemove}>
            <BackspaceIcon />
          </IconButton>
        </Grid>
      </Grid>
    </StyledCard>
  );
};

const RestaurantSimple: React.FC<RestaurantsProps> = ({ restaurants }) => {
  return (
    <React.Fragment>
      {restaurants.map((restaurant, index) => (
        <Grid item xs={12} key={index}>
          <RestaurantList
            id={restaurant.id}
            name={restaurant.name}
            address=""
          />
        </Grid>
      ))}
    </React.Fragment>
  );
};

const RestaurantDetails: React.FC<RestaurantsProps> = ({ restaurants }) => {
  return (
    <React.Fragment>
      {restaurants.map((restaurant, index) => (
        <Grid item xs={12} key={index}>
          <RestaurantCard
            id={restaurant.id}
            name={restaurant.name}
            address={restaurant.address}
            rating={restaurant.rating}
            //   photo={restaurant.photo}
          />
        </Grid>
      ))}
    </React.Fragment>
  );
};

const Restaurants: React.FC<RestaurantsProps> = ({ restaurants }) => {
  const view = useSelector((state: RootState) => state.restaurant.view);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <RestaurantControls />
      </Grid>
      <Grid item xs={12}>
        <ScrollWrap>
          <Grid container spacing={2}>
            {view === 'simple' ? (
              <RestaurantSimple restaurants={restaurants} />
            ) : (
              <RestaurantDetails restaurants={restaurants} />
            )}
          </Grid>
        </ScrollWrap>
      </Grid>
    </Grid>
  );
};

export default Restaurants;
