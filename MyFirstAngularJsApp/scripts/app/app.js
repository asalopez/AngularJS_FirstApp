var app = angular.module('app', ['ngStorage', 'ngRoute'])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '../../templates/post.list.html',
            controller: 'postListController'
        })
        .when('/post/form', {
            templateUrl: '../../templates/post.form.html',
            controller: 'postFormController'          
        })
        .when('/page1', {
            templateUrl: '../../templates/page1.html',
            controller: 'page1Controller'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
