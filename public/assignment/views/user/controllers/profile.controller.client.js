    (function () {
        angular
            .module("WebAppMaker")
            .controller("profileController", profileController);

        function profileController($routeParams, UserService) {
            var vm = this;
            vm.userId = $routeParams['uid'];
            vm.update = update;
            vm.deleteUser = deleteUser;

            function init() {
                UserService
                    .findUserById(vm.userId)
                    .success(renderUser);
            }
            init();

            function update(newUser) {
                UserService
                    .updateUser(vm.userId, newUser)
                    .success(function (response) {
                        vm.message = "user successfully updated"
                    })
                    .error(function () {
                        vm.error = "unable to update user";
                    });
            };

            function renderUser(user) {
                vm.user = user;
            }

            function deleteUser() {
                UserService.deleteUser(vm.userId);
                vm.error = "Account Deactivated";
            };

        }
    })();