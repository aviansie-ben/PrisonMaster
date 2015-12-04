(function() {
    'use strict';
    angular.module('prisonMaster.prisoners').controller('MovePrisonerModalController', movePrisonerModal);

    function movePrisonerModal($uibModalInstance, prisonersResource, prisoner, cellOptions) {
        var ctrl = this;

        ctrl.prisoner = prisoner;
        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {};
        ctrl.fields = [
            {
                type: 'select',
                key: 'cell',
                templateOptions: {
                    label: 'Select a location',
                    options: makeCellOptions()
            }
        }];

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function makeCellOptions() {
            // generate a list for the select box
            var l = [];
            for (var i = 0; i < cellOptions.data.length; i++) {
                // don't allow prisoners to be moved to the cell they are in, or the staging cell
                if (cellOptions.data[i].number != ctrl.prisoner.cell.number && cellOptions.data[i].id != 1) {
                    var p = {};
                    p.name = "Cell " + cellOptions.data[i].number;
                    p.value = cellOptions.data[i].id;
                    l.push(p);
                }
            }
            return l;
        }

        function onSubmit() {
            prisonersResource.update({id:ctrl.prisoner.id}, ctrl.model).$promise.then(function(response) {
                ctrl.prisoner.cell.number = response.data.cell.number;
                ctrl.prisoner.cell.id = response.data.cell.id;
                ctrl.prisoner.cell.label = response.data.cell.number;
                $uibModalInstance.close();
            });
        }
    }
})();
