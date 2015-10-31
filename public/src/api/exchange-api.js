import reqwest from 'reqwest';

class ExchangeApi {

  getUSD() {
    return reqwest({
      url: '/exchange',
      method: 'GET'
    });
  }

}

export default new ExchangeApi();