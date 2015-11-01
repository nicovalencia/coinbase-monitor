import EventEmitter from 'events';
import _ from 'lodash';

import TransactionApi from 'src/api/transaction-api';
import TransactionDispatcher from 'src/dispatchers/transaction-dispatcher';
import AccountActionCreators from 'src/actions/account-action-creators';
import ActionTypes from 'src/lib/action-types'

const CHANGE_EVENT = 'change';

var _transactions = [];

class Transaction {

  constructor(attrs) {
    Object.assign(this, attrs);
  }

}

function _loadByAccount(action) {
  TransactionApi.getByAccount(action.accountId).then((transactions) => {

    transactions.forEach((transaction) => {
      let existing = transactionStoreInstance.get(transaction);

      if (existing) {
        Object.assign(existing, transaction);
      } else {
        _transactions.push(new Transaction(transaction));
      }
    });

    AccountActionCreators.loadedNewTransactions(transactions);

  });
}

class TransactionStore extends EventEmitter {

  bootstrap() {
    
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  getAll() {
    return _transactions;
  }

  get(ref) {
    let id = _.isObject(ref) ? ref.id : ref;
    return _.find(_transactions, { id }) || null;
  }

}

let transactionStoreInstance = new TransactionStore();
transactionStoreInstance.setMaxListeners(20);
transactionStoreInstance.dispatchToken = TransactionDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.TRANSACTION_LOAD_BY_ACCOUNT:
      _loadByAccount(action);
      transactionStoreInstance.emitChange();
      break;

    default:
      // do nothing
  }

});

export default transactionStoreInstance;