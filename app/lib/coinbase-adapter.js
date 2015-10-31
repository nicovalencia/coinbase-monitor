import coinbase from 'coinbase';

var client = new coinbase.Client({
  'apiKey': process.env.COINBASE_API_KEY,
  'apiSecret': process.env.COINBASE_API_SECRET
});

export default client;