(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "views/user/login.view.client.html",
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: 'registerController',
                controllerAs: 'model'
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html",
                controller: 'profileController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: 'WebsiteListController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: 'WebsiteNewController',
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid",{
                templateUrl: 'views/website/website-edit.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl: 'views/page/page-list.view.client.html',
                controller: "PageListController",
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/new",{
                templateUrl: 'views/page/page-new.view.client.html',
                controller: "PageNewController",
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid",{
                templateUrl: 'views/page/page-edit.view.client.html',
                controller: "PageEditController",
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid/page/:pid/widget",{
                templateUrl: 'views/widget/widget-list.view.client.html',
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid",{
                templateUrl: 'views/widget/widget-edit.view.client.html',
                controller: "WidgetEditController",
                controllerAs: "model"
            });
    }
})();

