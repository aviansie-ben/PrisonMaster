(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('schedulesResource', schedules)

    function schedules($resource) {
        return $resource(
            "/api/schedules/:id/", {id:'@id'},
            {
                "update": {method: "PATCH"},
            });
    }
})();
