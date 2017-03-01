(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.createPage = createPage;

        var promise = PageService.findPageByWebsiteId(vm.websiteId);
        promise.success(function (pages) {
            vm.pages = pages;
        });

        function createPage(page) {
            var promise = PageService.createPage(vm.websiteId, page);
            promise.success(function (pge) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            });
        }
    }
})();
