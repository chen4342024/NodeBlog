angular.module('common.services')
    .factory('CategoryService', ['$http', 'AppConfig', 'WebApi', function ($http, AppConfig, WebApi) {
        return {
            loadList      : function (params) {
                var config = {
                    url   : AppConfig.API_URL + "categorys",
                    params: params
                };
                return WebApi.Get(config);
            },
            getAll        : function () {
                var config = {
                    url: AppConfig.API_URL + "categorys/all"
                };
                return WebApi.Get(config);
            },
            getById       : function (id) {
                var config = {
                    url: AppConfig.API_URL + "categorys/" + id
                };
                return WebApi.Get(config);
            },
            insertOrUpdate: function (data) {
                var config = {
                    url : AppConfig.API_URL + "categorys",
                    data: {
                        "category": data
                    }
                };
                return WebApi.Post(config);
            },

            delete: function (id) {
                var config = {
                    url: AppConfig.API_URL + "categorys/" + id
                };
                return WebApi.Delete(config);
            }
        };
    }]);