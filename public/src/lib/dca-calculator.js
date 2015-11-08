import mockData from 'src/lib/mock-data';
import _ from 'lodash';

export default function dcaCalculator(opts) {

  let {capital, buyCount, target, fee} = opts;

  let buyAmount = capital / buyCount;

  let btc = 0;    // number of bitcoin owned
  let spent = 0;  // number of USD spent
  let vault = 0;  // number of USD owned
  let buys = [];
  let sells = [];

  function getPrice(i) {
    return mockData[Math.floor(mockData.length / buyCount * i)];
  }

  function getPercentage(btcPrice) {
    let currentValue = (btcPrice * btc);
    let percentage = (currentValue - spent) / spent * 100;
    return percentage;
  }

  function sell(btcPrice) {

    let btcAmount = btc;
    let sellFee = btcPrice * btc * fee;
    let sellAmount = btcPrice * btc - sellFee;
    let percentage = getPercentage(btcPrice);
    let effectiveness = (spent / capital) * 100;

    // sell:
    btc = 0;
    spent = 0;
    vault += sellAmount;

    sells.push({
      btcPrice,
      sellFee,
      sellAmount,
      percentage,
      btcAmount,
      effectiveness
    });

  }

  // walk through each buy, adding a buy record and selling if
  // the target percentage yeild is reached:
  _.times(buyCount, (i) => {

    let btcPrice = getPrice(i);
    let buyFee = fee * buyAmount;
    let btcAmount = (buyAmount - buyFee) / btcPrice;

    // buy:
    btc += btcAmount;
    spent += buyAmount;
    buys.push({
      btcPrice,
      buyFee,
      buyAmount,
      btcAmount
    });

    // if return target is reached, sell btc:
    if (getPercentage(btcPrice) > target) {
      sell(btcPrice);
    }

  });

  // final account value sell:
  let finalPrice = getPrice(buyCount - 1);
  sell(finalPrice);

  // calculate profit and fees:
  let profit = vault - capital;
  let profitPercentage = (profit / capital) * 100;
  let totalFees = _.sum(sells, 'sellFee') + _.sum(buys, 'buyFee');

  return {
    profit,
    sells,
    buys,
    totalFees,
    profitPercentage,
    target
  };

}