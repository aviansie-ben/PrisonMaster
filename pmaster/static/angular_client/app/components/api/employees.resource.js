(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('employeesResource', employees)

    function employees($resource) {
        return $resource(
            "/api/employees/:id/", {id:'@id'},
            {
                'update': {method: "PUT"},
                'list':  {method:'GET', url:"/api/employees/?fields=*"},
                'accessCards':  {method:'GET', url:"/api/employees/:id/?fields=access_cards.*", params:{id:'@id'}},
                'options': {method:'OPTIONS'},
            });
    }
})();
