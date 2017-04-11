(function(){
    angular
        .module("SoapOperaWorld")
        .controller("productdescriptionController", productdescriptionController);

    function productdescriptionController(showService,userService,$routeParams,$sce) {
        var vm = this;
        vm.uid=$routeParams['uid'];
        vm.pid=$routeParams['pid'];
        vm.getTrustedURL=getTrustedURL;
        vm.addShow=addShow;

        function init() {
            showService
                .findProductById(vm.pid)
                .then(function(product){
                    vm.product=product;
                });
            if(vm.uid)
            {
                userService
                    .findUserByUserId(vm.uid)
                    .then(function(user){
                        vm.user=user;
                        console.log(vm.user);
                        if(vm.user.type === "buyer")
                        {
                            vm.bid = vm.user._id;
                        }
                        else
                        {
                            vm.sid = vm.user._id;
                        }
                    });
            }

            showService
                .findShowByShowId(vm.pid)
                .then(function (show) {
                    vm.show = show;
                });
        }
        init();

        function getTrustedURL() {
            var id="lGTOru7pwL8";
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }



        function addShow(newshow){
            userService
                .addTVShow(vm.pid,vm.sid,newshow)
                .then(function(usr){
                    if(!usr) {
                        vm.error='Could not update show';
                    }
                    else
                    {
                        vm.message = "Show  added to inventory";
                    }
                });
        }

    }
})();