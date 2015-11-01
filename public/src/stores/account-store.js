import EventEmitter from 'events';
import _ from 'lodash';

import AccountApi from 'src/api/account-api';
import AccountDispatcher from 'src/dispatchers/account-dispatcher';
import ActionTypes from 'src/lib/action-types';

const CHANGE_EVENT = 'change';

var _accounts = [];

class Account {

  constructor(attrs) {
    Object.assign(this, attrs);
    this.transactions = this.transactions || [];
  }

}

function _loadAccount(action) {
  AccountApi.get(action.accountId).then((account) => {
    let existing = accountStoreInstance.get(account);

    if (existing) {
      Object.assign(existing, account);
    } else {
      _accounts.push(new Account(account));
    }
  });
}

function _updateTransactionRefs(action) {

  action.transactions.forEach((transaction) => {

    // find account and initialize transactions array:
    let account = accountStoreInstance.get(transaction.account);
    let existing = _.find(account.transactions, transaction);

    // update or create transaction:
    if (existing) {
      Object.assign(existing, transaction);
    } else {
      account.transactions.push(transaction);
    }
  });

}

class AccountStore extends EventEmitter {

  bootstrap() {
    return AccountApi.getAll().then((accounts) => {
      _accounts = accounts.map((account) => new Account(account));
      this.emitChange();
    });
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
    return _accounts;
  }

  get(ref) {
    let id = _.isObject(ref) ? ref.id : ref;
    return _.find(_accounts, { id }) || null;
  }

  getTransactions(ref) {
    return this.get(ref).transactions;
  }

}

let accountStoreInstance = new AccountStore();
accountStoreInstance.setMaxListeners(20);
accountStoreInstance.dispatchToken = AccountDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.SHOW_DETAIL:
      _loadAccount(action);
      accountStoreInstance.emitChange();
      break;

    case ActionTypes.ACCOUNT_LOADED_NEW_TRANSACTIONS:
      _updateTransactionRefs(action);
      accountStoreInstance.emitChange();
      break;

    default:
      // do nothing
  }

});

export default accountStoreInstance;