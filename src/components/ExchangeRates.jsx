// src/components/ExchangeRates.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ExchangeRates = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const result = await axios('https://api.coingecko.com/api/v3/exchange_rates');
        setRates(Object.values(result.data.rates));
      } catch (error) {
        console.error('Error fetching exchange rates', error);
      }
    };

    fetchRates();
  }, []);

  return (
    <Grid container spacing={3}>
      {rates.length > 0 ? (
        rates.map((rate) => (
          <Grid item xs={12} sm={6} md={4} key={rate.name}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {rate.name.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rate.unit}: {rate.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography variant="h6" component="div">
          Loading...
        </Typography>
      )}
    </Grid>
  );
};

export default ExchangeRates;
