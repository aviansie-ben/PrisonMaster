(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('cellsResource', cells);

    function cells($resource) {
        return $resource(
            "/api/cells/:id/", {id:'@id'},
            {
                "update": {method: "PATCH"},
                "list": {method:"GET", url:"/api/cells/?fields=id,number"}
            });
    }
})();
