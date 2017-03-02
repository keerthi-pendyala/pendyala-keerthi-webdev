(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService($http) {

        this.findAllWidgetsForPage=findAllWidgetsForPage;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.createWidget=createWidget;


        function findAllWidgetsForPage(pageId) {
            return $http.get("/api/page/"+pageId+"/widget");
        }

        function findWidgetById(widgetId) {
            return $http.get("/api/widget/"+widgetId);
        }

        function createWidget(NewpageId,Newwidget) {
            return $http.post("/api/page/"+NewpageId+"/widget",Newwidget);
        }

        function deleteWidget(widgetId) {
            return $http.delete("/api/widget/"+widgetId);
        }

        function updateWidget(widgetId,newWidget) {
            return $http.put("/api/widget/"+widgetId,newWidget);
        }
    }
})();