        module.exports = function (app) {
            app.get('/api/widget/:widgetId', findWidgetById);
            app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
            app.put('/api/widget/:widgetId', updateWidget);
            app.delete('/api/widget/:widgetId', deleteWidget);
            app.post('/api/page/:pageId/widget', createWidget);

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

            var multer = require('multer');
            var upload = multer({ dest: __dirname+'/../../public/uploads' });
            app.post ("/api/upload", upload.single('myFile'), uploadImage);

            function uploadImage(req, res) {
                var myFile = req.file;
                var filename = myFile.filename;
                for (var w in widgets) {
                    if (widgets[w]._id === req.body.widgetId) {
                        widgets[w].url = req.protocol + '://' + req.get('host') + "/uploads/" + filename;
                        widgets[w].width=req.body.width;
                    }
                }
                res.redirect("/assignment/#/user/" + req.body.userId + "/website/" + req.body.websiteId + "/page/" + req.body.pageId + "/widget");
            }

            function findAllWidgetsForPage(req, res) {
                var pageId=req.params.pageId;
                var wids = [];
                for(var w in widgets) {
                    if(widgets[w].pageId === pageId) {
                        wids.push(widgets[w]);
                    }
                }
                res.json(wids);
            }

            function deleteWidget(req, res) {
                var widgetId=req.params.widgetId;
                for(var w in widgets) {
                    if (widgets[w]._id === widgetId) {
                        widgets.splice(w, 1);
                    }
                }
            }

            function findWidgetById(req,res) {
                var widgetId=req.params.widgetId;
                for(var w in widgets) {
                    if(widgets[w]._id === widgetId) {
                       res.json(widgets[w]);

                    }
                }
            }

            function createWidget(req, res) {
                var Newwidget= req.body;
                var NewpageId=req.params.pageId;
                Newwidget.pageId=NewpageId;
                widgets.push(Newwidget);
                res.json(Newwidget);
            }

            function updateWidget(req,res) {
                var widgetId=req.params.widgetId;
                var newWidget=req.body;
                for(var w in widgets) {
                    var widget = widgets[w];
                    if( widget._id === widgetId) {
                        widgets[w].name = newWidget.name;
                        widgets[w].text = newWidget.text;
                        widgets[w].size = newWidget.size;
                        widgets[w].url = newWidget.url;
                        widgets[w].width = newWidget.width;
                        res.json(widget);
                    }
                }
            }
        }

