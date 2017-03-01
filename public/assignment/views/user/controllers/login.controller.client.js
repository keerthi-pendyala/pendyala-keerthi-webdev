    (function(){
        angular
            .module("WebAppMaker")
            .controller("loginController", loginController);

        function loginController(UserService, $location) {
            var vm = this;
            vm.login = login;

            function login(user) {
                var promise = UserService.findUserByCredentials(user.username, user.password);
                promise
                    .success(function (user) {
                        var loginUser = user;
                        $location.url('/user/' + loginUser._id);
                    })

                    .error(function (){
                            vm.error='User not found';
                        });
            }
        }
    })();