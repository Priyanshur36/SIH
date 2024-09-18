// server.js
const WebSocket = require('ws');
const http = require('http');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received message => ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  // Send exchange rates to client every second
  setInterval(() => {
    const exchangeRates = {
      INR: 1,
      BTC: 5000000,
      ETH: 300000,
      USDT: 75
    };
    ws.send(JSON.stringify(exchangeRates));
  }, 1000);
});

server.listen(8080, () => {
  console.log('WebSocket server is listening on port 8080');
});
