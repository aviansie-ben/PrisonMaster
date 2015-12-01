(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('prisonersResource', prisoners)

    function prisoners($resource) {
        return $resource(
            "/api/prisoners/:id/", {id:'@id'},
            {
                "update": {method: "PATCH"},
                'save':   {method:'POST', transformRequest:transform},
                'options': {method:'OPTIONS'}
            });
    }

    function transform(data, headers) {
         //data = angular.toJson(data);
         console.log(data);
         return data;
     }

})();

/* Default Resource Actions:

{ 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };

*/
