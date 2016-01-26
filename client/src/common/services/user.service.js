angular.module('common.services')
    .factory('UserService', ['$http', 'AppConfig', 'WebApi', function ($http, AppConfig, WebApi) {
        return {
            loadList: function (params) {
                var config = {
                    url: AppConfig.API_URL + "users",
                    params: params
                };
                return WebApi.Get(config);
            },
            getAll: function () {
                var config = {
                    url: AppConfig.API_URL + "users/all"
                };
                return WebApi.Get(config);
            },
            getById: function (id) {
                var config = {
                    url: AppConfig.API_URL + "admin/users/" + id
                };
                return WebApi.Get(config);
            },
            insert: function (data) {
                var config = {
                    url: AppConfig.API_URL + "users",
                    data: data
                };
                return WebApi.Post(config);
            },
            update: function (id, data) {
                var config = {
                    url: AppConfig.API_URL + "users/" + id,
                    data: data
                };
                return WebApi.Put(config);
            },
            delete: function (id) {
                var config = {
                    url: AppConfig.API_URL + "users/" + id
                };
                return WebApi.Delete(config);
            }
        };
    }]);