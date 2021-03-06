import EventEmitter from 'events';
import _ from 'lodash';

import ExchangeApi from 'src/api/exchange-api';

const CHANGE_EVENT = 'change';

var _prices = {};

class ExchangeStore extends EventEmitter {

  bootstrap() {
    return ExchangeApi.getUSD().then((price) => {
      _prices.USD = price;
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

  getUSD() {
    return _prices.USD;
  }

}

export default new ExchangeStore();