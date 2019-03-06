angular.module('app')

.controller('postListController', ['$scope', '$http', 'localStorageService', postListController]);

// Controlador para el listado de Posts
function postListController($scope, $http, localStorageService, $route, $routeParams, $location) {

    // Array por defecto
    $scope.posts = [];

    // Muestra/oculta el formulario
    $scope.displayForm = false;

    // Si no existen Posts en el LocalStorage, consulta
    if (!localStorageService.any()) {
        $http.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => setPosts(response.data),
                    error => alert("Error"));

        // Si existen, los almacena en el Scope
    } else {
        $scope.posts = localStorageService.get();
    }

    // Método encargado de llamar al servicio para guardar los Posts en el LocalStorage
    function setPosts(posts) {
        localStorageService.save(posts);
        $scope.posts = posts;
    };

    // Función que elimina un elemento de la lista
    $scope.removePost = function (postId) {
        console.log(postId);
        $scope.posts = localStorageService.remove(postId);
    };

    // Función que pinta en el formulario el objeto indicado para su modificación
    $scope.editPost = function (postId) {
        // Copia para setear el objeto de la tabla en el scope
        $scope.post = angular.copy(localStorageService.findOne(postId));
    };

    // Función que elimina todos los elementos la lista
    $scope.clearList = function () {
        localStorageService.removeAll();

        $scope.posts = [];
    };

    // Botón para mostrar el formulario
    $scope.displayForm = function () {
        console.log("Add Post Button Click")
        $scope.showForm = !$scope.showForm;
    };

    $scope.reset();
};

