const axios = require('axios')
const constants = require("../utils/constants");
const { logger } = require("../utils/logger")

exports.getCurrentPriceBySymbol = function(request, response) {
	/**
	 * Returns currect price of a given symbol
	 *  {
	 * 		"currentPrice":"60950.01000000"
	 *  }
	 */
	
	let symbol = request.params.symbol
	logger.info(`Received request to GET currentPrice for symbol: ${symbol}`)

	axios
		.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`, {
		})
		.then(res => {
			logger.debug(`Binance return status code ${res.status} and body ${JSON.stringify(res.data)}`)
			
			let current_price = parseFloat(res.data.lastPrice)
			response
				.status(200)
				.jsonp({
					"currentPrice": current_price
				})
			
			logger.info(`Returned currentPrice for symbol: ${symbol}: ${current_price}`)
		})
		.catch(error => {
			logger.error(`Binance return status code ${error.response.status} and body ${JSON.stringify(error.response.data)}`)
			response
				.status(error.response.status)
				.jsonp({
					"error": "Binance API return error",
					"originalError": error.response.data
				})
		})
};

exports.getClosingPriceBySymbol = function(request, response) {
	/**
	 * Returns currect price of a given symbol
	 *  {
	 * 		"closingPrice":"60950.01000000"
	 *  }
	 */
	
	let symbol = request.params.symbol
	logger.info(`Received request to GET closingPrice for symbol: ${symbol}`)
	axios
		.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD`, {
			headers: {
				"X-API-KEY": constants.CRYPTO_COMPARE_API_KEY
			}
		})
		.then(res => {
			logger.debug(`Crypto Compare return status code ${res.status} and body ${JSON.stringify(res.data)}`)
			
			let closing_price = res.data.RAW[symbol].USD.OPENDAY
			response
				.status(200)
				.jsonp({
					"closingPrice": closing_price
				})
			
			logger.info(`Returned closingPrice for symbol: ${symbol}: ${closing_price}`)
		})
		.catch(error => {
			logger.error(`Crypto Compare return status code ${error.response.status} and body ${JSON.stringify(error.response.data)}`)
			response
				.status(error.response.status)
				.jsonp({
					"error": "Crypto Compare API return error",
					"originalError": error.response.data
				})
		})
};
