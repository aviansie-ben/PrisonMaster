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
                'listLogs':  {method:'GET', url:"/api/access_points/:id/?fields=access_logs.timestamp,access_logs.access_card.employee.first_name,access_logs.access_card.employee.last_name,access_logs.access_card.id,access_logs.access_card.security_clearance", params:{id:'@id'}},
                'listSchedules':  {method:'GET', url:"/api/access_points/:id/?fields=schedules.*", params:{id:'@id'}},
                'options': {method:'OPTIONS'},
            });
    }
})();
