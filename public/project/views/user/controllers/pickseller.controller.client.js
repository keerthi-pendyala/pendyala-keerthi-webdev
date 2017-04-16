(function(){
    angular
        .module("SoapOperaWorld")
        .controller("picksellerController", picksellerController);

    function picksellerController(userService,showService,$location,$routeParams,checkUser) {
        var vm = this;
        vm.logout = logout;
        if(checkUser)
            vm.uid = checkUser._id;


        vm.pid=$routeParams['pid'];

        function init() {
            showService
                .getSellers(vm.pid)
                .then(function(sellers){
                    console.log(sellers);
                    vm.sellers= sellers;
                    vm.sellerinfo=[];
                    for(var i=0;i<vm.sellers.length;i++)
                    {
                        userService
                            .findUserByUserId(vm.sellers[i])
                            .then(function (sellerin)
                            {
                                console.log(sellerin);
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

        function logout() {
            userService
                .logout()
                .then(function (res) {
                    $location.url("/user");
                },function (err) {
                    $location.url("/userlogin");
                });
        }
    }
})();