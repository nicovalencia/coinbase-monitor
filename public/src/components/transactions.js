import React from 'react';
import {List, ListItem, CircularProgress, FlatButton} from 'material-ui';

import AccountStore from 'src/stores/account-store';
import TransactionActionCreators from 'src/actions/transaction-action-creators';

function getStateFromStores(props) {
  return {
    transactions: AccountStore.getTransactions(props.accountId)
  }
}

class Transactions extends React.Component {

  constructor(props) {
    super();
    this.state = getStateFromStores(props);
  }

  componentDidMount() {
    AccountStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this._onChange.bind(this));
  }

  render() {

    let transactions;

    if (this.state.transactions.length) {

      let items = this.state.transactions.map((transaction) => {
        return (
          <ListItem
            primaryText={transaction.type}
            secondaryText={transaction.amount.amount}>
          </ListItem>
        );
      });

      transactions = <List>{items}</List>;

    } else if (this.state.status === 'loading') {

      transactions = <CircularProgress mode="indeterminate" />;

    } else if (this.state.status === 'noTransactions') {

      transactions = <p>No transactions found...</p>

    } else {

      transactions = <FlatButton label="Load Transactions" onClick={this._loadTransactions.bind(this)} />;

    }

    return (
      <div>
        {transactions}
      </div>
    );
  }

  _onChange() {
    this.setState(getStateFromStores(this.props));
  }

  _loadTransactions() {
    this.setState({
      status: 'loading'
    });

    setTimeout(() => {
      if (!this.state.transactions.length) {
        this.setState({
          status: 'noTransactions'
        });
      }
    }, 5000)
    
    TransactionActionCreators.getByAccount(this.props.accountId);
  }

}

export default Transactions;