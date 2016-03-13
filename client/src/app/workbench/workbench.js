"use strict";
angular.module('app.controllers')
    .controller('WorkbenchCtrl', [
        '$scope', 'AppConfig', 'CategoryService', 'ArticleService', '$uibModal', '$log', 'SweetAlert', 'CustomUtil',
        function ($scope, AppConfig, CategoryService, ArticleService, $uibModal, $log, SweetAlert, CustomUtil) {
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
            $scope.checkIsActiveCategory = function (category) {
                return ($scope.activeCategory && $scope.activeCategory._id == category._id) ? "active" : "";
            };

            $scope.submitCategory = function () {
                CategoryService.insertOrUpdate($scope.formCategory).then(function () {
                    freshAllCategory();
                });
            };
            $scope.updateCategory = function (category) {
                $scope.formCategory = category;
                $scope.openEditModel(false);
            };
            $scope.deleteCategory = function (id) {
                SweetAlert.confirmDelete(function (isConfirm) {
                    if (isConfirm) {
                        CategoryService.delete(id).then(function () {
                            freshAllCategory();
                        });
                    }
                });
            };

            //文章
            $scope.loadArticleList = function () {
                var params = {
                    fields : '_id,title',
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
                        if (isNew) {
                            $scope.articles.splice(0, 0, newArticle);
                        } else {
                            CustomUtil.replace($scope.articles, newArticle, function (v) {
                                return v._id === newArticle._id;
                            });
                            SweetAlert.success("保存成功");
                        }
                    }
                })
            };

            $scope.publishArticle = function () {
                $scope.activeArticle.publish = true;
                ArticleService.insertOrUpdate($scope.activeArticle).then(function (response) {
                    if (response.success) {
                        var newArticle = response.data;
                        CustomUtil.replace($scope.articles, newArticle, function (v) {
                            return v._id === newArticle._id;
                        });
                        SweetAlert.success("发布成功");
                    }
                })
            };

            $scope.deleteArticle = function (id) {
                SweetAlert.confirmDelete(function (isConfirm) {
                    if (isConfirm) {
                        ArticleService.delete(id).then(function () {
                            $scope.loadArticleList();
                        });
                    }
                });
            };

            $scope.choseArticle = function (article) {
                var id = article._id;
                ArticleService.getById(id).then(function (response) {
                    if (response.success) {
                        $scope.activeArticle = response.data;
                    }
                });
            };

            $scope.checkIsActive = function (article) {
                return ($scope.activeArticle && $scope.activeArticle._id == article._id) ? "active" : "";
            };

            init();

            $scope.openEditModel = function (size, isNew) {
                var modalInstance = $uibModal.open({
                    animation  : true,
                    templateUrl: 'myModalContent.html',
                    controller : 'ModalInstanceCtrl',
                    size       : size,
                    resolve    : {
                        formCategory: function () {
                            return $scope.formCategory;
                        },
                        title       : function () {
                            return isNew ? "新建目录" : "编辑目录";
                        }
                    }
                });
                modalInstance.result.then(function (formCategory) {
                    $scope.formCategory = formCategory;
                    $scope.submitCategory();
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };
        }]
    )
    .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, formCategory, title) {
        $scope.formCategory = formCategory;
        $scope.title = title;
        $scope.ok = function () {
            if ($scope.categoryForm.$invalid) {
                alert("提交出错，请检查信息");
            } else {
                $uibModalInstance.close($scope.formCategory);
            }
        };
        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });