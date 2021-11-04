require('dotenv').config();
var define = require("node-constants")(exports);

define("CRYPTO_COMPARE_API_KEY", process.env.CRYPTO_COMPARE_API_KEY);
