import React from 'react';

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

    let priceStyle = {
      'font-size': '150%',
      'color': '#999999'
    };

    return (
      <div id="exchange">
        <span style={priceStyle}>BTC: ${this.state.usd || 'Loading current price...'}</span>
      </div>
    );

  }

  _onChange() {
    this.setState(getStateFromStores());
  }

}

export default Exchange;