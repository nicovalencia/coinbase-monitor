import React from 'react';
import {render} from 'react-dom'
import {Router, Route, IndexRoute} from 'react-router';
import {Tabs, Tab, Paper} from 'material-ui';

import history from 'src/lib/history';
import AccountActionCreators from 'src/actions/account-action-creators';

import ExchangeStore from './stores/exchange-store';
import AccountStore from 'src/stores/account-store';
import TransactionStore from 'src/stores/transaction-store';

import Exchange from './components/exchange';
import Accounts from './components/accounts';
import Account from './components/account';
import DCACalculator from './components/dca-calculator';
import Footer from './components/footer';

// Boostrap data:
ExchangeStore.bootstrap();
AccountStore.bootstrap();
TransactionStore.bootstrap();

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      activeTab: 'accounts'
    };
  }

  render() {

    let paperStyle = {
      margin: '30px 15px 0',
      padding: '30px'
    };

    let paperStyleMiddle = {
      margin: '30px 15px 0'
    };

    let tabItemContainerStyle = {
      'text-transform': 'capitalize'
    };

    return (
      <div>
        <Paper style={paperStyle}>
          <Exchange />
        </Paper>

        <Paper style={paperStyleMiddle}>

          <Tabs
            tabItemContainerStyle={tabItemContainerStyle}
            value={this.state.activeTab}>

            <Tab label="accounts" onClick={this._handleAccountsClick.bind(this)} value='accounts'>
              {this.props.children}
            </Tab>

            <Tab label="DCA Calculator" onClick={this._handleDCACalculatorClick.bind(this)} value='DCACalculator'>
              {this.props.children}
            </Tab>

          </Tabs>

        </Paper>

        <Paper style={paperStyle}>
          <Footer />
        </Paper>
      </div>
    );
  }

  _handleAccountsClick() {
    AccountActionCreators.showIndex();
    this.setState({
      activeTab: 'accounts'
    })
  }

  _handleDCACalculatorClick() {
    history.pushState({}, '/dca-calculator');
    this.setState({
      activeTab: 'DCACalculator'
    })
  }

}

render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Accounts} />
      <Route path="/accounts/:accountId" component={Account} />
      <Route path="/dca-calculator" component={DCACalculator} />
    </Route>
  </Router>
), document.getElementById('app'));
