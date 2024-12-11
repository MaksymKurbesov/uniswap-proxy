const express = require('express');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/proxy', async (req, res) => {
  const response = await fetch('https://interface.gateway.uniswap.org/v1/graphql', {
    method: req.method,
    headers: {
      'Content-Type': 'application/json'
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