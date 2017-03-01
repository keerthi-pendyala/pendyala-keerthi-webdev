    module.exports = function (app) {
        app.post('/api/website/:websiteId/page', createPage);
        app.get('/api/website/:websiteId/page', findPageByWebsiteId);
        app.get('/api/page/:pageId', findPageById);
        app.put('/api/page/:pageId', updatePage);
        app.delete('/api/page/:pageId', deletePage);


        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
            {"_id": "123", "name": "Post 11", "websiteId": "123", "description": "Lorem"},
            {"_id": "456", "name": "Post 22", "websiteId": "234", "description": "Lorem"},
            {"_id": "789", "name": "Post 33", "websiteId": "567", "description": "Lorem"}
        ];

        function findPageByWebsiteId(req, res) {
            var wid = req.params.websiteId;
            var pagelist = [];
            for (var p in pages) {
                if (pages[p].websiteId === wid) {
                    pagelist.push(pages[p]);
                }
            }
            res.json(pagelist);
        }

        function deletePage(req, res) {
            var pageId = req.params.pageId;
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function findPageById(req, res) {
            var pid = req.params.pageId;
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    res.send(pages[p]);
                    return;
                }
            }
        }

        function createPage(req, res) {
            var websiteId = req.params.websiteId;
            var page = req.body;
            page.websiteId = websiteId;
            var random = (new Date()).getTime();
            page._id = random.toString();
            pages.push(page);
            res.json(page);
        }

        function updatePage(req,res) {
            var Newpage=req.body;
            var pageId=req.params.pageId;
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pageId) {
                    pages[p].name = Newpage.name;
                    pages[p].description = Newpage.description;
                    return res.json(page);
                }
            }

        }
    }

