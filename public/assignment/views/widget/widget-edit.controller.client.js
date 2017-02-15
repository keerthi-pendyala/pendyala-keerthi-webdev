(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location,$routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/editor/widget-'+type+'.view.client.html';
        }

        function updateWidget(newWidget)
        {
            var widgetone = WidgetService.updateWidget(vm.widgetId,newWidget);
            if(widgetone == null) {
                vm.error = "unable to update widget";
            }
            else {
                $location.url("/user/" + vm.userId +"/website/"+vm.websiteId +"/page/" + vm.pageId + "/widget");
            }
        }
    }
})();