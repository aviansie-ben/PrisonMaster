(function() {
    'use strict';
    angular.module('prisonMaster.police').controller('PoliceAdministrationController', policeAdmin);

    function policeAdmin($uibModal, $filter, prisoners) {
        var ctrl = this;

        ctrl.prisoners = prisoners.data;
        ctrl.openAddPrisonerModal = openAddPrisonerModal;

        // lists for search box                     // selected in search box
        ctrl.prisonerNames = prisonerNames();       ctrl.selectedName = "";
        ctrl.prisonerPrisons = prisonerPrisons();   ctrl.selectedPrison = "";
        ctrl.prisonerDates = prisonerDates();       ctrl.selectedDate = "";

        ctrl.searchMatches = searchMatches;

        // generate a list of prisoner names
        function prisonerNames() {
            var l = [];
            for (var i = 0; i < ctrl.prisoners.length; i++)
                l.push(ctrl.prisoners[i].first_name + " " + ctrl.prisoners[i].last_name);
            return l;
        }

        // generate a list of prisoner prisons
        function prisonerPrisons() {
            var l = [];
            var ids = [];
            for (var i = 0; i < ctrl.prisoners.length; i++) {
                if (ids.indexOf(ctrl.prisoners[i].prison.id) < 0) {
                    l.push(ctrl.prisoners[i].prison);
                    ids.push(ctrl.prisoners[i].prison.id);
                }
            }
            return l;
        }

        // generate a list of prisoner release dates
        function prisonerDates() {
            var l = [];
            for (var i = 0; i < ctrl.prisoners.length; i++)
                l.push($filter('date')(ctrl.prisoners[i].release_date, 'mediumDate'));
            return l;
        }

        // returns true if a match is found
        function searchMatches(prisoner) {
            return  prisoner.first_name + " " + prisoner.last_name == ctrl.selectedName ||
                    prisoner.id == ctrl.selectedID ||
                    prisoner.prison.id == ctrl.selectedPrison.id ||
                    $filter('date')(prisoner.release_date, 'mediumDate') == ctrl.selectedDate;
        }

        function openAddPrisonerModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/police/addPrisonerModal.html',
                controller: 'AddPrisonerModalController',
                controllerAs: "AddPrisonerModalCtrl",
                resolve: {
                    prison: function(prisonsResource) {
                        return prisonsResource.get({id:1}).$promise;
                    }
                }
            });
        }
    }
})();
