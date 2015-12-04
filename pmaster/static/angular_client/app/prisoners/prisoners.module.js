(function() {
    'use strict';
    angular.module('prisonMaster.prisoners', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'prisonMaster.layout', 'prisonMaster.api'])
        .config(function($stateProvider) {
            $stateProvider
                .state('managePrisoners', {
                    url: '/warden/manage/prisoners',
                    views: {
                        'main': {
                            templateUrl: '/static/angular_client/app/prisoners/managePrisoners.html',
                            controller: 'ManagePrisonersController',
                            controllerAs: 'PrisonersCtrl',
                            resolve: {
                                prisoners: function(prisonersResource) {
                                    return prisonersResource.list().$promise;
                                }
                            }
                        },
                        'navBar': {
                            templateUrl: '/static/angular_client/app/layout/navbar/wardenNavbar.html'
                        }
                    }
                });
        });
})();
