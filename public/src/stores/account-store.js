import EventEmitter from 'events';
import _ from 'lodash';

import AccountApi from 'src/api/account-api';

const CHANGE_EVENT = 'change';

var _accounts = [];

class AccountStore extends EventEmitter {

  bootstrap() {
    return AccountApi.getAll().then((accounts) => {
      _accounts = _accounts.concat(accounts);
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

}

export default new AccountStore();