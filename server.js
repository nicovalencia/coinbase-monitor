import express from 'express';
import coinbaseRequest from './lib/coinbase-request';
import exchangeRoute from './routes/exchange';

let app = express();

app.use(express.static('./public'));
app.get('/exchange', exchangeRoute);

let server = app.listen(3000, () => {
  console.log('Server started on http://localhost:3000...');
});