import React from 'react';
import {CircularProgress} from 'material-ui';

import Transactions from 'src/components/transactions';
import AccountStore from 'src/stores/account-store';

function getStateFromStores(props) {
  return {
    account: AccountStore.get(props.params.accountId)
  }
}

class Account extends React.Component {

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

    let details;

    if (this.state.account) {
      details = (
        <div>
          <h2>{this.state.account.name}</h2>
          <Transactions accountId={this.state.account.id} />
        </div>
      );
    } else {
      details = <CircularProgress mode="indeterminate" />;
    }

    return (
      <div>
        {details}
      </div>
    );

  }

  _onChange() {
    this.setState(getStateFromStores(this.props));
  }

}

export default Account;