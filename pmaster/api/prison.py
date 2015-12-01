from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityField, EntityListField, EntityListResource, EntityResource

from pmaster.models import Prison

class PrisonEntity(ModelEntity):
    model = Prison
    
    supports_list = True
    supports_get = True
    supports_update = True

class PrisonListResource(EntityListResource):
    entity_class = PrisonEntity

class PrisonResource(EntityResource):
    entity_class = PrisonEntity

api.add_resource(PrisonListResource, '/prisons/')
api.add_resource(PrisonResource, '/prisons/<int:id>/')

from pmaster.api.access_point import AccessPointEntity
from pmaster.api.cell import CellEntity
from pmaster.api.employee import EmployeeEntity
from pmaster.api.prisoner import PrisonerEntity

PrisonEntity.fields = {
    'id': EntityField(int, settable=False),
    'url': EntityField(str, settable=False),
    'name': EntityField(str),
    'address': EntityField(str),
    'security_level': EntityField(int),
    'prisoners': EntityListField(PrisonerEntity),
    'cells': EntityListField(CellEntity),
    'employees': EntityListField(EmployeeEntity),
    'access_points': EntityListField(AccessPointEntity),
}

PrisonEntity.default_list_fields = ['url', 'name', 'security_level']
PrisonEntity.default_get_fields = ['id', 'name', 'address', 'security_level', 'prisoners.url', 'cells.url', 'cells.number']

PrisonEntity.get_url = lambda self: api.url_for(PrisonResource, id=self.entity.id, _external=True)
