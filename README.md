# Bitcoin Tracker Proxy

Bitcoin Tracker Proxy is a NodeJS proxy to get the prices from Binance and Crypto Compare.

## Installation

Install Node and then run the following command

```bash
npm install
```

Start the server with:

```bash
export CRYPTO_COMPARE_API_KEY="your_crypto_compare_api_key"
npm start
```

## Usage

```
GET /api/ticker/current_price/:symbol
GET /api/ticker/current_price/BTC

{
  "currentPrice": 61118.69
}


GET /api/ticker/closing_price/:symbol
GET /api/ticker/closing_price/BTC

{
  "closingPrice": 62929.93
}

```
