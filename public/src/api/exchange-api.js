import reqwest from 'reqwest';

class ExchangeApi {

  getUSD() {
    return reqwest({
      url: '/api/exchange',
      method: 'GET'
    });
  }

}

export default new ExchangeApi();