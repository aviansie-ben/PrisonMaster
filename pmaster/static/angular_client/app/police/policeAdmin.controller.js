(function() {
    'use strict';
    angular.module('prisonMaster.police').controller('PoliceAdministrationController', policeAdmin);

    function policeAdmin($uibModal, $filter, prisoners) {
        var ctrl = this;

        ctrl.prisoners = checkCells(prisoners.data);

        // lists for search box                     // selected in search box
        ctrl.prisonerNames = prisonerNames();       ctrl.selectedName = undefined;
        ctrl.prisonerIDs = prisonerIDs();           ctrl.selectedID = undefined;
        ctrl.prisonerCells = prisonerCells();       ctrl.selectedCell = undefined;
        ctrl.prisonerDates = prisonerDates();       ctrl.selectedDate = "";

        ctrl.searchMatches = searchMatches;

        function checkCells(prisonersList) {
            for (var i = 0; i < prisonersList.length; i++) {
                if (prisonersList[i].cell.id === 1) prisonersList[i].cell.label = "Unassigned";
                else prisonersList[i].cell.label = prisonersList[i].cell.number;
            }
            return prisonersList;
        }

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

        // generate a list of prisoner cells
        function prisonerCells() {
            var l = [];
            for (var i = 0; i < ctrl.prisoners.length; i++)
                l.push(ctrl.prisoners[i].cell.label);
            return l;
        }

        // generate a list of prisoner release dates
        function prisonerDates() {
            var l = [];
            for (var i = 0; i < ctrl.prisoners.length; i++)
                l.push($filter('date')(ctrl.prisoners[i].release_date, 'mediumDate'));
                //l.push(ctrl.prisoners[i].release_date);
            return l;
        }

        // returns true if a match is found
        function searchMatches(prisoner) {
            return  prisoner.first_name + " " + prisoner.last_name == ctrl.selectedName ||
                    prisoner.id == ctrl.selectedID ||
                    prisoner.cell.label == ctrl.selectedCell ||
                    $filter('date')(prisoner.release_date, 'mediumDate') == ctrl.selectedDate;
        }
    }
})();
