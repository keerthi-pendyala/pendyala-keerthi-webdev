module.exports = function (app, model) {
    app.get("/api/buyertrade/:buyerId", findTradeByBuyerId);
    app.get("/api/sellertrade/:sellerId", findTradeBySellerId);
    app.get("/api/trades", findAllTrades);

    function findTradeByBuyerId(req, res) {
        var buyerId = req.params['buyerId'];
        model.trademodel
            .findTradeByBuyerId(buyerId)
            .then(function (transfer) {
                res.send(transfer);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }


    function findTradeBySellerId(req, res) {
        var sellerId = req.params['sellerId'];
        model.trademodel
            .findTradeBySellerId(sellerId)
            .then(function (transfer) {
                res.send(transfer);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findAllTrades(req, res) {
        model.trademodel
            .findAllTrades()
            .then(function (transfer) {
                res.send(transfer);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
};