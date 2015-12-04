(function() {
    'use strict';
    angular.module('prisonMaster.layout')
    .directive('pmNavBar', function () {
        return {
            restrict: 'E',
            templateUrl: '/static/angular_client/app/layout/navbar/homeNavbar.html',
            controller: 'NavBar',
            controllerAs: 'navbar',
        };
    });
})();
