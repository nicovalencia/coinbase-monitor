import React from 'react';
import _ from 'lodash';

import DCAChart from 'src/components/dca-chart';
import PriceStore from 'src/stores/price-store';
import dcaCalculator from 'src/lib/dca-calculator';

function getStateFromStores() {

  let prices = PriceStore.getAll();

  return {
    bootstrapped: (prices.length ? true : false),
    prices
  }
}

class DCACalculator extends React.Component {

  constructor() {
    super();

    this.state = Object.assign({
      capital: 100,
      buyCount: 20,
      fee: 0.01,
      targetFrom: 1,
      targetTo: 5,
      days: 7,
      calculations: []
    }, getStateFromStores());

    // Load historical price data if empty:
    if (!this.state.prices.length) {
      PriceStore.bootstrap();
    }
  }

  componentDidMount() {
    PriceStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    PriceStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {


    let calculations = _.map(this.state.calculations, (calculation) => {

      let sellList = _.map(calculation.sells, (sell) => {
        return (
          <li>
            {sell.btcAmount.toFixed(5)} BTC for ${sell.sellAmount.toFixed(2)}
            <span>(${sell.sellFee.toFixed(2)} Fee)</span>
            <span>{sell.percentage.toFixed(2)}%</span>
            <span>Effectiveness: {sell.effectiveness.toFixed(0)}%</span>
          </li>
        );
      });

      return (
        <section>
          <h3>Calculation Summary:</h3>
          <ul>
            <li>Capital: {this.state.capital}</li>
            <li>Target: {calculation.target}%</li>
          </ul>
          <ul>
            <li>
              Targeted Sells: {calculation.sells.length} <ol>{sellList}</ol>
            </li>
            <li>Profit: ${calculation.profit.toFixed(2)} ({calculation.profitPercentage.toFixed(2)}%)</li>
            <li>Fees: ${calculation.totalFees.toFixed(2)}</li>
          </ul>
        </section>
      );
    });

    let status;

    if (!this.state.bootstrapped) {
      status = (<span>Loading price history...</span>);
    }

    return (
      <div>

        <h2>Calculator</h2>

        {status}

        <label>Capital:</label>
        <input onChange={this._handleFormChange.bind(this, 'capital')} value={this.state.capital} />

        <label>Buy Count:</label>
        <input onChange={this._handleFormChange.bind(this, 'buyCount')} value={this.state.buyCount} />

        <label>Target Percentage:</label>
        <span>From:</span>
        <input onChange={this._handleFormChange.bind(this, 'targetFrom')} value={this.state.targetFrom} />
        <span>To:</span>
        <input onChange={this._handleFormChange.bind(this, 'targetTo')} value={this.state.targetTo} />

        <label>Days:</label>
        <input onChange={this._handleFormChange.bind(this, 'days')} value={this.state.days} />

        <button type="button" onClick={this._calc.bind(this)} disabled={!this.state.bootstrapped}>Calculate</button>

        <DCAChart calculations={this.state.calculations} />

        {calculations}

      </div>
    );

  }

  _handleFormChange(attr, event) {
    let state = {};
    state[attr] = Number(event.target.value);
    this.setState(state);
  }

  _calc() {

    let range = _.range(this.state.targetFrom, this.state.targetTo + 1);
    let calculations = [];

    // DCA Calculate for each target % in range:
    range.forEach((target) => {
      let calculation = dcaCalculator({
        capital: this.state.capital,
        buyCount: this.state.buyCount,
        fee: this.state.fee,
        days: this.state.days,
        target
      });
      calculations.push(calculation);
    });

    this.setState({
      calculations
    });
  }

  _onChange() {
    this.setState(getStateFromStores(this.props));
  }

}

export default DCACalculator;