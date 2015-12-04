(function() {
    'use strict';
    angular.module('prisonMaster.employees').controller('ViewCardModalController', viewCardModal);

    function viewCardModal($uibModalInstance, $uibModal, accessCardsResource, accessCards, employeeID) {
        var ctrl = this;

        ctrl.openAddCardModal = openAddCardModal;
        ctrl.removeCard = removeCard;
        ctrl.ok = ok;
        ctrl.cards = accessCards.data.access_cards;

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
    }
})();
