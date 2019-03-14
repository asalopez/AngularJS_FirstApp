var app = angular.module('app', ['ngStorage', 'ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/post/list', {
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
        .when('/car/list', {
            templateUrl: '../../templates/car.list.html',
            controller: 'carListController'
        })
        .when('/car/add', {
            templateUrl: '../../templates/car.form.html',
            controller: 'carFormController'
        })
        .when('/car/edit/:id', {
            templateUrl: '../../templates/car.form.html',
            controller: 'carFormController'
        })
        .otherwise({
            redirectTo: '/post/list'
        });

    // enable html5Mode for pushstate ('#'-less URLs)
    //$locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');
}]);
