import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, FormControl, InputAdornment, Select, MenuItem, InputLabel, Tabs, Tab, Box } from '@mui/material';

const TradeCrypto = () => {
  const [cryptoCurrency, setCryptoCurrency] = useState('USDT');
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [swapCurrency, setSwapCurrency] = useState('BTC'); // For swapping
  const [swapAmount, setSwapAmount] = useState(''); // Amount of currency to receive in Swap
  const [exchangeRates, setExchangeRates] = useState({ 'USDT': 88, 'BTC': 44000, 'ETH': 3000, 'INR': 1 }); // Default rates
  const [message, setMessage] = useState('');
  const [tab, setTab] = useState(0); // 0 for Swap, 1 for Buy, 2 for Sell

  // Simulate fetching exchange rates from WebSocket or API
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080');

    ws.onmessage = (event) => {
      const rates = JSON.parse(event.data);
      setExchangeRates(rates);
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleCryptoAmountChange = (e) => {
    const amount = e.target.value;
    setCryptoAmount(amount);
    if (tab === 0) {
      calculateSwapAmount(amount, cryptoCurrency, swapCurrency);
    } else {
      calculatePayAmount(amount, cryptoCurrency);
    }
  };

  const handleCryptoCurrencyChange = (e) => {
    const currency = e.target.value;
    setCryptoCurrency(currency);
    if (tab === 0) {
      calculateSwapAmount(cryptoAmount, currency, swapCurrency);
    } else {
      calculatePayAmount(cryptoAmount, currency);
    }
  };

  const handleSwapCurrencyChange = (e) => {
    const currency = e.target.value;
    setSwapCurrency(currency);
    calculateSwapAmount(cryptoAmount, cryptoCurrency, currency);
  };

  const calculatePayAmount = (amount, cryptoCurrency) => {
    if (!amount || !exchangeRates['INR'] || !exchangeRates[cryptoCurrency]) {
      setPayAmount('');
      return;
    }

    const rate = exchangeRates[cryptoCurrency] / exchangeRates['INR'];
    const calculatedPayAmount = (amount * rate).toFixed(2);
    setPayAmount(calculatedPayAmount);
  };

  const calculateSwapAmount = (amount, fromCurrency, toCurrency) => {
    if (!amount || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setSwapAmount('');
      return;
    }

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    const calculatedSwapAmount = ((amount * fromRate) / toRate).toFixed(6); // Keep 6 decimal places for crypto precision
    setSwapAmount(calculatedSwapAmount);
  };

  const handleTrade = () => {
    const tradeType = tab === 1 ? 'buy' : tab === 2 ? 'sell' : 'swap';
    let messageContent = '';

    if (tradeType === 'swap') {
      messageContent = `You will swap ${cryptoAmount} ${cryptoCurrency} for ${swapAmount} ${swapCurrency}.`;
    } else {
      messageContent = `You will ${tradeType} ${cryptoAmount} ${cryptoCurrency} for ₹${payAmount} INR.`;
    }

    // Display message
    setMessage(messageContent);

    // Store trade history in localStorage
    const storedTrades = JSON.parse(localStorage.getItem('tradeHistory')) || [];
    const trade = {
      action: tradeType,
      payAmount,
      payCurrency: 'INR',
      cryptoAmount,
      cryptoCurrency,
      swapAmount,
      swapCurrency,
      date: new Date().toLocaleString(),
    };
    storedTrades.push(trade);
    localStorage.setItem('tradeHistory', JSON.stringify(storedTrades));
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Crypto Exchange</Typography>
  
      {/* Tabs for Swap / Buy / Sell */}
      <Tabs value={tab} onChange={handleTabChange} aria-label="crypto trade tabs">
        <Tab label="Swap" />
        <Tab label="Buy" />
        <Tab label="Sell" />
      </Tabs>
  
      {/* Swap / Buy / Sell Form */}
      {tab === 0 && (
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Select Cryptocurrency</InputLabel>
          <Select value={cryptoCurrency} onChange={handleCryptoCurrencyChange}>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="USDT">USDT</MenuItem>
          </Select>
  
          <TextField
            label="You Swap"
            type="number"
            value={cryptoAmount}
            onChange={handleCryptoAmountChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">{cryptoCurrency}</InputAdornment>,
            }}
            style={{ marginTop: '10px' }}
          />
  
          <InputLabel style={{ marginTop: '10px' }}>Swap to</InputLabel>
          <Select value={swapCurrency} onChange={handleSwapCurrencyChange}>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="USDT">USDT</MenuItem>
          </Select>
  
          <TextField
            label="You Receive"
            type="text"
            value={swapAmount}
            InputProps={{
              startAdornment: <InputAdornment position="start">{swapCurrency}</InputAdornment>,
              readOnly: true,
            }}
            style={{ marginTop: '10px' }}
          />
        </FormControl>
      )}
  
      {tab === 1 && (
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Select Cryptocurrency</InputLabel>
          <Select value={cryptoCurrency} onChange={handleCryptoCurrencyChange}>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="USDT">USDT</MenuItem>
          </Select>
  
          <TextField
            label="You Send"
            type="number"
            value={cryptoAmount}
            onChange={handleCryptoAmountChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">{cryptoCurrency}</InputAdornment>,
            }}
            style={{ marginTop: '10px' }}
          />
  
          <Typography variant="body2" style={{ marginBottom: '20px' }}>
            Exchange Rate: 1 {cryptoCurrency} ≈ ₹{
              exchangeRates[cryptoCurrency] ? (exchangeRates[cryptoCurrency] / exchangeRates['INR']).toFixed(2) : 'N/A'
            }
          </Typography>
  
          <TextField
            label="You Get (INR)"
            value={payAmount}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              readOnly: true,
            }}
            style={{ marginBottom: '20px' }}
          />
        </FormControl>
      )}
  
      {tab === 2 && (
        <FormControl fullWidth style={{ marginBottom: '20px' }}>
          <InputLabel>Select Cryptocurrency</InputLabel>
          <Select value={cryptoCurrency} onChange={handleCryptoCurrencyChange}>
            <MenuItem value="BTC">BTC</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="USDT">USDT</MenuItem>
          </Select>
  
          <TextField
            label="You Receive"
            type="number"
            value={cryptoAmount}
            onChange={handleCryptoAmountChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">{cryptoCurrency}</InputAdornment>,
            }}
            style={{ marginTop: '10px' }}
          />
  
          <Typography variant="body2" style={{ marginBottom: '20px' }}>
            Exchange Rate: 1 {cryptoCurrency} ≈ ₹{
              exchangeRates[cryptoCurrency] ? (exchangeRates[cryptoCurrency] / exchangeRates['INR']).toFixed(2) : 'N/A'
            }
          </Typography>
  
          <TextField
            label="You Pay (INR)"
            value={payAmount}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              readOnly: true,
            }}
            style={{ marginBottom: '20px' }}
          />
        </FormControl>
      )}
  
      {/* Display Message */}
      <Typography variant="h6" style={{ marginTop: '20px', color: 'green' }}>
        {message}
      </Typography>
  
      {/* Submit Button */}
      <Button variant="contained" color="primary" onClick={handleTrade}>
        Submit
      </Button>
    </div>
  );
}
export default TradeCrypto;