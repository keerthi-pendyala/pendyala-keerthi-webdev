(function(){
    angular
        .module("SoapOperaWorld")
        .factory('tradeService', tradeService);

    function tradeService($http) {

        var api = {

            "findTradeByBuyerId":findTradeByBuyerId,
            "findTradeBySellerId":findTradeBySellerId,
            "findAllTrades":findAllTrades
        };
        return api;

        function findTradeByBuyerId(bid) {
            return $http.get("/api/buyertrade/"+bid)
                .then(function (response) {
                    return response.data;
                });
        }

        function findTradeBySellerId(sid) {
            return $http.get("/api/sellertrade/"+sid)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllTrades() {
            return $http.get("/api/trades")
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();