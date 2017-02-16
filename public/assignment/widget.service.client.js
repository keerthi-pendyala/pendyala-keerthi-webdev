(function () {
    angular
        .module("WebAppMaker")
        .service("WidgetService", WidgetService);

    function WidgetService() {

        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ]


        this.findAllWidgets = findAllWidgets;
        this.findWidgetsByPageId=findWidgetsByPageId;
        this.findWidgetById = findWidgetById;
        this.updateWidget = updateWidget;
        this.deleteWidget = deleteWidget;
        this.createWidget=createWidget;
        this.createHeaderWidget=createHeaderWidget;
        this.createImageWidget=createImageWidget;
        this.createYoutubeWidget=createYoutubeWidget;


        function findAllWidgets(pageId) {
            return widgets;
        }

        function findWidgetsByPageId(pageId) {
            var wids = [];
            for(var w in widgets) {
                if(widgets[w].pageId === pageId) {
                    wids.push(widgets[w]);
                }
            }
            return wids;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function createHeaderWidget() {
            widget = {"_id": "9999", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"}
            var random = (new Date()).getTime();
            widget._id = random.toString();
            return widget;
        }

        function createImageWidget() {
            widget = { "_id": "333333", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://7606-presscdn-0-74.pagely.netdna-cdn.com/wp-content/uploads/2016/03/Dubai-Photos-Images-Oicture-Dubai-Landmarks-800x600.jpg"}
            var random = (new Date()).getTime();
            widget._id = random.toString();
            return widget;
        }

        function createYoutubeWidget() {
            widget ={ "_id": "1111", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" }
            var random = (new Date()).getTime();
            widget._id = random.toString();
            return widget;
        }

        function createWidget(NewpageId,Newwidget) {
            Newwidget.pageId=NewpageId;
            widgets.push(Newwidget);
            return Newwidget;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id === widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function updateWidget(widgetId,newWidget) {
            for(var w in widgets) {
                var widget = widgets[w];
                if( widget._id === widgetId) {
                    widgets[w].name = newWidget.name;
                    widgets[w].text = newWidget.text;
                    widgets[w].size = newWidget.size;
                    widgets[w].url = newWidget.url;
                    widgets[w].width = newWidget.width;
                    return widget;
                }
            }
            return null;
        }
    }
})();