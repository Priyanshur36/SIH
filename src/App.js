import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import CryptoData from './components/CryptoData';
import ExchangeRates from './components/ExchangeRates';
import TradeCrypto from './components/TradeCrypto';
import TradeHistory from './components/TradeHistory';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<CryptoData />} />
          <Route path="/market" element={<ExchangeRates />} />
          <Route path="/portfolio" element={<div>Portfolio Page</div>} />
          <Route path="/trade" element={<TradeCrypto />} />
          <Route path="/history" element={<TradeHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
