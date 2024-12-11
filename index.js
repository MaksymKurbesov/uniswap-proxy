const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());
app.use('/graphql', createProxyMiddleware({
  target: 'https://interface.gateway.uniswap.org',
  changeOrigin: true
}));

app.listen(3001, () => console.log('Proxy running on http://localhost:3001'));