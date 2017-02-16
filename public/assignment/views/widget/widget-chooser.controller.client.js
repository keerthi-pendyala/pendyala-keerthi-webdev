(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId=$routeParams.pid;
        vm.createHeaderWidget=createHeaderWidget;
        vm.createImageWidget=createImageWidget;
        vm.createYoutubeWidget=createYoutubeWidget;

        function init() {
            vm.widgets = WidgetService.findAllWidgets(vm.pageId);
        }
        init();

        function createHeaderWidget () {
            vm.newWidget=WidgetService.createHeaderWidget();
            vm.widget=WidgetService.createWidget(vm.pageId, vm.newWidget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);

        }

        function createImageWidget () {
            vm.newWidget=WidgetService.createImageWidget();
            vm.widget=WidgetService.createWidget(vm.pageId, vm.newWidget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);

        }

        function createYoutubeWidget () {
            vm.newWidget=WidgetService.createYoutubeWidget();
            vm.widget=WidgetService.createWidget(vm.pageId, vm.newWidget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+vm.widget._id);

        };
    }
})();
