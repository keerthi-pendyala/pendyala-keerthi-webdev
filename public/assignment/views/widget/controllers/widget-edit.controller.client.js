    (function () {
        angular
            .module("WebAppMaker")
            .controller("WidgetEditController", WidgetEditController);

        function WidgetEditController($location, $routeParams, WidgetService) {
            var vm = this;
            vm.userId = $routeParams.uid;
            vm.websiteId = $routeParams.wid;
            vm.pageId = $routeParams.pid;
            vm.widgetId = $routeParams.wgid;
            vm.updateWidget = updateWidget;
            vm.deleteWidget = deleteWidget;
            vm.getEditorTemplateUrl = getEditorTemplateUrl;

            function init() {
                WidgetService
                    .findWidgetById(vm.widgetId)
                    .success(function(widget){
                    vm.widget = widget;
                    });
            }

            init();

            function getEditorTemplateUrl(type) {
                if (type != null) {
                    return 'views/widget/editor/widget-' + type + '.view.client.html';
                }
            }

            function deleteWidget() {
                WidgetService.deleteWidget(vm.widgetId);
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }

            function updateWidget(newWidget) {
                WidgetService
                    .updateWidget(vm.widgetId, newWidget)
                    .success(function(widget){
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function(err){
                            vm.error = "unable to update widget";
                })
            }
        }
    })();