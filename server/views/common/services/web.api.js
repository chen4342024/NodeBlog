angular.module('common.services')
    .factory('WebApi', ['$http', '$q', 'AppConfig', function ($http, $q, AppConfig) {
        return {
            request: function (config) {
                var deferred = $q.defer();

                $http(config).success(function (response, status) {
                    if (response.error != null) {
                        deferred.reject(response.error);
                    } else {
                        deferred.resolve(response);
                    }
                }).error(function (response, status) {
                    deferred.reject(response.error);
                });
                return deferred.promise;
            },
            Get    : function (config) {
                config = config || {};
                config.method = "GET";
                return this.request(config);
            },
            Post   : function (config) {
                config = config || {};
                config.method = "POST";
                return this.request(config);
            },
            Delete : function (config) {
                config = config || {};
                config.method = "DELETE";
                return this.request(config);
            },
            Put    : function (config) {
                config = config || {};
                config.method = "PUT";
                return this.request(config);
            }
        };
    }]);