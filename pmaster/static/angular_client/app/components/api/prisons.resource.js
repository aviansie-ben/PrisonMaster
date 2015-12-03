(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('prisonsResource', prisons);

    function prisons($resource) {
        return $resource(
            "/api/prisons/:id/", {id:'@id'},
            {
                "update": {method: "PATCH"},
            });
    }
})();
