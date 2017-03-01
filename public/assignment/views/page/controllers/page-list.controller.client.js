(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.UserId = $routeParams.uid;
        var promise = PageService.findPageByWebsiteId(vm.websiteId);
        promise.success(function (pges) {
            vm.pages = pges;
        });
    }
})();