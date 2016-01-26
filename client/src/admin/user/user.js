"use strict";
angular.module('admin.controllers')
    .controller('UserCtrl', ["UserService", '$scope', function (UserService, $scope) {
        $scope.user = {
            userName: "",
            password: "",
            email   : ""
        };

        $scope.addUser = function () {
            var data = {"user": $scope.user};
            UserService.insert(data);
        }
    }]);