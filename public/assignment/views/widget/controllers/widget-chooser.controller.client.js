(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.createWidget = createWidget;

        function init() {
            vm.widgets = WidgetService.findAllWidgetsForPage(vm.pageId);
        }

        init();

        function createWidget(widgetType) {
            var newWidget = {};
            var random = (new Date()).getTime();
            newWidget._id = random.toString();
            newWidget.widgetType =widgetType;
            WidgetService
                .createWidget(vm.pageId,newWidget)
                .success(function(widget){
                    vm.widget=widget;
                   $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widget._id);
                 });
        }
    }
})();
