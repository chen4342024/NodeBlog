"use strict";
angular.module('app.controllers')
    .controller('WorkbenchCtrl', [
        '$scope', 'AppConfig', 'CategoryService', 'ArticleService',
        function ($scope, AppConfig, CategoryService, ArticleService) {
            $scope.ueditorHeight = document.body.clientHeight - 65 - 103;
            $scope.config = {
                serverUrl         : AppConfig.WEB_API_ROOT + "ue/uploads",
                initialFrameHeight: $scope.ueditorHeight,
                autoHeightEnabled : false
            };

            $scope.ready = function (editor) {
                alert(editor.getContent());
            };

            $scope.formCategory = {};

            function init() {
                $scope.activeCategory = {};
                freshAllCategory();
            }

            //分类
            var freshAllCategory = function () {
                CategoryService.getAll().then(function (response) {
                    if (response.success) {
                        $scope.categorys = response.data;
                        $scope.activeCategory = $scope.categorys ? $scope.categorys[0] : {};
                        $scope.loadArticleList();
                    }
                });
            };


            $scope.choseCategory = function (category) {
                $scope.activeCategory = category;
                $scope.loadArticleList();
            };

            $scope.submitCategory = function () {
                if ($scope.categoryForm.$invalid) {
                    alert("提交出错，请检查信息");
                }
                CategoryService.insertOrUpdate($scope.formCategory).then(function () {
                    freshAllCategory();
                });
            };
            $scope.updateCategory = function (category) {
                $scope.formCategory = category;
            };
            $scope.deleteCategory = function (id) {
                CategoryService.delete(id).then(function () {
                    freshAllCategory();
                });
            };

            //文章
            $scope.loadArticleList = function () {
                var params = {
                    fields : '_id,name',
                    filters: {
                        category: $scope.activeCategory._id
                    }
                };
                ArticleService.loadList(params).then(function (response) {
                    if (response.success) {
                        $scope.articles = response.data;
                        $scope.activeArticle = $scope.articles ? $scope.articles[0] : {};
                    }
                });
            };

            $scope.addOrUpdateArticle = function (isNew) {
                if (isNew) {
                    $scope.activeArticle = {
                        "title"   : "无标题文章",
                        "author"  : 1,
                        "category": $scope.activeCategory
                    };
                }
                ArticleService.insertOrUpdate($scope.activeArticle).then(function (response) {
                    if (response.success) {
                        var newArticle = response.data;
                        $scope.articles.splice(0, 0, newArticle);
                    }
                })
            };

            $scope.publishArticle = function () {
                $scope.activeArticle.publish = true;
                ArticleService.insertOrUpdate($scope.activeArticle).then(function (response) {
                    if (response.success) {
                        var newArticle = response.data;
                        $scope.articles.splice(0, 0, newArticle);
                    }
                })
            };

            $scope.deleteArticle = function (id) {
                ArticleService.delete(id).then(function () {
                    $scope.loadArticleList();
                });
            };

            $scope.choseArticle = function (article) {
                $scope.activeArticle = article;
            };

            $scope.checkIsActive = function (article) {
                return ($scope.activeArticle && $scope.activeArticle._id == article._id) ? "active": "";
            };

            init();
        }]
    );