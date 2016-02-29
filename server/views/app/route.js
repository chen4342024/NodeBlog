angular.module('myApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    // setup an abstract state for the tabs directive
        .state('info', {
            url        : '/info',
            controller : 'InfoCtrl',
            templateUrl: 'app/personal.info/info.tpl.html'
        })
        .state('admin/user', {
            url        : '/admin/user',
            templateUrl: 'admin/user/user.tpl.html'
        })
        .state('article/:id', {
            url        : '/article/:id',
            templateUrl: 'app/article/article.tpl.html'
        })
        .state('index', {
            url        : '/index',
            templateUrl: 'app/index/index.tpl.html'
        })
        .state('workbench',{
            url:'/workbench',
            templateUrl:'app/workbench/workbench.tpl.html'
        })
    ;
    $urlRouterProvider.otherwise('/index');
})
;
