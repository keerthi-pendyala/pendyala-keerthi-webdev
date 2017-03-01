    (function () {
        angular
            .module("WebAppMaker")
            .controller("registerController", registerController);

        function registerController($location, UserService) {
            var vm = this;
            vm.register = register;
            vm.createUser = createUser;

            function register(user) {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.message = "Username is taken , Please use a different one";
                    })
                    .error(function (err) {
                        vm.createUser(user);
                    });
            }

            function createUser(user) {
                UserService
                    .createUser(user)
                    .success(function (Newuser) {
                        $location.url("/user/" + Newuser._id);
                    })
                    .error(function (err) {
                        vm.error = "Passwords don't match, Try Again"
                    });
            }
        }
    });

