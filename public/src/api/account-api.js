import reqwest from 'reqwest';

class AccountApi {

  getAll() {
    return reqwest({
      url: '/accounts',
      method: 'GET'
    });
  }

}

export default new AccountApi();