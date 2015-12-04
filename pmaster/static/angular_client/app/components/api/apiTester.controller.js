(function() {
    'use strict';
    angular.module('prisonMaster.api').controller('ApiTesterController', apiTester);

    function apiTester(accessPointsResource, employeesResource, prisonersResource, prisonsResource, cellsResource, accessCardsResource, schedulesResource) {
        var ctrl = this;

        ctrl.prisonerJSON = "";
        ctrl.prisonerID = 0;
        ctrl.otherPID;
        ctrl.submitPrisoner = submitPrisoner;
        ctrl.prisonerOptions = prisonerOptions;
        ctrl.updatePrisoner = updatePrisoner;
        ctrl.isolatePrisoner = isolatePrisoner;
        ctrl.unisolatePrisoner = unisolatePrisoner;

        function submitPrisoner() {
            accessPointsResource.save(ctrl.prisonerJSON).$promise.then(function(response) {
                ctrl.prisonerID = response.data.id;
                console.log("Success!");
            });
        }

        function updatePrisoner() {
            accessPointsResource.update({id:ctrl.prisonerID}, ctrl.prisonerJSON).$promise.then(function(response) {
                console.log("Success!");
            });
        }

        function prisonerOptions() {
            accessPointsResource.options().$promise.then(function(response) {
                ctrl.prisonerJSON = angular.toJson(response);
                console.log("Success!");
            });
        }

        function isolatePrisoner() {
            console.log("called");
            prisonersResource.isolate({id:ctrl.prisonerID}, {id:ctrl.otherPID}).$promise.then(function() {
                console.log("Success!");
            });
        }

        function unisolatePrisoner() {
            prisonersResource.unisolate({id:ctrl.prisonerID}, {id:ctrl.otherPID}).$promise.then(function() {
                console.log("Success!");
            });
        }
    }
})();
