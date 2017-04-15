(function(){
    angular
        .module("SoapOperaWorld")
        .controller("searchController", searchController);

    function searchController(showService,checkUser,$routeParams) {
        var vm = this;
        vm.getTVShows=getTVShows;
        if(checkUser)
            vm.uid = checkUser._id;

        function getTVShows(show) {
            showService
                .getTVShows(show)
                .then(function (response) {
                    vm.shows = response.results;
                });
        }
    }
})();