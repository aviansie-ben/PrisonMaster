(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('AddScheduleModalController', addScheduleModal);

    function addScheduleModal($uibModalInstance, scheduleList) {
        var ctrl = this;

        ctrl.scheduleList = scheduleList;
        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {
            time_open: "1970-01-01T07:00:08.000Z",
            time_close: "1970-01-01T07:00:08.000Z"
        };
        ctrl.fields = [
            {
                className: "col-xs-6",
                type: 'timepicker',
                key: 'time_open',
                templateOptions: {
                    label: 'Time to Open'
                }
            },
            {
                className: "col-xs-6",
                type: 'timepicker',
                key: 'time_close',
                templateOptions: {
                    label: 'Time to Close'
                }
            }
        ];

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function onSubmit() {
            ctrl.cancel();
        }
    }
})();
