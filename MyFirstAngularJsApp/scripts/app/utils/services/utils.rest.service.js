angular.module('app')

.service('restService', ['$http', 'localStorageService', '$q', restServiceFn]);

function restServiceFn($http, localStorageService, $q) {

    // For JSON configurations
    this.getJSONFile = function (route) {
        return $http.get(route);
    };

    this.get = function (uri, apiRoute) {

        var result = $q.defer();

        var auth = '';
        var token = localStorage.getItem("apiToken");

        if (token) {
            auth = 'Bearer ' + JSON.parse(token).access_token;
        }

        $http({
            method: 'GET',
            url: uri + apiRoute,
            headers: { 'Content-Type': 'application/json', 'Authorization': auth }
        }).then(function (response) {
            result.resolve(response);
        }, function (err) {
            console.log(err);
            if (err.status == 500) {
                result.reject({ 'status': '500', 'data': { 'Message': 'Se ha producido un error en la aplicación' } });
            }
            else {
                result.reject(err);
            }

        });

        return result.promise;
    };

    this.put = function (uri, apiRoute, model) {

        var result = $q.defer();

        var auth = '';
        var token = localStorage.getItem("apiToken");

        if (token) {
            auth = 'Bearer ' + JSON.parse(token).access_token;
        }

        $http({
            method: 'PUT',
            url: uri + apiRoute,
            headers: { 'Content-Type': 'application/json', 'Authorization': auth },
            data: model
        }).then(function (response) {
            result.resolve(response);
        }, function (err) {
            console.log(err);
            if (err.status == 500) {
                result.reject({ 'status': '500', 'data': { 'Message': 'Se ha producido un error en la aplicación' } });
            }
            else {
                result.reject(err);
            }

        });

        return result.promise;
    };

    this.del = function (uri, apiRoute) {

        var result = $q.defer();

        var auth = '';
        var token = localStorage.getItem("apiToken");

        if (token) {
            auth = 'Bearer ' + JSON.parse(token).access_token;
        }

        $http({
            method: 'DELETE',
            url: uri + apiRoute,
            headers: { 'Content-Type': 'application/json', 'Authorization': auth }
        }).then(function (response) {
            result.resolve(response);
        }, function (err) {
            console.log(err);
            if (err.status == 500) {
                result.reject({ 'status': '500', 'data': { 'Message': 'Se ha producido un error en la aplicación' } });
            }
            else {
                result.reject(err);
            }

        });

        return result.promise;
    };

    this.post = function (uri, apiRoute, model) {

        var result = $q.defer();

        var auth = '';
        var token = localStorage.getItem("apiToken");

        if (token) {
            auth = 'Bearer ' + JSON.parse(token).access_token;
        }

        $http({
            method: 'POST',
            url: uri + apiRoute,
            headers: { 'Content-Type': 'application/json', 'Authorization': auth },
            data: model
        }).then(function (response) {
            result.resolve(response);
        }, function (err) {
            console.log(err);
            if (err.status == 500) {
                result.reject({ 'status': '500', 'data': { 'Message': 'Se ha producido un error en la aplicación' } });
            }
            else {
                result.reject(err);
            }

        });

        return result.promise;
    };
}