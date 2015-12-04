(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('LogModalController', logModal);

    function logModal($uibModalInstance, accessPoint, logs) {
        var ctrl = this;

        ctrl.accessPoint = accessPoint;
        ctrl.logs = logs.data.access_logs;
        ctrl.ok = ok;

        function ok() {
            $uibModalInstance.close();
        }
    }
})();
