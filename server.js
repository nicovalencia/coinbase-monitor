import express from 'express';
import exchangeRoute from './app/routes/exchange';
import accountsRoute from './app/routes/accounts';

let app = express();

app.use(express.static('./public'));
app.get('/exchange', exchangeRoute);
app.get('/accounts', accountsRoute);

let server = app.listen(3000, () => {
  console.log('Server started on http://localhost:3000...');
});