(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('AccessCardModalController', accessCardModalController);

    function accessCardModalController($uibModalInstance) {
        var ctrl = this;

        ctrl.ok = submit;
        ctrl.cancel = close;

        function submit() {
            $uibModalInstance.close();
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
