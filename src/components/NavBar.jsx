// src/components/NavBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Crypto Exchange
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/market">Market</Button>
        <Button color="inherit" component={Link} to="/portfolio">Portfolio</Button>
        <Button color="inherit" component={Link} to="/trade">Trade</Button>
        <Button color="inherit" component={Link} to="/history">Trade History</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
