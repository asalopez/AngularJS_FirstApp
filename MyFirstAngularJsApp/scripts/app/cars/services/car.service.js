angular.module('app')

.service('carService', ['restService', carServiceFn]);

function carServiceFn(restService) {
    
    const API_CARS = 'http://localhost:8066/';

    // GET 
    this.getCars = function () {
        return restService.get(API_CARS, 'cars');
    };

    // FIND ONE
    this.findOne = function (carId) {
        return restService.get(API_CARS, `cars/${carId}`)
    };

    // POST - PUT
    this.saveCar = function (car, isEdit) {
        if (isEdit) {
            return restService.put(API_CARS, `${car.carId}`, car);
        }

        return restService.post(API_CARS, '', car);
    };

    // DELETE
    this.removeCar = function (carId) {
        return restService.del(API_CARS, `${carId}`);
    };

}