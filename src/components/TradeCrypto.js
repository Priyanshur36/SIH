// src/components/TradeCrypto.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, FormControl, InputAdornment, Select, MenuItem, InputLabel } from '@mui/material';

const TradeCrypto = () => {
  const [cryptoCurrency, setCryptoCurrency] = useState('USDT');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [exchangeRates, setExchangeRates] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const rates = JSON.parse(event.data);
      setExchangeRates(rates);
      calculatePayAmount(cryptoAmount, cryptoCurrency);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleCryptoAmountChange = (e) => {
    const amount = e.target.value;
    setCryptoAmount(amount);
    calculatePayAmount(amount, cryptoCurrency);
  };

  const handleCryptoCurrencyChange = (e) => {
    const currency = e.target.value;
    setCryptoCurrency(currency);
    calculatePayAmount(cryptoAmount, currency);
  };

  const calculatePayAmount = (amount, cryptoCurrency) => {
    if (!amount || !exchangeRates['INR'] || !exchangeRates[cryptoCurrency]) return;

    const rate = exchangeRates[cryptoCurrency] / exchangeRates['INR'];
    const payAmount = (amount * rate).toFixed(2);
    setPayAmount(payAmount);
  };

  const handleTrade = () => {
    const trade = {
      action: 'buy',
      payAmount,
      payCurrency: 'INR',
      cryptoAmount,
      cryptoCurrency,
      date: new Date().toLocaleString()
    };
    setMessage(`You will buy ${cryptoAmount} ${cryptoCurrency} for ${payAmount} INR`);

    const storedTrades = JSON.parse(localStorage.getItem('tradeHistory')) || [];
    storedTrades.push(trade);
    localStorage.setItem('tradeHistory', JSON.stringify(storedTrades));
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>BUY CRYPTOCURRENCY</Typography>
      <FormControl fullWidth style={{ marginBottom: '20px' }}>
        <InputLabel>Cryptocurrency</InputLabel>
        <Select
          value={cryptoCurrency}
          onChange={handleCryptoCurrencyChange}
        >
          <MenuItem value="BTC">BTC</MenuItem>
          <MenuItem value="ETH">ETH</MenuItem>
          <MenuItem value="USDT">USDT</MenuItem>
        </Select>
        <TextField
          label="Amount"
          type="number"
          value={cryptoAmount}
          onChange={handleCryptoAmountChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">{cryptoCurrency}</InputAdornment>,
          }}
          style={{ marginTop: '10px' }}
        />
      </FormControl>
      <Typography variant="body2" style={{ marginBottom: '20px' }}>
        1 {cryptoCurrency} ≈ ₹{exchangeRates[cryptoCurrency] ? (exchangeRates[cryptoCurrency] / exchangeRates['INR']).toFixed(2) : 'N/A'}
      </Typography>
      <TextField
        label="You Pay"
        type="text"
        value={payAmount}
        InputProps={{
          startAdornment: <InputAdornment position="start">INR</InputAdornment>,
          readOnly: true,
        }}
        style={{ marginBottom: '20px' }}
      />
      <Typography variant="body2" style={{ marginBottom: '20px' }}>FEE: 0.1 {cryptoCurrency}</Typography>
      <Button variant="contained" color="primary" onClick={handleTrade}>Proceed</Button>
      {message && <Typography variant="body1" style={{ marginTop: '20px' }}>{message}</Typography>}
    </div>
  );
};

export default TradeCrypto;
