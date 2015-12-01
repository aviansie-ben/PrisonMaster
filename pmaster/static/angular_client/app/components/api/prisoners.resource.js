(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('prisonersResource', prisoners)

    function prisoners($resource) {
        return $resource(
            "/api/prisoners/:id/", {id:'@id'},
            {
                "update": {method: "PUT"},
                'save':   {method:'POST', transformRequest:transform},
                'options': {method:'OPTIONS'},
                'isolate': {method:'PATCH', transformRequest:isoTransform},
                'unisolate': {method:'PATCH', transformRequest:unisoTransform},
            });
    }

    function transform(data, headers) {
         //data = angular.toJson(data);
         console.log(data);
         return data;
     }

     function isoTransform(data, headers) {
         var req = { "ops":[{ "op":"add", "field":"isolated_prisoners", "value":1 }]};
         req.ops[0].value = data.id;
         return angular.toJson(req);
     }

     function unisoTransform(data, headers) {
         var req = { "ops":[ { "op":"remove", "field":"isolated_prisoners", "value":1 } ]};
         req.ops[0].value = data.id;
         return angular.toJson(req);
     }

})();

/* Default Resource Actions:

{ 'get':    {method:'GET'},
  'save':   {method:'POST'},
  'query':  {method:'GET', isArray:true},
  'remove': {method:'DELETE'},
  'delete': {method:'DELETE'} };

*/
