import reqwest from 'reqwest';

class TransactionApi {

  getByAccount(accountId) {
    return reqwest({
      url: `/api/accounts/${accountId}/transactions`,
      method: 'GET'
    });
  }

}

export default new TransactionApi();