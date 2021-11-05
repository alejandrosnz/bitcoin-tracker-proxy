const winston = require('winston');
const constants = require("../utils/constants");

const logger = winston.createLogger({
  level: constants.LOG_LEVEL,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'bitcoin-tracker-proxy' },
  transports: [
	new winston.transports.Console()
  ],
});

module.exports = {
    logger
}
