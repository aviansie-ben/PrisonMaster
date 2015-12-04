(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('accessCardsResource', accessCards);

    function accessCards($resource) {
        return $resource(
            "/api/access_cards/:id/", {id:'@id'},
            {
                'update': {method: "PUT"},
                'list':  {method:'GET', url:"/api/access_cards/?fields=*"},
                'options': {method:'OPTIONS'},
            });
    }
})();
