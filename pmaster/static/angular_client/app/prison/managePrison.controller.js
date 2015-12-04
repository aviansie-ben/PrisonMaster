(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('ManagePrisonController', managePrison);

    function managePrison($uibModal, $stateParams, accessPointsResource, accessPoints) {
        var ctrl = this;

        ctrl.toggleAP = toggleAP;
        ctrl.logModal = openLog;
        ctrl.viewScheduleModal = openViewSchedule;
        ctrl.accessPoints = accessPoints.data;
        ctrl.switchSettings = generateSettings();
        $stateParams.timer = window.setInterval(updateData, 1000);

        function updateData() {
            accessPointsResource.listStatus().$promise.then(function(updatedData) {
                for (var i = 0; i < ctrl.accessPoints.length; i++) {
                    if (ctrl.accessPoints[i].status != updatedData.data[i].status) {
                        ctrl.accessPoints[i].status = updatedData.data[i].status;
                        if (ctrl.accessPoints[i].status == "open")
                            ctrl.switchSettings[i] = true;
                        else
                            ctrl.switchSettings[i] = false;
                    }
                }
                //generateSettings();
            });
        }


        // generate switch settings from access points
        function generateSettings() {
            var s = [];
            for (var i = 0; i < ctrl.accessPoints.length; i++) {
                if (ctrl.accessPoints[i].status == "open")
                    s.push(true);
                else
                    s.push(false);
            }
            return s;
        }

        // toggles an access point opened or closed
        function toggleAP(i) {
            if (ctrl.switchSettings[i] === true)
                ctrl.accessPoints[i].status = "open";
            else
                ctrl.accessPoints[i].status = "closed";
            accessPointsResource.update({id:ctrl.accessPoints[i].id}, {status:ctrl.accessPoints[i].status}).$promise.then(function(response) {
                console.log("updated");
            });
        }

        // opens log modal
        function openLog(ap) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prison/logModal.html',
                controller: 'LogModalController',
                controllerAs: 'LogModalCtrl',
                resolve: {
                    accessPoint: function() {
                        return ap;
                    },
                    logs: function(accessPointsResource) {
                        return accessPointsResource.listLogs({id:ap.id}).$promise;
                    }
                }
            });
        }

        // opens schedule modal
        function openViewSchedule(ap) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prison/viewScheduleModal.html',
                controller: 'ViewScheduleModalController',
                controllerAs: 'ViewSchedModalCtrl',
                resolve: {
                    accessPoint: function() {
                        return ap;
                    },
                    schedules: function(accessPointsResource) {
                        return accessPointsResource.listSchedules({id:ap.id}).$promise;
                    }
                }
            });
        }
    }
})();
