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
      'Content-Type': 'application/json',
      "Access-Control-Allow-Origin": "*"
    },
    body: req.method === 'POST' ? JSON.stringify(req.body) : null
  });

  const data = await response.text();

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.setHeader('Date', new Date().toUTCString());
  res.setHeader('Server', 'cloudflare');
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
  res.setHeader('X-Cache', 'Miss from cloudfront');

  // Установка cookie (если требуется)
  res.cookie('__cfseq-0rnh-Yvry', '0lv2Zo3XKd6vViUJPY04tsGLanmWohkZHzBeTYq_OCghPtx98R73qK-M1jQDHum7Nrs', {
    path: '/',
    expires: new Date(Date.now() + 60 * 60 * 1000),
    domain: '.uniswap.org',
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });

  res.cookie('__cf_bm', '.8PwgqW0ehRbuzkM5iN8VntzoEP0dlsEu.pYI0IJZEk-1733924088-1.0.1.1-EKV0j1sGFH9yJglGptF6J401l81PZ6quem0LEOh.eGpkzBzYE0.Fzr5oV6PT0nf_tUWlX.67kJiks3zWsfVCsA', {
    path: '/',
    expires: new Date(Date.now() + 30 * 60 * 1000),
    domain: '.uniswap.org',
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });

  res.setHeader('Content-Type', 'application/json');
  res.send(data);
});


app.listen(3001, () => {
  console.log('Proxy server running on http://localhost:3001');
});


// const express = require('express');
// const request = require('request');
//
// const app = express();
// const API_URL = 'https://apate-backend.com/uniswap/' // Replace this URL with your own
//
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
//
//
// app.post('/proxy', (req, res) => {
//   request(
//     { url: `${API_URL}` },
//     (error, response, body) => {
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: error.message });
//       }
//
//       res.json(JSON.parse(body));
//     }
//   );
// });
//
// const PORT = 3001;
// app.listen(PORT, () => console.log(`listening on ${PORT}`));