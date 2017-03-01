(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        function init() {
            var promise = PageService.findPageByWebsiteId(vm.websiteId);
            promise.success(function (pages) {
                vm.pages = pages;
            });
            var promise = PageService.findPageById(vm.pageId);
            promise.success(function (page) {
                vm.page = page;
            });
        }
        init();

        function updatePage(newPage) {
            var promise = PageService.updatePage(vm.pageId, newPage);
            promise.success(function (pageone) {
                if (pageone == null) {
                    vm.error = "unable to update page";
                }
                else {
                    vm.message = "Page successfully updated!"
                }
            });
        }

        function deletePage() {
            PageService.deletePage(vm.pageId);
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }
    }
})();
