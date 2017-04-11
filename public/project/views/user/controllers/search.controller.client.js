(function(){
    angular
        .module("SoapOperaWorld")
        .controller("searchController", searchController);

    function searchController(showService,$routeParams) {
        var vm = this;
        vm.getTVShows=getTVShows;
        vm.bid = $routeParams['bid'];

        function getTVShows(show) {
            showService
                .getTVShows(show)
                .then(function (response) {
                    vm.shows = response.results;
                });
        }
    }
})();