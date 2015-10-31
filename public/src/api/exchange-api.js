import reqwest from 'reqwest';

class ExchangeApi {

  get() {
    return reqwest({
      url: '/exchange',
      method: 'GET'
    }).then((resp) => {
      return JSON.parse(resp).data;
    });
  }

}

export default new ExchangeApi();