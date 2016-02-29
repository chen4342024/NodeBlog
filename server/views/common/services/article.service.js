angular.module('common.services')
    .factory('ArticleService', ['$http', 'AppConfig', 'WebApi', function ($http, AppConfig, WebApi) {
        return {
            loadList      : function (params) {
                var config = {
                    url   : AppConfig.API_URL + "articles",
                    params: params
                };
                return WebApi.Get(config);
            },
            getAll        : function () {
                var config = {
                    url: AppConfig.API_URL + "articles/all"
                };
                return WebApi.Get(config);
            },
            getById       : function (id) {
                var config = {
                    url: AppConfig.API_URL + "articles/" + id
                };
                return WebApi.Get(config);
            },
            insertOrUpdate: function (data) {
                var config = {
                    url : AppConfig.API_URL + "articles",
                    data: {
                        "article": data
                    }
                };
                return WebApi.Post(config);
            },

            delete: function (id) {
                var config = {
                    url: AppConfig.API_URL + "articles/" + id
                };
                return WebApi.Delete(config);
            }
        };
    }]);