(function() {
    'use strict';
    angular.module('prisonMaster.prison', ['ui.router'])
        .config(function($stateProvider) {
            $stateProvider
                .state('wardenManagePrison', {
                    url: '/warden/manage/prison',
                    templateUrl: '/static/angular_client/app/prison/managePrison.html',
                    controller: 'ManagePrisonController',
                    controllerAs: 'PrisonCtrl',
                    resolve: {
                        accessPoints: function(accessPointsResource) {
                            return accessPointsResource.list().$promise;
                        }
                    },
                    onExit: function($stateParams) {
                        window.clearInterval($stateParams.timer);
                    },
                    params: {
                        timer: {}
                    }
                });
            $stateProvider
                .state('supervisorManagePrison', {
                    url: '/supervisor/manage/prison',
                    templateUrl: '/static/angular_client/app/prison/managePrison.html',
                    controller: 'ManagePrisonController',
                    controllerAs: 'PrisonCtrl',
                    resolve: {
                        accessPoints: function(accessPointsResource) {
                            return accessPointsResource.list().$promise;
                        }
                    },
                    onExit: function($stateParams) {
                        window.clearInterval($stateParams.timer);
                    },
                    params: {
                        timer: {}
                    }
                });
        });
})();
