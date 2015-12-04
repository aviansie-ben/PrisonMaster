(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('ViewScheduleModalController', viewScheduleModal);

    function viewScheduleModal($uibModalInstance, $uibModal, accessPoint) {
        var ctrl = this;

        ctrl.accessPoint = accessPoint;
        ctrl.schedules = accessPoint.schedules;
        ctrl.openAddSchedModal = openAddSchedModal;
        ctrl.deleteSched = deleteSched;
        ctrl.ok = ok;
        ctrl.cancel = close;

        function openAddSchedModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prison/addScheduleModal.html',
                controller: 'AddScheduleModalController',
                controllerAs: "AddSchedModalCtrl",
                resolve: {
                    scheduleList: function() {
                        return ctrl.schedules;
                    }
                },
            });
        }

        function deleteSched(i) {
            ctrl.schedules.splice(i, 1);
        }

        function ok() {
            $uibModalInstance.close();
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
