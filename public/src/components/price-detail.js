import React from 'react';
import Colors from 'material-ui/lib/styles/colors';

const TYPE_COLORS_MAP = {
  'sell': Colors.lightGreenA700,
  'vault_withdrawal': Colors.amber500,
  'transfer': Colors.amber500,
  'send': Colors.amber500,
  'buy': Colors.red600
};

class PriceDetail extends React.Component {

  render() {

    let style = {
      color: TYPE_COLORS_MAP[this.props.type]
    };

    let nativeAmount = parseFloat(this.props.nativeAmount.amount);
    let amount = parseFloat(this.props.amount.amount);
    let conversion = (nativeAmount / amount).toFixed(2);

    return (
      <p>
        <span>{this.props.amount.amount} BTC</span>
        <span> @ </span>
        <span style={style}>${conversion}</span>
      </p>
    );

  }

}

export default PriceDetail;