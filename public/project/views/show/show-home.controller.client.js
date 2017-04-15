(function(){
    angular
        .module("SoapOperaWorld")
        .controller("homeController", homeController);

    function homeController(checkUser,showService,userService,$location,$routeParams) {
        var vm = this;
        vm.logout=logout;

        if(checkUser)
            vm.uid = checkUser._id;

        vm.getTVShows=getTVShows;

        function init() {
            showService
                .getAllTVShows()
                .then(function(tvsho){
                    vm.tvshow=tvsho.results;
                    vm.posters = [];
                    for (var i=0;i<vm.tvshow.length;i++)
                    {
                        vm.posters[i] = "https://image.tmdb.org/t/p/w500/"+vm.tvshow[i].poster_path;
                    }
                });
        }
        init();

        function getTVShows(show) {
            showService
                .getTVShows(show)
                .then(function (response) {
                    vm.shows = response.results;
                });
        }

        function logout() {
            userService
                .logout()
                .then(function (res) {
                    $location.url("/user");
                },function (err) {
                    $location.url("/userlogin");
                });
        }

    }
})();