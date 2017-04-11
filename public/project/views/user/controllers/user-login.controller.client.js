(function(){
    angular
        .module("SoapOperaWorld")
        .controller("userloginController", userloginController);

    function userloginController(userService, $location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            userService
                .findUserByCredentials(user.username, user.password)
                .then(function(usr){
                    if(!usr) {
                        vm.error='User not found';
                    }
                    else
                        $location.url('/user/' + usr._id);
                });
        }
    }
})();