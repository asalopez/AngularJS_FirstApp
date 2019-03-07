var app = angular.module('app', ['ngStorage', 'ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/list', {
            templateUrl: '../../templates/post.list.html',
            controller: 'postListController'
        })
        .when('/post/add', {
            templateUrl: '../../templates/post.form.html',
            controller: 'postFormController'
        })
        .when('/post/edit/:id', {
            templateUrl: '../../templates/post.form.html',
            controller: 'postFormController'
        })
        .when('/page1', {
            templateUrl: '../../templates/page1.html',
            controller: 'page1Controller'
        })
        .otherwise({
            redirectTo: '/list'
        });

    // enable html5Mode for pushstate ('#'-less URLs)
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');
}]);
