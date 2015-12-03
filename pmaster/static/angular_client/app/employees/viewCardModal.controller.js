(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('ViewCardModalController', viewCardModal);

    function viewCardModal($uibModalInstance, $uibModal, accessCardsResource, accessCards, employeeID) {
        var ctrl = this;

        ctrl.openAddCardModal = openAddCardModal;
        ctrl.removeCard = removeCard;
        ctrl.ok = ok;
        ctrl.cancel = cancel;
        ctrl.cards = accessCards.data.access_cards;
        [
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
                controllerAs: "AddCardModalCtrl",
                resolve: {
                    employeeID: function() {
                        return employeeID;
                    },
                    cardList: function() {
                        return ctrl.cards;
                    }
                },
            });
        }

        function removeCard(ID) {
            accessCardsResource.delete({id:ID}).$promise.then(function(response) {
                for (var i = 0 ; i < ctrl.cards.length ; i++) {
                    if (ctrl.cards[i].id == ID) {
                        ctrl.cards.splice(i, 1);
                        break;
                    }
                }
            });
        }

        function ok() {
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();
