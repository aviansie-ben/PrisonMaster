from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityField, EntityListField, EntityListResource, EntityResource

from datetime import date

from pmaster.models import Prisoner

class PrisonerEntity(ModelEntity):
    model = Prisoner
    
    supports_list = True
    supports_get = True
    supports_update = True

class PrisonerListResource(EntityListResource):
    entity_class = PrisonerEntity

class PrisonerResource(EntityResource):
    entity_class = PrisonerEntity

api.add_resource(PrisonerListResource, '/prisoners/')
api.add_resource(PrisonerResource, '/prisoners/<int:id>/')

from pmaster.api.cell import CellEntity
from pmaster.api.prison import PrisonEntity

PrisonerEntity.fields = {
    'id': EntityField(int, settable=False),
    'url': EntityField(str, settable=False),
    'first_name': EntityField(str),
    'last_name': EntityField(str),
    'release_date': EntityField(date, required=False),
    'prison': EntityField(PrisonEntity),
    'cell': EntityField(CellEntity, required=False),
    'isolated_prisoners': EntityListField(PrisonerEntity, settable=True,
        adder=lambda entity, element: entity.entity.add_isolated_prisoner(element.entity),
        remover=lambda entity, element: entity.entity.remove_isolated_prisoner(element.entity)),
}

PrisonerEntity.default_list_fields = ['url', 'first_name', 'last_name', 'prison.url']
PrisonerEntity.default_get_fields = ['id', 'first_name', 'last_name', 'prison.url', 'prison.name', 'cell.url', 'cell.number']

PrisonerEntity.get_url = lambda self: api.url_for(PrisonerResource, id=self.entity.id, _external=True)
