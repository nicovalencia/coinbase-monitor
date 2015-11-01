import reqwest from 'reqwest';

class AccountApi {

  getAll() {
    return reqwest({
      url: '/api/accounts',
      method: 'GET'
    });
  }

  get(id) {
    return reqwest({
      url: `/api/accounts/${id}`,
      method: 'GET'
    });
  }

}

export default new AccountApi();