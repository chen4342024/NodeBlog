"use strict";
angular.module('app.controllers')
    .controller('ArticleCtrl', ['$scope', 'AppConfig', 'ArticleService', '$stateParams', '$sce',
        function ($scope, AppConfig, ArticleService, $stateParams, $sce) {
            var id = $stateParams.id;
            ArticleService.getById(id).then(function (response) {
                if (response.success) {
                    $scope.article = response.data;
                    $scope.article.content = $sce.trustAsHtml($scope.article.content);
                }
            });
        }]);