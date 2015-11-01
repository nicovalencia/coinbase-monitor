import TransactionDispatcher from 'src/dispatchers/transaction-dispatcher';
import ActionTypes from 'src/lib/action-types';

let TransactionActionCreators = {

  getByAccount(accountId) {
    TransactionDispatcher.dispatch({
      type: ActionTypes.TRANSACTION_LOAD_BY_ACCOUNT,
      accountId
    });
  }

}

export default TransactionActionCreators;