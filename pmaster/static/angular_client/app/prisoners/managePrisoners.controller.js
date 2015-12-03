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
                id: 124135,
                isolated_prisoners: [
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
                ]
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

        function openIsolate(prisoner) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prisoners/isolateModal.html',
                controller: 'IsolateModalController',
                controllerAs: 'IsoModalCtrl',
                resolve: {
                    prisoner: function() {
                        return prisoner;
                    },
                    prisonerOptions: function() {
                        // generate a list for mutliCheckbox
                        var l = [];
                        for (var i = 0; i < ctrl.prisoners.length; i++) {
                            // don't allow prisoners to be isolated from themselves
                            if (prisoner.id != ctrl.prisoners[i].id) {
                                var p = {};
                                p.name = ctrl.prisoners[i].first_name + " " + ctrl.prisoners[i].last_name;
                                p.value = ctrl.prisoners[i].id;
                                l.push(p);
                            }
                        }
                        return l;
                    }
                }
            });
        }

        function openCellmates(prisoner) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prisoners/cellmatesModal.html',
                controller: 'CellmatesModalController',
                controllerAs: 'CmModalCtrl',
                resolve: {
                    prisoner: function() {
                        return prisoner;
                    },
                    cellmates: function() {
                        return ctrl.prisoners;
                    }
                }
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
