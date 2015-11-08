import express from 'express';
import exchangeRoute from './app/routes/exchange';
import accountsRoute from './app/routes/accounts';
import accountRoute from './app/routes/account';
import transactionsRoute from './app/routes/transactions';
import pricesRoute from './app/routes/prices';

let app = express();
let apiRouter = express.Router();

apiRouter.get('/exchange', exchangeRoute);
apiRouter.get('/accounts', accountsRoute);
apiRouter.get('/accounts/:account_id', accountRoute);
apiRouter.get('/accounts/:account_id/transactions', transactionsRoute);
apiRouter.get('/prices', pricesRoute);
app.use('/api', apiRouter);

app.use(express.static('./public'));
app.get('/*', (req, res) => {
  res.redirect('/');
});

let server = app.listen(3000, () => {
  console.log('Server started on http://localhost:3000...');
});