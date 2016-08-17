var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
        templateUrl: 'Citizen/step12.html',
        controller: 'HomeController'
    })

    .when('/step32', {
        templateUrl: 'Citizen/step32.html',
        controller: 'ReviewController'
    })

    .when('/step42', {
        templateUrl: 'Citizen/step42.html',
        controller: 'ConfirmController'
    })

    .otherwise({
        redirectTo: '/'
    });
});

app.controller('HomeController', function ($scope) {
    $scope.message = 'STEP 1 - General Info';
    $scope.message2 = 'STEP 2 - Specific Info';
});

app.controller('ReviewController', function ($scope) {
    $scope.message = 'STEP 3 - Submit';
});

app.controller('ConfirmController', function ($scope) {
    $scope.message = "STEP 4 - Confirmation";
});
