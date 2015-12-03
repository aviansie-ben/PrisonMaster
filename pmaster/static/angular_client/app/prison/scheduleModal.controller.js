(function() {
    'use strict';
    angular.module('prisonMaster.prison').controller('ScheduleModalController', scheduleModal);

    function scheduleModal($uibModalInstance, accessPoint) {
        var ctrl = this;

        ctrl.accessPoint = accessPoint;
        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {};
        ctrl.fields = [
            {
                type: 'select',
                key: 'model',
                templateOptions: {
                    label: 'Select a location',
                    options: [
                        {
                            name: "Cell #1",
                            value: 1
                        },
                        {
                            name: "Cell #2",
                            value: 2
                        },
                        {
                            name: "Cell #3",
                            value: 3
                        },
                        {
                            name: "Cell #4",
                            value: 4
                        },
                        {
                            name: "Cell #5",
                            value: 5
                        }
                    ]
            }
        }];

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function onSubmit() {
            $uibModalInstance.close();
        }
    }
})();
