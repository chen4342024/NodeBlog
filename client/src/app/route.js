angular.module('myApp').config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html'
        })

        // Each tab has its own nav history stack:
        .state('tab.main', {
            url: '/main',
            views: {
                'tab-main': {
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl'
                }
            }
        })

        .state('tab.chats', {
            url: '/chats',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/tab-chats.html',
                    controller: 'ChatsCtrl'
                }
            }
        })
        .state('tab.chat-detail', {
            url: '/chats/:chatId',
            views: {
                'tab-chats': {
                    templateUrl: 'templates/chat-detail.html',
                    controller: 'ChatDetailCtrl'
                }
            }
        })

        .state('tab.account', {
            url: '/account',
            views: {
                'tab-account': {
                    //templateUrl: 'app/account/info/info.html',
                    //controller: 'InfoCtrl'
                    templateUrl: 'app/account/account.html',
                    controller: 'AccountCtrl'
                }
            }
        })

        .state('tab.editInfo', {
            url: '/account/editInfo:name',
            views: {
                'tab-account': {
                    templateUrl: 'app/account/editInfo/editInfo.html',
                    controller: 'EditInfoCtrl'
                }
            }
        })

        .state('tab.sexPanel', {
            url: '/account/editInfo/editSex',
            views: {
                'tab-account': {
                    templateUrl: 'app/account/editInfo/editSex/sexPanel.html',
                    controller: 'SexPanelCtrl'
                }
            }
        })

        .state('tab.address', {
            url: '/account/address:name',
            views: {
                'tab-account': {
                    templateUrl: 'app/account/address/address.html',
                    controller: 'AddressCtrl'
                }
            }
        })

        .state('tab.linkScene', {
            url: '/linkScene',
            views: {
                'tab-linkScene': {
                    templateUrl: 'app/linkScene/list/linkScene.html',
                    controller: 'linkSceneCtrl'
                }
            }
        })

        .state('tab.linkSceneDownload', {
            url: '/linkScene/download/:sceneNum',
            views: {
                'tab-linkScene': {
                    templateUrl: 'app/linkScene/download/download.html',
                    controller: 'linkSceneDownloadCtrl'
                }
            }
        })

        .state('tab.linkSceneStart', {
            url: '/linkScene/start/:pavilionMajor',
            views: {
                'tab-linkScene': {
                    templateUrl: 'app/linkScene/start/linkSceneStart.html',
                    controller: 'linkSceneStartCtrl'
                }
            }
        })

        .state('tab.linkSceneExhibit', {
            url: '/linkScene/exhibit/:pavilionMajor',
            views: {
                'tab-linkScene': {
                    templateUrl: 'app/linkScene/exhibit/exhibit.html',
                    controller: 'linkSceneExhibitCtrl'
                }
            }
        })

        .
        state('tab.linkSceneDetail', {
            url: '/linkScene/detail/:exhibitNum',
            views: {
                'tab-linkScene': {
                    templateUrl: 'app/linkScene/detail/linkSceneDetail.html',
                    controller: 'linkSceneDetailCtrl'
                }
            }
        })

        .state('tab.guideDetail', {
            url: '/linkScene/guide/detail',
            views: {
                'tab-linkScene': {
                    templateUrl: 'app/linkScene/guide/detail/detail.html',
                    controller: 'SceneGuideCtrl'
                }
            }
        })

        .state('tab.iframe', {
            url: '/iframe',
            views: {
                'tab-linkScene': {
                    templateUrl: 'app/iframe/iframe.html',
                    controller: 'AudioCtrl'
                }
            }
        })

        .state('welcome', {
            url: '/welcome',
            templateUrl: 'app/welcome/welcome.html',
            controller: 'WelcomeCtrl'
        });

    if (!window.localStorage['first']) {
        $urlRouterProvider.otherwise('/welcome');
    } else {
        // $urlRouterProvider.otherwise('/tab/index');
        $urlRouterProvider.otherwise('/tab/main');
    }
})
;
