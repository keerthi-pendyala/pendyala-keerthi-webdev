(function(){
    angular
        .module("SoapOperaWorld")
        .controller("homeController", homeController);

    function homeController(showService,$routeParams) {
        var vm = this;
        vm.uid = $routeParams['uid'];
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

    }
})();