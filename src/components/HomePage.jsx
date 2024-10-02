// src/components/HomePage.jsx
import React from 'react';
import { Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Crypto Exchange
      </Typography>
      <Typography variant="h6" align="center" color="textSecondary" paragraph>
        Buy, sell, and trade cryptocurrencies with ease.
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Market
              </Typography>
              <Typography variant="body2" color="textSecondary">
                View real-time market data and trends.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/market" style={{ marginTop: '10px' }}>
                Go to Market
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Trade
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Buy and sell cryptocurrencies.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/trade" style={{ marginTop: '10px' }}>
                Start Trading
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Portfolio
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Manage your cryptocurrency portfolio.
              </Typography>
              <Button variant="contained" color="primary" component={Link} to="/portfolio" style={{ marginTop: '10px' }}>
                View Portfolio
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
