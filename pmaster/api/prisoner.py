from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityListResource, EntityResource

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
api.add_resource(PrisonerResource, '/prisoners/<int:id>')

from pmaster.api.cell import CellEntity
from pmaster.api.prison import PrisonEntity

PrisonerEntity.readable_fields = {'id': None, 'url': None, 'first_name': None, 'last_name': None, 'release_date': date, 'prison': PrisonEntity, 'cell': CellEntity}
PrisonerEntity.writeable_fields = {'first_name': None, 'last_name': None, 'release_date': date, 'prison': PrisonEntity, 'cell': CellEntity}
PrisonerEntity.required_fields = ['first_name', 'last_name', 'prison', 'cell']

PrisonerEntity.default_list_fields = ['url', 'first_name', 'last_name', 'prison.url']
PrisonerEntity.default_get_fields = ['id', 'first_name', 'last_name', 'prison.url', 'prison.name', 'cell.url', 'cell.number']

PrisonerEntity.get_url = lambda self: api.url_for(PrisonerResource, id=self.entity.id, _external=True)
