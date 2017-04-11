(function(){
    angular
        .module("SoapOperaWorld")
        .controller("picksellerController", picksellerController);

    function picksellerController(userService,showService,$routeParams) {
        var vm = this;
        vm.uid=$routeParams['bid'];
        vm.pid=$routeParams['pid'];

        function init() {
            showService
                .getSellers(vm.pid)
                .then(function(sellers){
                    vm.sellers= sellers;
                    vm.sellerinfo=[];
                    for(var i=0;i<vm.sellers.length;i++)
                    {
                        userService
                            .findUserByUserId(vm.sellers[i])
                            .then(function (sellerin)
                            {
                                for(var j=0;j<sellerin.shows_forsale.length;j++)
                                {
                                      if(sellerin.shows_forsale[j].showId === vm.pid)
                                         count = sellerin.shows_forsale[j].count;
                                }
                                var nseller = sellerin;
                                nseller.showcount = count;
                                vm.sellerinfo.push(nseller);
                            });
                    }
                },function (err){
                  vm.error = "Movie is currently Out of Stock , please try again"
                });
        }
        init();
    }
})();