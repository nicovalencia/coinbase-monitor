import React from 'react';
import _ from 'lodash';
import {LineChart} from 'react-d3';

class DCAChart extends React.Component {

  render() {

    // Don't show if no calculations exist:
    if (!this.props.calculations.length) {
      return (
        <span></span>
      );
    }

    var data = [
      {
        name: "results",
        values: this.props.calculations.map((calculation) => {
          return {
            x: calculation.target,
            y: calculation.profit
          };
        })
      }
    ];

    let offset = Math.floor(window.innerWidth / 10);

    let viewBoxObject = {
      x: 0,
      y: 0,
      width: window.innerWidth - offset,
      height: 400
    };

    let margins = {
      top: 50,
      right: offset,
      bottom: 100,
      left: offset
    };

    return (
      <div>

        <LineChart
          data={data}
          width='100%'
          height={400}
          viewBoxObject={viewBoxObject}
          margins={margins}
          yAxisLabel="Profit (USD)"
          xAxisLabel="Sell Target %"
          gridHorizontal={true}
          yAxisLabelOffset={80}
          xAxisLabelOffset={50}
        />
      </div>
    );

  }

}

export default DCAChart;