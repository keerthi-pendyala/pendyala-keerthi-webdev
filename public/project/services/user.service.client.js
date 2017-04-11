(function(){
    angular
        .module("SoapOperaWorld")
        .factory('userService', userService);

    function userService($http) {

        var api = {
            "createUser": createUser,
            "deleteUser": deleteUser,
            "updateUser": updateUser,
           // "findAllUsers": findAllUsers,
            "findUserByCredentials": findUserByCredentials,
            "findUserByUserId": findUserByUserId,
            "findUserByUsername": findUserByUsername,
            "addShow": addShow,
            "addTVShow":addTVShow
          //  "purchaseTVShow":purchaseTVShow
         //   "createShow":createShow,
         //   "addSeller":addSeller,
         //   "updateShow": updateShow
         //   "findProductById":findProductById,
         //   "getTVShows":getTVShows,
         //   "getAllTVShows":getAllTVShows
        };
        return api;


        function deleteUser(UserId) {
            return $http.delete('/api/user/'+UserId)
                .then(function (response) {
                    return response.data;
                });
        }

        function createUser(User) {
            return $http.post("/api/user", User)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(Username) {
            return $http.get("/api/user?username="+Username)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUserId(uid) {
            return $http.get("/api/user/"+uid)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            return $http.get("/api/users/")
                .then(function (response) {
                    return response.data;
                });
        }



        function updateSeller(sellerId, newseller) {
            return $http.put("/api/seller/"+sellerId, newseller)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateShow(showId, newshow) {
            return $http.put("/api/show/"+showId, newshow)
                .then(function (response) {
                    return response.data;
                });
        }

        function findSellerById(sid) {
            return $http.get("/api/seller/"+sid)
                .then(function (response) {
                    return response.data;
                });
        }

        function findShowById(pid) {
            return $http.get("/api/show/"+pid)
                .then(function (response) {
                    return response.data;
                });
        }

        function getShows(show) {
            var key = "53b51c871dad98d0c04e5b6c841e5240";
            var query = show.showname;
            var urlBase = "https://api.themoviedb.org/3/search/tv?api_key=API_KEY&language=en-US&query=TEXT&page=1";
            var url = urlBase.replace("API_KEY", key).replace("TEXT", query);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }


        function addShow(sid,pid,show){
            return $http.post("/api/seller/"+sid+"/"+pid,show)
                .then(function (response) {
                    return response.data;
                });
        }

        function addTVShow(pid,sid,show){
            return $http.post("/api/seller/show/"+sid+"/"+pid,show)
                .then(function (response) {
                    return response.data;
                });
        }

        function addSeller(pid,sid) {
            return $http.post("/api/show/"+sid+"/"+pid)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();