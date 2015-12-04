(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('accessPointsResource', accessPoints);

    function accessPoints($resource) {
        return $resource(
            "/api/access_points/:id/", {id:'@id'},
            {
                'update': {method: "PUT"},
                'list':  {method:'GET', url:"/api/access_points/?fields=*"},
                'listStatus':  {method:'GET', url:"/api/access_points/?fields=status"},
                'options': {method:'OPTIONS'},
            });
    }
})();
