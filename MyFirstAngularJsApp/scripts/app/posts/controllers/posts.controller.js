angular.module('app')

.controller('postsController', ['$scope', '$http', 'localStorageService', postsController]);

// Controlador para los Posts
function postsController($scope, $http, localStorageService, $route, $routeParams, $location) {

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

    // Guarda el objeto introducido en el form y actualiza el scope
    $scope.submitPost = function (newPost) {
        $scope.posts = localStorageService.savePost(newPost);

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

