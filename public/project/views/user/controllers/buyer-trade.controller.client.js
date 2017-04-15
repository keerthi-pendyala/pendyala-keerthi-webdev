(function () {
    angular
        .module("SoapOperaWorld")
        .controller("buyertradeController", buyertradeController);

    function buyertradeController(tradeService,userService,showService, loggedIn) {
        var vm = this;
        vm.openNav = openNav;
        vm.closeNav = closeNav;
        if(loggedIn)
            vm.bid=loggedIn._id;

        function init() {
            tradeService
                .findTradeByBuyerId(vm.bid)
                .then(function (buyerTrade) {
                    vm.buyerTrade = buyerTrade;
                    if (buyerTrade.length === 0) {
                        vm.message = "No shows to display"
                    }
                    else {
                        getSellerInfo(buyerTrade);
                        getShowsInfo(buyerTrade);
                    }
                });
        }

        init();


        function getSellerInfo(buyerTrade) {
            var sellerInfo = [];
            for (var i = 0; i < buyerTrade.length; i++) {
                userService
                    .findUserByUserId(buyerTrade[i].sellerId)
                    .then(function (seller) {
                        var newSeller = {
                            name: seller.firstName + " " + seller.lastName,
                            email: seller.email,
                            phone: seller.phone
                        };
                        sellerInfo.push(newSeller);
                    });
            }
            vm.sellerInfo = sellerInfo;
        }

        function getShowsInfo(buyerTrade){
            var shows_info = [];
            for (var i=0;i<buyerTrade.length;i++)
            {
                showService
                    .findProductById(buyerTrade[i].showId)
                    .then(function(show){
                        shows_info.push(show);
                    });
            }
            vm.shows_info=shows_info;
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