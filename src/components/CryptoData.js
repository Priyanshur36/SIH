// src/components/CryptoData.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const CryptoData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 10,
            page: 1,
            sparkline: false,
          },
        });
        setData(result.data);
      } catch (error) {
        console.error('Error fetching the data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={3}>
      {data.length > 0 ? (
        data.map((coin) => (
          <Grid item xs={12} sm={6} md={4} key={coin.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {coin.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {coin.current_price} USD
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

export default CryptoData;
