// src/components/TradeHistory.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const TradeHistory = () => {
  const [tradeHistory, setTradeHistory] = useState([]);

  useEffect(() => {
    const storedTrades = JSON.parse(localStorage.getItem('tradeHistory')) || [];
    setTradeHistory(storedTrades);
  }, []);

  return (
    <Container maxWidth="lg" style={{ marginTop: '50px' }}>
      <Typography variant="h4" align="center" gutterBottom>
        Trade History
      </Typography>
      <Paper style={{ marginTop: '20px', padding: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Crypto Amount</TableCell>
              <TableCell>Crypto Currency</TableCell>
              <TableCell>Pay Amount</TableCell>
              <TableCell>Pay Currency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tradeHistory.length > 0 ? (
              tradeHistory.map((trade, index) => (
                <TableRow key={index}>
                  <TableCell>{trade.date}</TableCell>
                  <TableCell>{trade.action}</TableCell>
                  <TableCell>{trade.cryptoAmount}</TableCell>
                  <TableCell>{trade.cryptoCurrency}</TableCell>
                  <TableCell>{trade.payAmount}</TableCell>
                  <TableCell>{trade.payCurrency}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No trade history available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default TradeHistory;
