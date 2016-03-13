angular.module('myApp',
    [
        'ui.router',
        'app.controllers',
        'admin.controllers',
        'common.services',
        'common.util',
        'common.directives',
        'common.config',
        'ng.ueditor',
        'ui.bootstrap',
        'angular-ladda'
    ]
);

angular.module('app.controllers', []);
angular.module('admin.controllers', []);
angular.module('common.services', []);
angular.module('common.directives', []);
angular.module('common.config', []);
angular.module('common.util', []);

angular.module('myApp')
    .run(['AppConfig',
        function (AppConfig) {

        }
    ])
    .config(function (laddaProvider) {
        laddaProvider.setOption({
            /* optional */
            style       : 'expand-left',
            spinnerSize : 35,
            spinnerColor: '#ffffff'
        });
    })
;

