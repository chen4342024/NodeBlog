"use strict";
angular.module('app.controllers')
    .controller('MainCtrl', ['$scope', 'AppConfig', 'ArticleService', 'Reddit', '$state',
        function ($scope, AppConfig, ArticleService, Reddit, $state) {
            var articleListFilters = [
                {
                    title  : "热门",
                    active : true,
                    handler: function (index) {
                        $scope.activeFilter = index;
                        loadArticle();
                    }
                },
                {
                    title  : "推荐",
                    active : false,
                    handler: function (index) {
                        $scope.activeFilter = index;
                    }
                },
                {
                    title  : "分类",
                    active : false,
                    handler: function (index) {
                        $scope.activeFilter = index;
                        $scope.changeTemplate($scope.templateList.CATEGORYS)
                    }
                },
                {
                    title  : "标签",
                    active : false,
                    handler: function (index) {
                        $scope.activeFilter = index;
                        $scope.changeTemplate($scope.templateList.TAGS)
                    }
                }
            ];

            $scope.activeFilter = 1;

            $scope.filters = articleListFilters;

            $scope.templateList = {
                CATEGORYS: "app/index/categorys/categorys.tpl.html",
                ARGICLES : "app/index/articles/articles.tpl.html",
                TAGS     : "app/index/tag/tags.tpl.html"
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
                    var index = _.random(0, 4);
                    var tag = {
                        name : tagName,
                        color: tagColor[index]

                    };
                    $scope.tags.push(tag);
                })
            }

            $scope.reddit = new Reddit();

            $scope.goToArticleDetail = function (articleId) {
                $state.go('article/detail', {id: articleId})
            };

        }])
    .factory('Reddit', ['ArticleService', '$timeout', function (ArticleService, $timeout) {
        var Reddit = function () {
            this.items = [];
            this.busy = false;
            this.filters = {};
            this.count = 2;
            this.page = 1;
        };

        Reddit.prototype.loadData = function () {
            var self = this;
            self.filters = self.filters || {};
            var params = {
                //fields : '_id,name',
                filters: self.filters,
                page   : self.page,
                count  : self.count
            };

            ArticleService.loadList(params).then(function (response) {
                if (response.success) {
                    if (response.data) {
                        self.items = self.items.concat(response.data);
                    }
                }
                self.busy = false;

            });
        };


        Reddit.prototype.nextPage = function () {
            if (this.busy) return;
            this.busy = true;
            this.page++;
            this.loadData();
        };

        return Reddit;
    }])
;