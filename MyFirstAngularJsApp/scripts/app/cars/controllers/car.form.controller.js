angular.module('app')

.controller('carFormController', ['$scope', '$http', '$location', '$routeParams', 'carService', carFormControllerFn]);

// Controlador para el listado de Posts
function carFormControllerFn($scope, $http, $location, $routeParams, carService) {

    $scope.isEdit = false;
    $scope.carId = 0;
    $scope.car = {
        carId: 0,
        color: "",
        fechaModelo: new Date(),
        marca: "",
        modelo: "",
        matricula: ""
    };

    // Setea en el scope si es edición y en el id del elemento a editar en tal caso
    getParamsUrl();
    if ($scope.isEdit) {
        carService.findOne($scope.carId).then(response => setCar(response.data),
                                                error => alert("Error FindOne"));;
    }
    //console.log($scope.car);

    // Guarda el objeto introducido en el form y actualiza el scope
    $scope.submitForm = function (newCar) {
        carService.saveCar(newCar, $scope.isEdit).then(response => {
            // Resetea el scope
            $scope.reset();

            // Regresa al listado de posts
            $location.path('/car/list');
        },
           error => alert("Error Save Form"));
    };

    // Función que limpia el objeto informado en el form
    $scope.reset = function () {
        $scope.car = {
            carId: 0,
            color: "",
            fechaModelo: new Date(),
            marca: "",
            modelo: "",
            matricula: ""
        };
    };

    // Setea los valores de la URL en el controlador
    function getParamsUrl() {
        var urlSplit = $location.path().split("/");

        if (urlSplit[2] == 'edit' && $routeParams.id != undefined) {
            $scope.isEdit = true;
            $scope.carId = $routeParams.id;
        }
    };

    // Setea el objeto en el scope del controlador
    function setCar(data) {
        $scope.car = {
            carId: data.CarId,
            color: data.Color,
            fechaModelo: new Date(data.FechaModelo),
            marca: data.Marca,
            modelo: data.Modelo,
            matricula: data.Matricula
        };
    };
};


