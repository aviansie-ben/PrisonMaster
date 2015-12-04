(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('ViewScheduleModalController', viewScheduleModal);

    function viewScheduleModal($uibModalInstance, $uibModal, schedulesResource, accessPoint, schedules) {
        var ctrl = this;

        ctrl.accessPoint = accessPoint;
        ctrl.schedules = schedules.data.schedules;
        ctrl.openAddSchedModal = openAddSchedModal;
        ctrl.deleteSched = deleteSched;
        ctrl.ok = ok;

        function openAddSchedModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prison/addScheduleModal.html',
                controller: 'AddScheduleModalController',
                controllerAs: "AddSchedModalCtrl",
                resolve: {
                    scheduleList: function() {
                        return ctrl.schedules;
                    },
                    apID: function () {
                        return ctrl.accessPoint.id;
                    }
                },
            });
        }

        function deleteSched(ID, i) {
            schedulesResource.delete({id:ID}).$promise.then(function (response) {
                ctrl.schedules.splice(i, 1);
            });
        }

        function ok() {
            $uibModalInstance.close();
        }
    }
})();
