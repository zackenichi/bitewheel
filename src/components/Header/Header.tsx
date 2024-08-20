import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import React from 'react';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h2"
          component={Link}
          href="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Bitewheel
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
