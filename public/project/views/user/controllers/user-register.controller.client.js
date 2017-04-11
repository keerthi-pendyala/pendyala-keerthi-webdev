(function () {
    angular
        .module("SoapOperaWorld")
        .controller("userregisterController", userregisterController);

    function userregisterController($location, userService) {
        var vm = this;
        vm.register = register;
        vm.createUser = createUser;

        function createUser(user) {
            if(user.password === user.verifypassword) {
                userService
                    .createUser(user)
                    .then(function (Newuser) {
                        $location.url("/user/" + Newuser._id);
                    });
            }
            else
                vm.error = "Passwords don't match, Try Again";
        }

        function register(user) {
            userService
                .findUserByUsername(user.username)
                .then(function (usr) {
                    if(!usr)
                        vm.createUser(user);
                    else
                        vm.message = "Username is taken , Please use a different one";
                });
        }
    }
})();