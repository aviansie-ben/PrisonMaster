from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityListResource, EntityResource

from pmaster.models import Employee

class EmployeeEntity(ModelEntity):
    model = Employee
    
    supports_list = True
    supports_get = True
    supports_update = True

class EmployeeListResource(EntityListResource):
    entity_class = EmployeeEntity

class EmployeeResource(EntityResource):
    entity_class = EmployeeEntity

api.add_resource(EmployeeListResource, '/employees/')
api.add_resource(EmployeeResource, '/employees/<int:id>')

from pmaster.api.access_card import AccessCardEntity
from pmaster.api.prison import PrisonEntity
from pmaster.api.user_account import UserAccountEntity

EmployeeEntity.readable_fields = {'id': None, 'url': None, 'security_clearance': None, 'position': None, 'first_name': None, 'last_name': None, 'prison': PrisonEntity, 'access_cards': AccessCardEntity, 'user_account': UserAccountEntity}
EmployeeEntity.writeable_fields = {'security_clearance': None, 'position': None, 'first_name': None, 'last_name': None, 'prison': PrisonEntity}
EmployeeEntity.required_fields = EmployeeEntity.writeable_fields

EmployeeEntity.default_list_fields = ['url', 'first_name', 'last_name', 'position', 'prison.url']
EmployeeEntity.default_get_fields = ['id', 'first_name', 'last_name', 'position', 'security_clearance', 'prison.name']

EmployeeEntity.get_url = lambda self: api.url_for(EmployeeResource, id=self.entity.id, _external=True)
