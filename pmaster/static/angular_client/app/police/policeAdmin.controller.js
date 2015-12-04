(function() {
    'use strict';
    angular.module('prisonMaster.police').controller('PoliceAdministrationController', policeAdmin);

    function policeAdmin($uibModal, $filter, prisoners) {
        var ctrl = this;

        ctrl.prisoners = prisoners.data;
        ctrl.openAddPrisonerModal = openAddPrisonerModal;

        // lists for search box                     // selected in search box
        ctrl.prisonerNames = prisonerNames();       ctrl.selectedName = undefined;
        ctrl.prisonerIDs = prisonerIDs();           ctrl.selectedID = undefined;
        ctrl.prisonerPrisons = prisonerPrisons();   ctrl.selectedPrison = undefined;
        ctrl.prisonerDates = prisonerDates();       ctrl.selectedDate = "";

        ctrl.searchMatches = searchMatches;

        // generate a list of prisoner names
        function prisonerNames() {
            var l = [];
            for (var i = 0; i < ctrl.prisoners.length; i++)
                l.push(ctrl.prisoners[i].first_name + " " + ctrl.prisoners[i].last_name);
            return l;
        }

        // generate a list of prisoner ids
        function prisonerIDs() {
            var l = [];
            for (var i = 0; i < ctrl.prisoners.length; i++)
                l.push(ctrl.prisoners[i].id);
            return l;
        }

        // generate a list of prisoner prisons
        /*
         * NOTE: I am using "cells" as a replacement for prisons until this
         *       is passed in with the API (I don't know how to do it easily).
         *       Simply uncomment the lines in prisonerPrisons(), searchMatches(),
         *       and the HTML file to update this.
         */
        function prisonerPrisons() {
            var l = [];
            for (var i = 0; i < ctrl.prisoners.length; i++)
                l.push(ctrl.prisoners[i].cell.id);
                //l.push(ctrl.prisoners[i].prison.name);
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
                    prisoner.cell.number == ctrl.selectedPrison ||
                    //prisoner.prison.name == ctrl.selectedPrison ||
                    $filter('date')(prisoner.release_date, 'mediumDate') == ctrl.selectedDate;
        }

        function openAddPrisonerModal() {
            $uibModal.open({
                animation: true,
                templateUrl: '/static/angular_client/app/police/addPrisonerModal.html',
                controller: 'AddPrisonerModalController',
                controllerAs: "AddPrisonerModalCtrl",
            });
        }
    }
})();
