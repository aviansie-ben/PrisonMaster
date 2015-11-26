(function() {
    'use strict';
    angular.module('prisonMaster.prisoners').controller('ManagePrisonersController', managePrisoners);

    function managePrisoners() {
        var ctrl = this;

        ctrl.prisoners = [
            {
                first_name: "Darth",
                last_name: "Vader",
                cell: {
                    number: 1
                },
                id: 124135
            },
            {
                first_name: "Darth",
                last_name: "Brooks",
                cell: {
                    number: 1
                },
                id: 124134
            },
            {
                first_name: "Darth",
                last_name: "SaladHead",
                cell: {
                    number: 1
                },
                id: 124133
            },
            {
                first_name: "Darth",
                last_name: "Sithius",
                cell: {
                    number: 2
                },
                id: 124132
            },
            {
                first_name: "Bubba",
                last_name: "Shrimp",
                cell: {
                    number: 2
                },
                id: 124131
            }
        ];

    }
})();
