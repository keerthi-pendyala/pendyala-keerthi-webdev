(function(){
    angular
        .module("SoapOperaWorld")
        .controller("userloginController", userloginController);

    function userloginController(userService, $location) {
        var vm = this;
        vm.login = login;
        vm.logout = logout;

        function login(user) {
            userService
                .login(user)
                .then(function (usr) {
                    $location.url('/user');
                }, function (err) {
                    vm.error = 'User not found';
                });
        }

        function logout() {
            userService
                .logout()
                .then(function (res) {
                    $location.url("/user");
                },function (err) {
                    $location.url("/userlogin");
                });
        }
    }
})();