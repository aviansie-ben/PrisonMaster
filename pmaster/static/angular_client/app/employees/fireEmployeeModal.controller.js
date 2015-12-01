(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('FireEmployeeModalController', fireEmployeeModal);

    function fireEmployeeModal($uibModalInstance) {
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
