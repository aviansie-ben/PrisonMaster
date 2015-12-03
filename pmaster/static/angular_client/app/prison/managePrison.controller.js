(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('ManagePrisonController', managePrison);

    function managePrison($uibModal) {
        var ctrl = this;

        ctrl.toggleAP = toggleAP;
        ctrl.logModal = openLog;
        ctrl.viewScheduleModal = openViewSchedule;

        // mock data
        ctrl.accessPoints = [
            {
                id: 1,
                label: "Cell 1",
                security_clearance: 4,
                status: "opened",
                access_logs: [
                    {
                        access_card: {
                            employee: {
                                    first_name: "Darth",
                                    id: 3,
                                    last_name: "Sithious",
                                    position: "Prisoner",
                                    security_clearance: 4
                            },
                            expiry_date: "2015-12-04",
                            id: 1,
                            security_clearance: 8,
                        },
                        timestamp: "2015-12-03T20:57:07"
                    },
                    {
                        access_card: {
                            employee: {
                                    first_name: "Yoda",
                                    id: 2,
                                    last_name: "NumberWang",
                                    position: "Master Jedi",
                                    security_clearance: 4
                            },
                            expiry_date: "2015-12-04",
                            id: 2048,
                            security_clearance: 5,
                        },
                        timestamp: "2016-11-09T12:05:09"
                    },
                    {
                        access_card: {
                            employee: {
                                    first_name: "Darth",
                                    id: 5,
                                    last_name: "BubbaShrimpious",
                                    position: "Sith Lord",
                                    security_clearance: 4000
                            },
                            expiry_date: "2015-12-04",
                            id: 3,
                            security_clearance: 8,
                        },
                        timestamp: "2015-09-04T21:59:07"
                    }
                ],
                schedules: [
                    {
                        id: 1,
                        time_open: "09:00:00",
                        time_close: "10:00:00"
                    },
                    {
                        id: 2,
                        time_close: "14:00:00",
                        time_open: "15:00:00"
                    },
                    {
                        id: 3,
                        time_close: "19:00:00",
                        time_open: "19:00:05"
                    }
                ]
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
        function openLog(ap) {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/prison/logModal.html',
                controller: 'LogModalController',
                controllerAs: 'LogModalCtrl',
                resolve: {
                    accessPoint: function() {
                        return ap;
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
                    }
                }
            });
        }
    }
})();
