import React from 'react';
import _ from 'lodash';

import ExchangeStore from 'src/stores/exchange-store';

function getStateFromStores() {
  return {
    data: ExchangeStore.get()
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

    let data;

    if (this.state.data.currency) {
      data = (
        <div>
          <span>{this.state.data.currency}</span>:&nbsp;
          <span>{this.state.data.rates.USD}</span>
        </div>
      );
    } else {
      data = 'Loading exchange data...';
    }

    return (
      <div id="exchange">
        {data}
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

}

export default Exchange;