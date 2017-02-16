(function(){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];
        vm.update = update;
        vm.deleteUser=deleteUser;
        var user = UserService.findUserById(vm.userId);
        vm.user = user;

        function update(newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };

        function deleteUser() {
            UserService.deleteUser(vm.userId);
            vm.error = "Account Deactivated";
        };

    }
})();