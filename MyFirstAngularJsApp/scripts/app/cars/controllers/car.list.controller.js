angular.module('app')

.controller('carListController', ['$scope', '$http', 'carService', 'paginationService', '$filter', carListControllerFn]);

function carListControllerFn($scope, $http, carService, paginationService, $filter) {

    // Array para almacenar los coches
    $scope.cars = [];

    // Paginación Coches
    $scope.gridCarsPageSelected = 0;
    $scope.totalPagsCars = 0;
    $scope.itemsPerPageCars = 5;
    $scope.carsFiltered = [];
    $scope.gridCarsPagination = [];

    if ($scope.cars.length == 0) {
        getCars();
    }

    // Obtiene el listado de coches
    function getCars() {
        carService.getCars().then(response => {
            $scope.cars = response.data;

            $scope.renderView($scope.cars);

            // Paginación
            //$scope.getCarsPaginated(0);
        },
        error => alert("Error"));
    }

    $scope.renderView = function (ordersLinesPendings) {
        $scope.carsFiltered = angular.copy(ordersLinesPendings);
        $scope.carsPaginated = angular.copy(ordersLinesPendings);
        $scope.carsView = angular.copy(ordersLinesPendings);

        // Restablecemos los candidatos seleccionados
        $scope.getCarsPaginated(0);
        utilitiesFct.setSpinner(false);
    };

    // Pagination Section
    $scope.getCarsPaginated = function (pag, pagingFromsorting) {
        // Forzamos la paginación al ordernar el grid. En otro caso, validamos como siempre
        var forcePaging = pagingFromsorting || pag != $scope.gridCarsPageSelected;

        if (pag == 0 || (pag != "..." && forcePaging && ((pag != "←" && pag != "→") || (pag == "←" && $scope.gridCarsPageSelected > 1) || (pag == "→" && $scope.gridCarsPageSelected < $scope.totalPagsCars)))) {

            switch (pag) {
                case 0:
                    $scope.gridCarsPageSelected = 1;
                    pag = 1;
                    break;
                case "←":
                    $scope.gridCarsPageSelected = $scope.gridCarsPageSelected - 1;
                    break;
                case "→":
                    $scope.gridCarsPageSelected = $scope.gridCarsPageSelected + 1;
                    break;
                default:
                    $scope.gridCarsPageSelected = pag;
                    break;
            }

            $scope.totalPagsCars = Math.ceil($scope.carsFiltered.length / $scope.itemsPerPageCars);

            // Paginación
            $scope.gridCarsPagination = paginationService.getPagination($scope.gridCarsPageSelected, $scope.totalPagsCars);

            var begin = (($scope.gridCarsPageSelected - 1) * $scope.itemsPerPageCars);
            var end = begin + $scope.itemsPerPageCars;

            $scope.carsPaginated = $scope.carsFiltered.slice(begin, end);

            $scope.carsView = $scope.carsPaginated;
        }
    };


    // Función que elimina un elemento de la lista
    $scope.removeCar = function (id) {
        console.log(id);
        carService.removeCar(id).then(response => getCars(),
                                        error => alert("Error Delete"));
    };
};