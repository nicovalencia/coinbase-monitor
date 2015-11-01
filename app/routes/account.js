import coinbaseAdapter from '../lib/coinbase-adapter';

export default function accountRoute(req, res, next) {
  coinbaseAdapter.getAccount(req.params.account_id, (err, account) => {
    if (err) next(err);
    res.send(account);
  });
}