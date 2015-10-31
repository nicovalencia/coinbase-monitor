import coinbaseRequest from '../lib/coinbase-request';

export default function exchangeRate(req, res, next) {
  coinbaseRequest('/exchange-rates?currency=BTC', (err, resp) => {
    if (err) next(err);
    res.send(resp.body);
  });
}