(function() {
    'use strict';
    angular.module('prisonMaster.layout', ['ui.router'])
        .config(function($stateProvider) {
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/static/angular_client/app/layout/home.html'
                });
        })
        .run(function(formlyConfig) {
            formlyConfig.setType({
                name: 'datepicker',
                templateUrl:  '/static/angular_client/app/layout/datepicker.html',
                wrapper: ['bootstrapLabel', 'bootstrapHasError'],
                defaultOptions: {
                    templateOptions: {
                        datepickerOptions: {
                            format: 'yyyy-MM-dd',
                            initDate: new Date()
                        }
                    }
                },
                controller: ['$scope', function ($scope) {
                    $scope.datepicker = {};
                    $scope.datepicker.opened = false;
                    $scope.datepicker.open = function ($event) {
                        $scope.datepicker.opened = true;
                    };
                }]
            });
        });
})();
