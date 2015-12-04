(function() {
    'use strict';
    angular.module('prisonMaster.police').controller('PoliceAdministrationController', policeAdmin);

    function policeAdmin($uibModal, prisoners) {
        var ctrl = this;

        ctrl.isolateModal = openIsolate;
        ctrl.cellmatesModal = openCellmates;
        ctrl.moveModal = openMove;
        ctrl.releaseModal = openRelease;
        ctrl.prisoners = checkCells(prisoners.data);

        function checkCells(prisonersList) {
            for (var i = 0; i < prisonersList.length; i++) {
                if (prisonersList[i].cell.id === 1) prisonersList[i].cell.label = "Unassigned";
                else prisonersList[i].cell.label = prisonersList[i].cell.number;
            }
            return prisonersList;
        }

        function openIsolate(ID) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prisoners/isolateModal.html',
                controller: 'IsolateModalController',
                controllerAs: 'IsoModalCtrl',
                resolve: {
                    prisoner: function(prisonersResource) {
                        return prisonersResource.isolationList({id:ID}).$promise;
                    },
                    prisonerOptions: function() {
                        // generate a list for mutliCheckbox
                        var l = [];
                        for (var i = 0; i < ctrl.prisoners.length; i++) {
                            // don't allow prisoners to be isolated from themselves
                            if (ID != ctrl.prisoners[i].id) {
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
                    cellmates: function(prisonersResource) {
                        return prisonersResource.cellmates({id:prisoner.id}).$promise;
                    }
                }
            });
        }

        function openMove(prisoner) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prisoners/movePrisonerModal.html',
                controller: 'MovePrisonerModalController',
                controllerAs: "MvModalCtrl",
                resolve: {
                    prisoner: function() {
                        return prisoner;
                    },
                    cellOptions: function(cellsResource) {
                        return cellsResource.list().$promise;
                    }
                }
            });
        }

        function openRelease(prisoner) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prisoners/releasePrisonerModal.html',
                controller: 'ReleasePrisonerModalController',
                controllerAs: "RelPrisonerModalCtrl",
                resolve: {
                    prisonerList: function() {
                        return ctrl.prisoners;
                    },
                    prisoner: function() {
                        return prisoner;
                    }
                }
            });
        }
    }
})();
