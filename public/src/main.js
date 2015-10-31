import React from 'react';
import {Tabs, Tab} from 'material-ui';

import Exchange from './components/exchange';
import ExchangeStore from './stores/exchange-store';
import Accounts from './components/accounts';
import AccountStore from 'src/stores/account-store';


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
        <Exchange />
        <Tabs
          tabItemContainerStyle={tabItemContainerStyle}
          value={this.state.activeTab}>
          {tabs}
        </Tabs>
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
