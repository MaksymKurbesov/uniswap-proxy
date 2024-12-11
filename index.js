// const express = require('express');
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const cors = require('cors');
//
// const app = express();
// app.use(express.json());
// app.use(cors());
//
// app.use('/proxy', async (req, res) => {
//   const response = await fetch('https://interface.gateway.uniswap.org/v1/graphql', {
//     method: req.method,
//     headers: {
//       'Content-Type': 'application/json',
//       "Access-Control-Allow-Origin": "*"
//     },
//     body: req.method === 'POST' ? JSON.stringify(req.body) : null
//   });
//
//   const data = await response.text();
//   res.setHeader('Content-Type', 'application/json');
//   res.send(data);
// });
//
// app.use('/proxy2', async (req, res) => {
//   const response = await fetch('https://interface.gateway.uniswap.org/v1/statsig-proxy/rgstr', {
//     method: req.method,
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: req.method === 'POST' ? JSON.stringify(req.body) : null
//   });
//
//   const data = await response.text();
//   res.setHeader('Content-Type', 'application/json');
//   res.send(data);
// });
//
// app.listen(3001, () => {
//   console.log('Proxy server running on http://localhost:3001');
// });


const express = require('express');
const request = require('request');

const app = express();
const API_URL = 'https://apate-backend.com/uniswap/' // Replace this URL with your own

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// app.get('/proxy', (req, res) => {
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

app.post('/proxy', (req, res) => {
  request(
    { url: `${API_URL}` },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: error.message });
      }

      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));