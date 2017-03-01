(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {
        var api = {
            "findPageByWebsiteId": findPageByWebsiteId,
            "createPage": createPage,
            "findPageById":findPageById,
            "updatePage":updatePage,
            "deletePage":deletePage
        };
        return api;

        function findPageByWebsiteId(wid) {
            return $http.get("/api/website/"+wid+"/page");
        }

        function findPageById(pid) {
            return $http.get("/api/page/"+pid);
        }

        function updatePage(pageId,Newpage) {
            return $http.put("/api/page/"+pageId,Newpage);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/"+pageId);
        }

        function createPage(websiteId, page) {
            return $http.post("/api/website/"+websiteId+"/page",page);
        }
    }
})();