(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('employeesResource', employees)

    function employees($resource) {
        return $resource(
            "/api/employees/:id/", {id:'@id'},
            {
                "update": {method: "PATCH"},
            });
    }
})();
