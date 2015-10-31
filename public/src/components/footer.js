import React from 'react';

class Footer extends React.Component {

  render() {

    let style = {
      'color': '#999999'
    };

    let linkStyle = {
      'color': '#00BCD4',
      'text-decoration': 'none'
    };

    let iframeStyle = {
      'float': 'right',
      'border': 'none'
    };

    return (
      <div id="footer" style={style}>

        <span>
          Made by <a href="https://github.com/nicovalencia/coinbase-monitor" style={linkStyle}>nicovalencia</a>.
        </span>

        <iframe
          src="https://ghbtns.com/github-btn.html?user=nicovalencia&repo=coinbase-monitor&type=star&count=true"
          frameborder="0"
          scrolling="0"
          width="80px"
          height="20px"
          style={iframeStyle}></iframe>

      </div>
    );

  }

}

export default Footer;