module.exports = function (model) {
    var q = require('q');
    var mongoose = require('mongoose');
    var tradeSchema = require('./trade.schema.server.js')();
    var trademodel = mongoose.model('trademodel', tradeSchema);

    var api = {
        createTransfer: createTransfer,
        findTradeByBuyerId:findTradeByBuyerId,
        findTradeBySellerId:findTradeBySellerId,
        findAllTrades:findAllTrades
    };
    return api;

    function createTransfer(sellerId,buyerId,showId) {
        var deferred = q.defer();
        var transfer ={sellerId:sellerId,buyerId:buyerId,showId:showId};
        trademodel
            .create(transfer, function (err, user) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }


    function findTradeByBuyerId(buyerId) {
        var deferred = q.defer();
        trademodel
            .find({buyerId:buyerId}, function (err, transfer) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(transfer);
                }
            });
        return deferred.promise;
    }


    function findTradeBySellerId(sellerId) {
        var deferred = q.defer();
        trademodel
            .find({sellerId:sellerId}, function (err, transfer) {
                if (err) {
                    deferred.abort(err);
                } else {
                    deferred.resolve(transfer);
                }
            });
        return deferred.promise;
    }

    function findAllTrades() {
        var deferred = q.defer();
        trademodel
            .find()
            .then(function (trades, err) {
                if (err)
                    deferred.abort(err);
                else {
                    deferred.resolve(trades);
                }
            });
        return deferred.promise;
    }
};