(function () {
    angular
        .module("SoapOperaWorld")
        .controller("sellertradeController", sellertradeController);

    function sellertradeController(tradeService,userService,showService, loggedIn) {
        var vm = this;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        if(loggedIn)
            vm.bid=loggedIn._id;

        function init() {
            tradeService
                .findTradeBySellerId(vm.sid)
                .then(function (sellerTrade) {
                    vm.sellerTrade = sellerTrade;
                    if (sellerTrade.length === 0) {
                        vm.message = "No shows to display"
                    }
                    else {
                        getBuyerInfo(sellerTrade);
                        getShowsInfo(sellerTrade);
                    }
                });
        }

        init();


        function getBuyerInfo(sellerTrade) {
            var buyerInfo = [];
            for (var i = 0; i < sellerTrade.length; i++) {
                userService
                    .findUserByUserId(sellerTrade[i].buyerId)
                    .then(function (buyer) {
                        var newBuyer = {
                            name: buyer.firstName + " " + buyer.lastName,
                            email: buyer.email,
                            phone: buyer.phone
                        };
                        buyerInfo.push(newBuyer);
                    });
            }
            vm.buyerInfo = buyerInfo;
            console.log(vm.buyerInfo)

        }

        function getShowsInfo(sellerTrade){
            var shows_info = [];
            for (var i=0;i<sellerTrade.length;i++)
            {
                showService
                    .findProductById(sellerTrade[i].showId)
                    .then(function(show){
                        shows_info.push(show);
                    });
            }
            vm.shows_info=shows_info;
            console.log(vm.shows_info)
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
})
();