# Coinbase Monitor

Node.js/React Coinbase account monitor

# Setup

* Install babel, core, node...
* `npm install`
* Ensure React resolves to `0.13.3` for material ui: `jspm resolve --only npm:react@0.13.3 && jspm clean`
* `npm start`

# Coinbase API

Leverages the [coinbase node api adapter](https://github.com/coinbase/coinbase-node) and relies on temporary patch: [here](https://github.com/coinbase/coinbase-node/issues/33).