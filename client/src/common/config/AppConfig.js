angular.module('common.config')
    .factory('AppConfig', [function () {
        var WEB_API_ROOT = "http://localhost:3000/";
        return {
            WEB_API_ROOT: WEB_API_ROOT,
            API_URL     : WEB_API_ROOT + 'api/'
        };
    }]);