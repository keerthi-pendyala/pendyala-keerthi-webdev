    (function () {
        angular
            .module("WebAppMaker")
            .controller("WebsiteNewController", WebsiteNewController);

        function WebsiteNewController($routeParams, $location, WebsiteService) {
            var vm = this;
            vm.userId = $routeParams.uid;
            vm.createWebsite = createWebsite;

            function init() {
                WebsiteService
                    .findAllWebsitesForUser(vm.userId)
                    .success(function(websites){
                        vm.websites = websites
                    });
            }
            init();

            function createWebsite(website) {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .success(function (websites) {
                        vm.websites = websites;
                        $location.url("/user/" + vm.userId + "/website");
                    })
            }
        }
    })();