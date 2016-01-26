angular.module('myApp',
    [
        'ui.router',
        'app.controllers',
        'admin.controllers',
        'common.services',
        'common.directives',
        'common.config'
    ]
);
angular.module('app.controllers', []);
angular.module('admin.controllers', []);
angular.module('common.services', []);
angular.module('common.directives', []);
angular.module('common.config', []);

