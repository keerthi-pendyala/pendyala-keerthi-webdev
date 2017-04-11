(function () {
    angular
        .module("SoapOperaWorld")
        .controller("userprofileController", userprofileController);

    function userprofileController($routeParams,$location, userService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser = deleteUser;

        function init() {
            userService
                .findUserByUserId(vm.userId)
                .then(renderUser);
        }
        init();

        function update(newuser) {
            userService
                .updateUser(vm.userId, newuser)
                .then(function (usr) {
                    if(!usr)
                        vm.error = "unable to update user";
                    else
                        vm.message = "user successfully updated";
                });
        }

        function renderUser(user) {
            vm.user = user;
        }

        function deleteUser() {
            userService
                .deleteUser(vm.userId)
                .then(function (usr) {
                    if(usr) {
                        vm.error = "Account Deactivated!";
                        $location.url('/userlogin');
                    }
                });
        };

    }
})();