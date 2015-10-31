import coinbaseAdapter from '../lib/coinbase-adapter';

export default function accountsRoute(req, res, next) {
  coinbaseAdapter.getAccounts({}, (err, accounts) => {
    if (err) next(err);
    res.send(accounts);
  });
}