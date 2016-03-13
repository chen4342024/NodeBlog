angular.module('common.util')
    .factory('CustomUtil', ['_', function () {
        var util = {};
        util.replace = function (collection, newValue, fn) {
            _.each(collection, function (v, k, list) {
                if (fn(v)) {
                    list[k] = newValue;
                }
            });
        };
        return util;
    }]);