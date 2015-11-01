import coinbaseAdapter from '../lib/coinbase-adapter';

export default function transactionsRoute(req, res, next) {
  coinbaseAdapter.getAccount(req.params.account_id, (err, account) => {
    
    if (err) next(err);

    account.getTransactions(null, (err, transactions) => {
      if (err) next(err);
      res.send(transactions);
    });

  });
}