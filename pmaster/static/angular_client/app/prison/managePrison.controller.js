(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('ManagePrisonController', managePrison);

    function managePrison($uibModal) {
        var ctrl = this;

        ctrl.toggleAP = toggleAP;
        ctrl.logModal = openLog;
        ctrl.scheduleModal = openSchedule;

        // mock data
        ctrl.accessPoints = [
            {
                id: 1,
                label: "Cell 1",
                security_clearance: 4,
                status: "opened"
            },
            {
                id: 2,
                label: "Cell 2",
                security_clearance: 4,
                status: "closed"
            },
            {
                id: 3,
                label: "Cell 3",
                security_clearance: 4,
                status: "closed"
            },
            {
                id: 4,
                label: "Solitary Confinement",
                security_clearance: 100,
                status: "closed"
            },
            {
                id: 5,
                label: "Warden's Washroom",
                security_clearance: 2,
                status: "opened"
            },
            {
                id: 6,
                label: "Clarke's new lab",
                security_clearance: 2,
                status: "not_connected"
            }
        ];

        ctrl.switchSettings = generateSettings();

        // generate switch settings from access points
        function generateSettings() {
            var s = [];
            for (var i = 0; i < ctrl.accessPoints.length; i++) {
                if (ctrl.accessPoints[i].status == "opened")
                    s.push(true);
                else
                    s.push(false);
            }
            return s;
        }

        // toggles an access point opened or closed
        function toggleAP(i) {
            if (ctrl.switchSettings[i] === true)
                ctrl.accessPoints[i].status = "opened";
            else
                ctrl.accessPoints[i].status = "closed";
        }

        // opens log modal
        function openLog() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prison/logModal.html',
                controller: 'LogModalController',
                controllerAs: 'LogModalCtrl'
            });
        }

        // opens schedule modal
        function openSchedule() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prison/scheduleModal.html',
                controller: 'ScheduleModalController',
                controllerAs: 'SchedModalCtrl'
            });
        }
    }
})();
