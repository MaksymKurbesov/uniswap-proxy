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
  res.setHeader('Access-Control-Expose-Headers', 'x-amzn-RequestId,x-amzn-ErrorType,x-amz-user-agent,x-amzn-ErrorMessage,Date,x-amz-schema-version');
  res.setHeader('CF-Cache-Status', 'DYNAMIC');
  res.setHeader('CF-Ray', '8f05dab22e7f03ac-FRA');
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  res.setHeader('Date', new Date().toUTCString());
  res.setHeader('NEL', JSON.stringify({"success_fraction": 0.01, "report_to": "cf-nel", "max_age": 604800}));
  res.setHeader('Report-To', JSON.stringify({
    "endpoints": [{"url": "https://a.nel.cloudflare.com/report/v4?s=example"}],
    "group": "cf-nel",
    "max_age": 604800
  }));
  res.setHeader('Server', 'cloudflare');
  res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains; preload');
  res.setHeader('Via', '1.1 dfefeb7bf78c4bb787739d020c642c14.cloudfront.net (CloudFront), 1.1 e94c77a12a65a84cbcef7856ed7e0fb8.cloudfront.net (CloudFront)');
  res.setHeader('X-Amz-Apigw-Id', 'CoQ27EmjiYcEArg=');
  res.setHeader('X-Amz-Cf-Id', 'Fhy8UEZS0TdxmgYjaYwjyVBTayYM5QzAg4BfhmDAkUckpVKssaZZ2A==');
  res.setHeader('X-Amz-Cf-Pop', 'CMH68-P3');
  res.setHeader('X-Amzn-Appsync-TokensConsumed', '1');
  res.setHeader('X-Amzn-Remapped-Connection', 'keep-alive');
  res.setHeader('X-Amzn-Remapped-Content-Length', '1010');
  res.setHeader('X-Amzn-Remapped-Date', new Date().toUTCString());
  res.setHeader('X-Amzn-RequestId', 'c8533772-7619-4c41-8bba-35ab09b3bcb5');
  res.setHeader('X-Amzn-Trace-Id', 'Root=1-675994f8-2c73b67e4fc3df936955dd86');
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