(function(){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController($location,UserService) {
        var vm = this;
        vm.createUser = createUser;

        function createUser(user) {

            if(user.password === user.verifypassword) {
                var Newuser = UserService.createUser(user);
                $location.url("/user/" + Newuser._id);
            }

            else
                vm.error="Passwords don't match, Try Again"
        };
    }
})();