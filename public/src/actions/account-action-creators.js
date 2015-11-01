import AccountDispatcher from 'src/dispatchers/account-dispatcher';
import ActionTypes from 'src/lib/action-types';
import history from 'src/lib/history';

let AccountActionCreators = {

  showIndex() {
    history.pushState({}, '/');
    AccountDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_SHOW_INDEX
    });
  },

  showDetail(accountId) {
    history.pushState({ accountId }, `/accounts/${accountId}`);
    AccountDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_SHOW_DETAIL,
      accountId
    });
  },

  loadedNewTransactions(transactions) {
    AccountDispatcher.dispatch({
      type: ActionTypes.ACCOUNT_LOADED_NEW_TRANSACTIONS,
      transactions
    });
  }

}

export default AccountActionCreators;