var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override");

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var TickerController = require('./controllers/ticker');

// API routes
var ticker = express.Router();

ticker.route('/ticker/current_price/:symbol')
  .get(TickerController.getCurrentPriceBySymbol);

ticker.route('/ticker/closing_price/:symbol')
  .get(TickerController.getClosingPriceBySymbol);

app.use('/api', ticker);

// Start server
app.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});
