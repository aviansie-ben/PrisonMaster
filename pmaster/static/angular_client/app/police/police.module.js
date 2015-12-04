(function() {
    'use strict';
    angular.module('prisonMaster.police', ['ngAnimate', 'ui.router', 'ui.bootstrap', 'formly', 'formlyBootstrap', 'prisonMaster.layout', 'prisonMaster.api'])
        .config(function($stateProvider) {
            $stateProvider
                .state('policeAdministration', {
                    url: '/police/admin',
                    views: {
                        'main': {
                            templateUrl: '/static/angular_client/app/police/policeAdmin.html',
                            controller: 'PoliceAdministrationController',
                            controllerAs: 'PoliceCtrl',
                            resolve: {
                                prisoners: function(prisonersResource) {
                                    return prisonersResource.list().$promise;
                                }
                            }
                        },
                        'navBar': {
                            templateUrl: '/static/angular_client/app/layout/navbar/policeNavbar.html'
                        }
                    }
                });
        });
})();
