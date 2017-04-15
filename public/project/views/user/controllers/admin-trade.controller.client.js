(function(){
    angular
        .module("SoapOperaWorld")
        .controller("admintradeController", admintradeController);

    function admintradeController(userService,tradeService, showService, loggedIn) {
        var vm = this;
        vm.openNav=openNav;
        vm.closeNav=closeNav;

        if(loggedIn)
            vm.bid=loggedIn._id;

        function init() {
            tradeService
                .findAllTrades()
                .then(function (trades) {
                    vm.trades = trades;
                    if (trades.length === 0) {
                        vm.message = "No trades between buyer and seller yet"
                    }
                    else {
                        getBuyerInfo(trades);
                        getSellerInfo(trades);
                        getShowsInfo(trades);
                    }
                });
        }
        init();

        function getBuyerInfo(trades) {
            var buyer_info = [];
            for (var i = 0; i < trades.length; i++) {
                userService
                    .findUserByUserId(trades[i].buyerId)
                    .then(function (user) {
                        var newUser = {
                            name: user.firstName + " " + user.lastName,
                            contact: user.email
                        };
                            buyer_info.push(newUser);
                    });
            }
            vm.buyer_info = buyer_info;
        }

        function getSellerInfo(trades) {
            var seller_info = [];
            for (var i = 0; i < trades.length; i++) {
                userService
                    .findUserByUserId(trades[i].sellerId)
                    .then(function (user) {
                        var newUser = {
                            name: user.firstName + " " + user.lastName,
                            contact: user.email
                        };
                        seller_info.push(newUser);
                    });
            }
            vm.seller_info = seller_info;
        }

        function getShowsInfo(trades){
            var shows_info = [];
            for (var i=0;i<trades.length;i++)
            {
                showService
                    .findProductById(trades[i].showId)
                    .then(function(show){
                        shows_info.push(show);
                    });
            }
            vm.shows_info=shows_info;
            console.log(shows_info);
        }


        function openNav() {
            document.getElementById("mySidenav").style.width = "250px";
            document.getElementById("main").style.marginLeft = "250px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
            document.getElementById("main").style.marginLeft = "0";
        }

    }
})();