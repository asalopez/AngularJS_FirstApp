angular.module('app')

.controller('postFormController', ['$scope', '$http', 'localStorageService', postFormController]);

// Controlador para el listado de Posts
function postFormController($scope, $http, localStorageService, $route, $routeParams, $location) {

    // Guarda el objeto introducido en el form y actualiza el scope
    $scope.submitPost = function (newPost) {
        localStorageService.savePost(newPost);

        // Resetea el scope
        $scope.reset();
    };

    // Función que limpia el objeto informado en el form
    $scope.reset = function () {
        $scope.post = {
            title: "",
            body: ""
        };
    };

    $scope.reset();
};

