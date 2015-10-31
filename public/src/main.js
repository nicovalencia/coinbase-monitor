import React from 'react';
import {Tabs, Tab, Paper} from 'material-ui';

import Exchange from './components/exchange';
import ExchangeStore from './stores/exchange-store';
import Accounts from './components/accounts';
import AccountStore from 'src/stores/account-store';
import Footer from './components/footer';

// Boostrap data:
ExchangeStore.bootstrap();
AccountStore.bootstrap();

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

    let tabs = [
      {
        value: 'accounts',
        content: (<Accounts />)
      }, {
        value: 'etc',
        content: (<p>etc...</p>)
      }
    ].map((tab) => {
      return (
        <Tab label={tab.value} onClick={this._handleTabClick.bind(this, tab.value)} value={tab.value}>
          {tab.content}
        </Tab>
      );
    });

    return (
      <div id="app">

        <Paper style={paperStyle}>
          <Exchange />
        </Paper>

        <Paper style={paperStyleMiddle}>
          <Tabs
            tabItemContainerStyle={tabItemContainerStyle}
            value={this.state.activeTab}>
            {tabs}
          </Tabs>
        </Paper>

        <Paper style={paperStyle}>
          <Footer />
        </Paper>

      </div>
    );
  }

  _handleTabClick(tabName) {
    this.setState({
      activeTab: tabName
    })
  }

}

React.render(
  React.createElement(App, null),
  document.getElementById('app')
);
