import EventEmitter from 'events';

import PriceApi from 'src/api/price-api';

const CHANGE_EVENT = 'change';

var _prices = [];

class PriceStore extends EventEmitter {

  bootstrap() {
    return PriceApi.getAll().then((prices) => {
      _prices = prices;
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
    return _prices;
  }

}

export default new PriceStore();