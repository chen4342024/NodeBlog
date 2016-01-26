"use strict";
angular.module('app.controllers')
    .controller('InfoCtrl', ["UserService",function (UserService) {

        $scope.addUser = function (user) {
            UserService.insert(user);
        }
    }]);