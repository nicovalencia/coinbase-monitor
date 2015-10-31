import React from 'react';
import {Card, CardHeader, FontIcon, CircularProgress} from 'material-ui';

import AccountStore from 'src/stores/account-store';

function getStateFromStores() {
  return {
    accounts: AccountStore.getAll()
  }
}

class Accounts extends React.Component {

  constructor() {
    super();
    this.state = getStateFromStores();
  }

  componentDidMount() {
    AccountStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {

    let accounts;
    let icons = {
      fiat: 'credit_card',
      vault: 'lock',
      wallet: 'account_balance_wallet'
    };

    if (this.state.accounts.length) {

      accounts = this.state.accounts.map((account) => {

        let icon = <FontIcon className="material-icons">{icons[account.type]}</FontIcon>;

        return (
          <section>
            <Card>
              <CardHeader
                title={account.name}
                avatar={icon}
                subtitle={`${account.balance.amount} ${account.balance.currency}`}>
              </CardHeader>
            </Card>
          </section>
        );
      });

    } else {

      accounts = <CircularProgress mode="indeterminate" />;

    }

    return (
      <div>
        {accounts}
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromStores());
  }

}

export default Accounts;