import React from 'react';

import Exchange from 'src/components/exchange';
import ExchangeStore from 'src/stores/exchange-store';

ExchangeStore.bootstrap();

class App extends React.Component {

  render() {
    return (
      <div id="app">
        <Exchange />
      </div>
    );
  }

}

React.render(
  React.createElement(App, null),
  document.getElementById('app')
);
