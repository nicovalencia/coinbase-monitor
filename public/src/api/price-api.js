import reqwest from 'reqwest';

class PriceApi {

  getAll() {
    return reqwest({
      url: '/api/prices',
      method: 'GET'
    });
  }

}

export default new PriceApi();