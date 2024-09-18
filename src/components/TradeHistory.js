// src/components/TradeHistory.jsx
import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const TradeHistory = () => {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    const storedTrades = JSON.parse(localStorage.getItem('tradeHistory')) || [];
    setTrades(storedTrades);
  }, []);

  return (
    <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
      <Typography variant="h5" style={{ marginBottom: '20px' }}>Trade History</Typography>
      <List>
        {trades.map((trade, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`You got ${trade.getAmount} ${trade.getCurrency} for ${trade.payAmount} ${trade.payCurrency}`}
              secondary={`Date: ${trade.date}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TradeHistory;
