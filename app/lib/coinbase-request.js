import crypto from 'crypto';
import request from 'request';

const API_KEY = process.env.COINBASE_API_KEY;
const API_SECRET = process.env.COINBASE_API_SECRET;

export default function coinbaseRequest(path, cb) {

  let method = 'GET';
  let timestamp = Math.floor(Date.now() / 1000);
  let signature = crypto.createHmac("sha256", API_SECRET).update(timestamp + path).digest("hex");

  return request({
    baseUrl: 'https://api.coinbase.com/v2',
    url: path,
    method: method,
    headers: {
      'CB-ACCESS-SIGN': signature,
      'CB-ACCESS-TIMESTAMP': timestamp,
      'CB-ACCESS-KEY': API_KEY,
      'CB-VERSION': '2015-07-22'
    }
  }, cb);
}