import React from 'react';
import {Link} from 'react-router';
import {List, ListItem, FontIcon, CircularProgress} from 'material-ui';
import history from 'history';

import Transactions from 'src/components/transactions';
import AccountStore from 'src/stores/account-store';
import AccountActionCreators from 'src/actions/account-action-creators';

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

      let items = this.state.accounts.map((account) => {

        let icon = <FontIcon className="material-icons">{icons[account.type]}</FontIcon>;

        return (
          <ListItem
            primaryText={account.name}
            secondaryText={`${account.balance.amount} ${account.balance.currency}`}
            onClick={this._handleClick.bind(this, account)}
            leftIcon={icon}>
          </ListItem>
        );
      });

      accounts = <List>{items}</List>;

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

  _handleClick(account) {
    AccountActionCreators.showDetail(account.id);
  }

}

export default Accounts;