(function() {
    'use strict';
    angular.module('prisonMaster.api').controller('ApiTesterController', apiTester);

    function apiTester(employeesResource, prisonersResource, prisonsResource, cellsResource, accessCardsResource, schedulesResource) {
        var ctrl = this;

        ctrl.prisonerJSON = "";
        ctrl.submitPrisoner = submitPrisoner;
        ctrl.prisonerOptions = prisonerOptions;

        function submitPrisoner() {
            prisonersResource.save(ctrl.prisonerJSON).$promise.then(function(response) {
                console.log("Success!");
            });
        }

        function prisonerOptions() {
            prisonersResource.options().$promise.then(function(response) {
                ctrl.prisonerJSON = angular.toJson(response);
                console.log("Success!");
            });
        }
    }
})();
