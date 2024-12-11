const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/proxy', async (req, res) => {
  const response = await fetch('https://interface.gateway.uniswap.org/v1/graphql', {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      // Скопируйте остальные необходимые заголовки запроса при необходимости
    },
    body: req.method === 'POST' ? JSON.stringify(req.body) : null
  });

  const data = await response.text();
  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});

app.listen(3001, () => {
  console.log('Proxy server running on http://localhost:3001');
});