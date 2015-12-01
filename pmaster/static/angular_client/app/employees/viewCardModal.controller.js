(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('ViewCardModalController', viewCardModal);

    function viewCardModal($uibModalInstance, $uibModal) {
        var ctrl = this;

        ctrl.openAddCardModal = openAddCardModal;
        ctrl.removeCard = removeCard;
        ctrl.ok = submit;
        ctrl.cancel = close;

        ctrl.cards = [
            {
                "expiry_date": "2016-02-01",
                "id": 1,
                "security_clearance": 0,
            },
            {
                "expiry_date": "2030-03-01",
                "id": 2,
                "security_clearance": 5,
            },
            {
                "expiry_date": "1977-07-07",
                "id": 7,
                "security_clearance": 7,
            },
            {
                "expiry_date": "2020-11-30",
                "id": 4,
                "security_clearance": 2,
            },
            {
                "expiry_date": "2020-11-01",
                "id": 3,
                "security_clearance": 5,
            },
        ];

        function openAddCardModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/employees/addCardModal.html',
                controller: 'AddCardModalController',
                controllerAs: "AddCardModalCtrl"
            });
        }

        function removeCard(i) {
            ctrl.cards.splice(i, 1);
        }

        function submit() {
            $uibModalInstance.close();
        }

        function close() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
