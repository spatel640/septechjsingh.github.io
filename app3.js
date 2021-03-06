var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: '/step1a.html',
            controller: 'HomeController'
        })
        .when('/step2', {
            templateUrl: '/step2.html',
            controller: 'InfoController'
        })

    .when('/step3', {
        templateUrl: '/step3.html',
        controller: 'ReviewController'
    })

    .when('/step4', {
        templateUrl: '/step4.html',
        controller: 'ConfirmController'
    })

    .otherwise({
        redirectTo: '/'
    });
});

app.controller('HomeController', function ($scope) {
    $scope.message = 'STEP 1 - General Info';
});

app.controller('InfoController', function ($scope) {
    $scope.message = 'STEP 2 - Specific Info';
});

app.controller('ReviewController', function ($scope) {
    $scope.message = 'STEP 3 - Submit';
});

app.controller('ConfirmController', function ($scope) {
    $scope.message = "STEP 4 - Confirmation";
});
