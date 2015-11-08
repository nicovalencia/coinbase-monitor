import request from 'request';

let DATA = {};

/**
 * Coinbase returns price data as CSV like:
 * 
 * 2015-06-25T23:55:04-07:00,241.66
 * 2015-06-25T23:45:04-07:00,241.04
 * 2015-06-25T23:35:04-07:00,241.04
 * 
 * DateTime , USD Price per BTC
 * 
 * ...parse will format into entry format:
 *
 * [
 *   {
 *     date: Date,
 *     price Float
 *   }
 * ]
 * 
 */
function parse(body) {

  let prices = body.split('\n');

  return prices.map((price) => {

    let priceData = price.split(',');

    return {
      date: priceData[0],
      price: parseFloat(priceData[1])
    };
  });
}

/**
 * Coinbase returns pages of price data spaced in 10 minute increments:
 */
function getPage(number) {
  return new Promise((resolve, reject) => {

    request.get(`https://coinbase.com/api/v1/prices/historical?page=${number}`, (err, resp) => {

      if (err) reject(err);

      resolve({
        page: number,
        data: parse(resp.body)
      });
    });

  });
}

export default function pricesRoute(req, res, next) {

  if (DATA.length) {

    // Serve from cache:
    return res.json(DATA);

  } else {

    // Get most recent 3 pages of data (roughly 3000 entries or 20 days):
    return Promise.all([
      getPage(1),
      getPage(2),
      getPage(3)
    ]).then((data) => {

      let respData = [];

      // Sort pages by page number (date):
      data.sort((a, b) => {
        return (a.page > b.page) ? -1 : 1;
      });

      // Concat response data together:
      data.forEach((page) => {
        respData = respData.concat(page.data);
      });

      // Cache response:
      DATA = respData;

      return res.json(DATA);

    }).catch(next);

  }

}