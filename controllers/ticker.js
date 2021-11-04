const axios = require('axios')
const constants = require("../utils/constants");

exports.getCurrentPriceBySymbol = function(request, response) {
	/**
	 * Returns currect price of a given symbol
	 *  {
	 * 		"currentPrice":"60950.01000000"
	 *  }
	 */
	
	let symbol = request.params.symbol

	axios
		.get(`https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}USDT`, {
		})
		.then(res => {
			response
				.status(200)
				.jsonp({
					"currentPrice": parseFloat(res.data.lastPrice)
				})
		})
		.catch(error => {
			console.log("errrror", error)
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

	axios
		.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${symbol}&tsyms=USD`, {
			headers: {
				"X-API-KEY": constants.CRYPTO_COMPARE_API_KEY
			}
		})
		.then(res => {
			response
				.status(200)
				.jsonp({
					"closingPrice": res.data.RAW[symbol].USD.OPENDAY
				})
		})
		.catch(error => {
			console.log("errrror", error)
			response
				.status(error.response.status)
				.jsonp({
					"error": "Crypto Compare API return error",
					"originalError": error.response.data
				})
		})
};
