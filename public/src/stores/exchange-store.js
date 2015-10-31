import EventEmitter from 'events';
import _ from 'lodash';

import ExchangeApi from 'src/api/exchange-api';

const CHANGE_EVENT = 'change';

var _data = {};

class ExchangeStore extends EventEmitter {

  bootstrap() {
    return ExchangeApi.get().then((data) => {
      _data = data;
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

  get() {
    return _data;
  }

}

export default new ExchangeStore();