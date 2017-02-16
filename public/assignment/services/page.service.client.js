(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"},
            {"_id": "123", "name": "Post 11", "websiteId": "123", "description": "Lorem"},
            {"_id": "456", "name": "Post 22", "websiteId": "234", "description": "Lorem"},
            {"_id": "789", "name": "Post 33", "websiteId": "567", "description": "Lorem"}
        ];

        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage

        };
        return api;

        function findPageByWebsiteId(wid) {
            var pagelist = [];
            for (var p in pages) {
                if (pages[p].websiteId === wid) {
                    pagelist.push(pages[p]);
                }
            }
            return pagelist;
        }

        function findPageById(pid) {
            for(var p in pages) {
                if(pages[p]._id === pid) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function updatePage(pageId,Newpage) {
            for(var p in pages) {
                var page = pages[p];
                if( page._id === pageId) {
                    pages[p].name = Newpage.name;
                    pages[p].description = Newpage.description;
                    return page;
                }
            }
            return null;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function createPage(websiteId, page) {
            page.websiteId = websiteId;
            var random = (new Date()).getTime();
            page._id = random.toString();
            pages.push(page);
        }
    }
})();