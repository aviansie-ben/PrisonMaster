(function() {
    'use strict';
    angular.module('prisonMaster.api').factory('prisonersResource', prisoners);

    function prisoners($resource) {
        return $resource(
            "/api/prisoners/:id/", {id:'@id'},
            {
                "update": {method: "PUT"},
                'save':   {method:'POST'},
                'options': {method:'OPTIONS'},
                'isolate': {method:'PATCH', transformRequest:isoTransform},
                'unisolate': {method:'PATCH', transformRequest:unisoTransform},
                'list':  {method:'GET', url:"/api/prisoners/?fields=*,cell.number,isolated_prisoners.first_name,isolated_prisoners.last_name,isolated_prisoners.id"},
                'cellmates': {method:'GET', url:"/api/prisoners/:id/?fields=cell.prisoners.*", params:{id:'@id'}, transformResponse:transformCellmates, isArray:true}
            });
    }

    function transformCellmates(response) {
        var stuff = angular.fromJson(response);
        return stuff.data.cell.prisoners;
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
