const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Включаем CORS
app.use(cors({
  origin: '*', // Или укажите конкретный домен, если нужно
  methods: 'GET, POST, OPTIONS',
  allowedHeaders: 'Content-Type, Authorization'
}));

// Обработка OPTIONS-запросов (Preflight)
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', '*'); // Или укажите домен, если нужно
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send();
});

// Прокси для запросов к Uniswap
app.use('/graphql', createProxyMiddleware({
  target: 'https://interface.gateway.uniswap.org',
  changeOrigin: true
}));

// Запуск сервера
app.listen(3001, () => console.log('Proxy running on http://localhost:3001'));