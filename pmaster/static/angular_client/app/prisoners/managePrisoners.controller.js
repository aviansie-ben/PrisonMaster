(function() {
    'use strict';
    angular.module('prisonMaster.prisoners').controller('ManagePrisonersController', managePrisoners);

    function managePrisoners($uibModal) {
        var ctrl = this;

        ctrl.isolateModal = openIsolate;
        ctrl.cellmatesModal = openCellmates;
        ctrl.moveModal = openMove;

        ctrl.prisoners = [
            {
                first_name: "Darth",
                last_name: "Vader",
                cell: {
                    number: 1
                },
                id: 124135
            },
            {
                first_name: "Darth",
                last_name: "Brooks",
                cell: {
                    number: 1
                },
                id: 124134
            },
            {
                first_name: "Darth",
                last_name: "SaladHead",
                cell: {
                    number: 1
                },
                id: 124133
            },
            {
                first_name: "Darth",
                last_name: "Sithius",
                cell: {
                    number: 2
                },
                id: 124132
            },
            {
                first_name: "Bubba",
                last_name: "Shrimp",
                cell: {
                    number: 2
                },
                id: 124131
            }
        ];

        function openIsolate() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prisoners/isolateModal.html',
                controller: 'IsolateModalController',
                controllerAs: 'IsoModalCtrl'
            });
        }

        function openCellmates() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prisoners/cellmatesModal.html',
                controller: 'CellmatesModalController',
                controllerAs: 'CmModalCtrl'
            });
        }

        function openMove() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prisoners/movePrisonerModal.html',
                controller: 'MovePrisonerModalController',
                controllerAs: "MvModalCtrl"
            });
        }

    }
})();
