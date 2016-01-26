angular.module('myApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
        .state('info', {
            url        : '/info',
            controller : 'InfoCtrl',
            templateUrl: 'personal.info/info.tpl.html'
        })
        .state('admin/user', {
            url        : '/admin/user',
            templateUrl: 'admin/user/user.tpl.html'
        })
    ;
    if (!window.localStorage['first']) {
        $urlRouterProvider.otherwise('/welcome');
    } else {
        // $urlRouterProvider.otherwise('/tab/index');
        $urlRouterProvider.otherwise('/tab/main');
    }
})
;
