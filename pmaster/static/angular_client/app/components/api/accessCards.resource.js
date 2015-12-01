(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('accessCardsResource', accessCards)

    function accessCards($resource) {
        return $resource(
            "/api/accessCardsResource/:id/", {id:'@id'},
            {
                "update": {method: "PATCH"},
            });
    }
})();
