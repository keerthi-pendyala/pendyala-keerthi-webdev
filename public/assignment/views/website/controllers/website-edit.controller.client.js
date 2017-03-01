(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            var promise = WebsiteService.findAllWebsitesForUser(vm.userId);
            promise.success(function (websites) {
                vm.websites = websites;
            });
            var promise = WebsiteService.findWebsiteById(vm.websiteId);
            promise.success(function (website) {
                vm.website = website;
            });
        }
        init();

        function updateWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(vm.websiteId, newWebsite)
                .success(function (websites) {
                    vm.message = "Website successfully updated!"
                })
                .error(function (err) {
                    vm.error = "unable to update website";
                });
        }

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.userId, website);
            //vm.websites = WebsiteService.findAllWebsitesForUser(vm.userId);
            $location.url("/user/" + vm.userId + "/website");
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(vm.websiteId);
            $location.url("/user/" + vm.userId + "/website");
        }
    }
})();
