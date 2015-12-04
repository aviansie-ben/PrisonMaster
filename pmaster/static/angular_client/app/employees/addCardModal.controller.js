(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('AddCardModalController', addCardModal);

    function addCardModal($uibModalInstance, accessCardsResource, employeeID, cardList) {
        var ctrl = this;

        ctrl.onSubmit = onSubmit;
        ctrl.cancel = close;
        ctrl.model = {employee:employeeID};
        ctrl.fields = [
            {
                type: 'datepicker',
                key: 'expiry_date',
                templateOptions: {
                    label: 'Expiry Date'
                }
            },
            {
                type: 'numInput',
                key: 'security_clearance',
                templateOptions: {
                    label: 'Security Clearance'
                }
            }
        ];

        function close() {
            $uibModalInstance.dismiss('cancel');
        }

        function onSubmit() {
            accessCardsResource.save(ctrl.model).$promise.then(function(response) {
                cardList.push(response.data);
                $uibModalInstance.close();
            });
        }
    }
})();
