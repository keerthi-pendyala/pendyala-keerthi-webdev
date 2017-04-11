(function(){
    angular
        .module("SoapOperaWorld")
        .config(configuration);

    function configuration($routeProvider,$httpProvider) {
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/json;charset=utf-8';
        $routeProvider
            .when("/", {
                templateUrl: "views/show/show-home.view.client.html",
                controller: 'homeController',
                controllerAs: 'model'
            })
            .when("/show", {
                templateUrl: "views/show/show-home.view.client.html",
                controller: 'homeController',
                controllerAs: 'model'
            })
             .when("/userlogin", {
                 templateUrl: "views/user/templates/user-login.view.client.html",
                 controller: 'userloginController',
                 controllerAs: 'model'
             })
             .when("/userregister", {
                templateUrl: "views/user/templates/user-register.view.client.html",
                 controller: 'userregisterController',
                 controllerAs: 'model'
             })
             .when("/user/:uid", {
                 templateUrl: "views/user/templates/user-profile.view.client.html",
                 controller: 'userprofileController',
                 controllerAs: 'model'
             })
             .when("/user/:uid/search", {
                 templateUrl: "views/show/show-home.view.client.html",
                 controller: 'homeController',
                 controllerAs: 'model'
             })
            .when("/user/search/:pid", {
                templateUrl: "views/user/templates/productdescription.view.client.html",
                controller: 'productdescriptionController',
                controllerAs: 'model'
            })
            .when("/user/search/:pid/:uid", {
                templateUrl: "views/user/templates/productdescription.view.client.html",
                controller: 'productdescriptionController',
                controllerAs: 'model'
            })
            .when("/user/:bid/search/:pid/findstores", {
                templateUrl: "views/user/templates/pickseller.view.client.html",
                controller: 'picksellerController',
                controllerAs: 'model'
            })
            .when("/user/:bid/search/:pid/findstores/:sid", {
                templateUrl: "views/user/templates/placeorder.view.client.html",
                controller: 'placeorderController',
                controllerAs: 'model'
            });
    }
})();