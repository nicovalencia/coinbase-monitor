import React from 'react';
import _ from 'lodash';

import ExchangeStore from 'src/stores/exchange-store';

function getStateFromStores() {
  return {
    usd: ExchangeStore.getUSD()
  };
}

class Exchange extends React.Component {

  constructor(props) {
    super();
    this.state = getStateFromStores();
  }

  componentDidMount() {
    ExchangeStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    ExchangeStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {

    return (
      <div id="exchange">
        BTC: ${this.state.usd || 'Loading current price...'}
      </div>
    );

  }

  _onChange() {
    this.setState(getStateFromStores());
  }

}

export default Exchange;