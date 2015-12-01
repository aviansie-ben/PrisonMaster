from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityField, EntityListField, EntityListResource, EntityResource

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
api.add_resource(EmployeeResource, '/employees/<int:id>/')

from pmaster.api.access_card import AccessCardEntity
from pmaster.api.prison import PrisonEntity
from pmaster.api.user_account import UserAccountEntity

EmployeeEntity.fields = {
    'id': EntityField(int, settable=False),
    'url': EntityField(str, settable=False),
    'security_clearance': EntityField(int),
    'position': EntityField(str),
    'first_name': EntityField(str),
    'last_name': EntityField(str),
    'prison': EntityField(PrisonEntity),
    'access_cards': EntityListField(AccessCardEntity),
    'user_account': EntityField(UserAccountEntity, settable=False),
}

EmployeeEntity.default_list_fields = ['url', 'first_name', 'last_name', 'position', 'prison.url']
EmployeeEntity.default_get_fields = ['id', 'first_name', 'last_name', 'position', 'security_clearance', 'prison.name']

EmployeeEntity.get_url = lambda self: api.url_for(EmployeeResource, id=self.entity.id, _external=True)
