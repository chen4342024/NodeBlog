var root = "./src/";
var lib = root + "lib/";
var setting = {
    root: root,
    lib : lib,
    js  : {
        lib   : [
            lib + "angular/angular.js",
            lib + "angular-ui-router/release/angular-ui-router.js",
            lib + "jquery/dist/jquery.js",
            lib + "bootstrap/dist/js/bootstrap.js",
            lib + "underscore/underscore.js",
            lib + "ueditor/ueditor.config.js",
            lib + "ueditor/ueditor.all.js",
            lib + "ueditor/lang/zh-cn/zh-cn.js",
            lib + "angular-ueditor/dist/angular-ueditor.js",
            lib + "angular-bootstrap/ui-bootstrap.js",
            lib + "angular-bootstrap/ui-bootstrap-tpls.js",
            lib + "sweetalert/dist/sweetalert-dev.js",
            lib + "ngInfiniteScroll/build/ng-infinite-scroll.js",
            lib + "ladda/dist/spin.min.js",
            lib + "ladda/dist/ladda.min.js",
            lib + "angular-ladda/dist/angular-ladda.js",
        ],
        app   : [
            root + 'app/app.js',
            root + 'app/route.js',
            root + 'app/**/*.js',
        ],
        admin : [
            root + 'admin/**/*.js',
        ],
        common: [
            root + 'common/**/*.js'
        ]
    },
    css : [
        lib + "bootstrap/dist/css/bootstrap.css",
        lib + "angular-bootstrap/ui-bootstrap-csp.css",
        lib + "sweetalert/dist/sweetalert.css",
        lib + "ladda/dist/ladda-themeless.min.css",
        root + 'admin/**/*.css',
        root + 'app/**/*.css',
        root + 'common/**/*.css',
        root + 'styles/**/*.css',

    ],

    html: [
        root + 'app/**/*.html',
        root + 'admin/**/*.html',
        root + 'index.html'
    ],

    assets: [
        root + 'assets/**/*',
    ],

    dest: '../server/views/'
};

//初始化allJs
setting.allJs = [];

for(var key in setting.js){
    setting.allJs = setting.allJs.concat(setting.js[key]);
}
module.exports = setting;