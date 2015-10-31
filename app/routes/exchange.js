import coinbaseAdapter from '../lib/coinbase-adapter';

export default function exchangeRoute(req, res, next) {
  coinbaseAdapter.getBuyPrice({ 'currency': 'USD' }, (err, resp) => {
    if (err) next(err);
    res.send(resp.data.amount);
  });
}