import { Button, Container, Grid } from '@mui/material';
import { FC, useState } from 'react';
import { Wheel } from 'react-custom-roulette';
import { useSelector, useDispatch } from 'react-redux';

// import { setNewWinner, setShowWinner } from '../../features/winner';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { RootState } from '@/store';
// import { removeEmptyEntries } from '../../features/entry';
import confetti from 'canvas-confetti';
import { setSelectedRestaurant, setShowRestaurant } from '@/store/restaurant';

const truncateString = (str: string, num: number) => {
  if (str.length <= num) {
    return str;
  }
  return str.slice(0, num) + '...';
};

const Roulette: FC = () => {
  const dispatch = useDispatch();
  //   const entries = useSelector((state: RootState) => state.entry.entries);\
  const restaurants = useSelector(
    (state: RootState) => state.restaurant.restaurants
  );
  const selectedRestaurant = useSelector(
    (state: RootState) => state.restaurant.selectedRestaurant
  );

  const [mustSpin, setMustSpin] = useState(false);
  // index of entry that wins the spin

  // Color scheme
  const colors = ['#250F47', '#FF035D', '#FF7F6C', '#980BFF'];

  const formattedData = restaurants.map((restaurant, index) => ({
    option: truncateString(restaurant.name, 16), // Truncate the restaurant name to 20 characters
    style: {
      backgroundColor: colors[index % colors.length], // Distribute colors
      textColor: '#ffffff',
    }, // Optional styling
  }));

  const handleSpin = () => {
    if (!mustSpin) {
      const newPrizeNumber = Math.floor(Math.random() * restaurants.length);

      dispatch(setSelectedRestaurant(newPrizeNumber));
      setMustSpin(true);
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    handleConfetti();
    dispatch(setShowRestaurant(true));
  };

  const handleConfetti = () => {
    const end = Date.now() + 2 * 1000; // Run for 2 seconds

    // Random confetti particle creation function
    const colors = ['#250F47', '#FF035D', '#FF7F6C', '#980BFF'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: Math.random() },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: Math.random() },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return (
    <Container maxWidth="lg">
      <Grid container alignItems="center" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Wheel
              mustStartSpinning={mustSpin}
              prizeNumber={selectedRestaurant}
              data={formattedData}
              backgroundColors={['#3e3e3e', '#df3428']}
              textColors={['#ffffff']}
              onStopSpinning={handleStopSpinning}
              fontSize={18}
            />
          </div>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            onClick={handleSpin}
            variant="contained"
            color="secondary"
            startIcon={<PlayArrowRoundedIcon />}
            sx={{
              padding: '10px 20px',
            }}
            disabled={mustSpin || restaurants.length < 2}
          >
            Spin the wheel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Roulette;
