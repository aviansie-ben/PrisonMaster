from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityField, EntityListField, EntityListResource, EntityResource

from pmaster.models import Cell

class CellEntity(ModelEntity):
    model = Cell
    
    supports_list = True
    supports_get = True
    supports_update = True

class CellListResource(EntityListResource):
    entity_class = CellEntity

class CellResource(EntityResource):
    entity_class = CellEntity

api.add_resource(CellListResource, '/cells/')
api.add_resource(CellResource, '/cells/<int:id>/')

from pmaster.api.prison import PrisonEntity
from pmaster.api.prisoner import PrisonerEntity

CellEntity.fields = {
    'id': EntityField(int, settable=False),
    'url': EntityField(str, settable=False),
    'capacity': EntityField(int),
    'number': EntityField(int),
    'prison': EntityField(PrisonEntity),
    'prisoners': EntityListField(PrisonerEntity),
}

CellEntity.default_list_fields = ['url', 'capacity', 'prison.url', 'number']
CellEntity.default_get_fields = ['id', 'capacity', 'prison.url', 'number', 'prisoners.url']

CellEntity.get_url = lambda self: api.url_for(CellResource, id=self.entity.id, _external=True)
