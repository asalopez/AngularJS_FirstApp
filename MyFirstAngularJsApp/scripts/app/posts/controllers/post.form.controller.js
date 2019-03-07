angular.module('app')

.controller('postFormController', ['$scope', '$http', '$location', '$routeParams', 'localStorageService', postFormController]);

// Controlador para el listado de Posts
function postFormController($scope, $http, $location, $routeParams, localStorageService) {

    //console.log($routeParams.id);
    //console.log($location.path());   
    
    $scope.isEdit = false;
    $scope.postId = 0;

    // Setea en el scope si es edición y en el id del elemento a editar en tal caso
    getParamsUrl();
    if ($scope.isEdit) {
        $scope.post = angular.copy(localStorageService.findOne($scope.postId));
    }
    //console.log($scope.post);

    // Guarda el objeto introducido en el form y actualiza el scope
    $scope.submitPost = function (newPost) {
        localStorageService.savePost(newPost);

        // Resetea el scope
        $scope.reset();

        // Back to el listado de posts
        $location.path('/list');
    };

    // Función que limpia el objeto informado en el form
    $scope.reset = function () {
        $scope.post = {
            title: "",
            body: ""
        };
    };

    // Setea los valores de la URL en el controlador
    function getParamsUrl() {
        var urlSplit = $location.path().split("/");

        if (urlSplit[2] == 'edit' && $routeParams.id != undefined) {
            $scope.isEdit = true;
            $scope.postId = $routeParams.id;
        }
    };
};


