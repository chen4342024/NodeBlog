"use strict";
angular.module('app.controllers')
    .controller('MainCtrl', ['$scope', 'AppConfig', function ($scope, AppConfig) {
        $scope.articles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

        $scope.templateList = {
            CATEGORYS: "app/index/categorys.tpl.html",
            ARGICLES : "app/index/articles.tpl.html",
            TAGS     : "app/index/tags.tpl.html"
        };

        $scope.currentTemplate = $scope.templateList.ARGICLES;

        $scope.changeTemplate = function (template) {
            $scope.currentTemplate = template;
        };

        var tagColor = ["#5cb85c", "#337ab7", "#5bc0de", "#f0ad4e", "#c9302c"];

        var tagNames = ["北京", "马尔代发", "广州", "上海", "天津", "巴黎", "巴厘岛", "揭阳", "汕头", "潮州", "海南", "法国", "河南", "河北", "江南", "南京"];
        $scope.tags = [];
        generateTags();
        function generateTags() {
            _.forEach(tagNames, function (tagName) {
                var index = _.random(0,4);
                var tag = {
                    name:tagName,
                    color:tagColor[index]

                };
                $scope.tags.push(tag);
            })
        }


    }]);