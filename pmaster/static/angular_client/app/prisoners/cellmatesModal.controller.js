(function() {
    'use strict';
    angular.module('prisonMaster.prisoners').controller('CellmatesModalController', cellmatesModal);

    function cellmatesModal($uibModalInstance, prisoner, cellmates) {
        var ctrl = this;

        ctrl.prisoner = prisoner;
        ctrl.cellmates = cellmates;
        ctrl.ok = ok;

        function ok() {
            $uibModalInstance.close();
        }
    }
})();
