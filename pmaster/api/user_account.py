from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityListResource, EntityResource

from pmaster.models import UserAccount

class UserAccountEntity(ModelEntity):
    model = UserAccount
    
    supports_list = True
    supports_get = True
    supports_update = True

class UserAccountListResource(EntityListResource):
    entity_class = UserAccountEntity

class UserAccountResource(EntityResource):
    entity_class = UserAccountEntity

api.add_resource(UserAccountListResource, '/user_accounts/')
api.add_resource(UserAccountResource, '/user_accounts/<int:id>')

from pmaster.api.employee import EmployeeEntity

UserAccountEntity.readable_fields = {'id': None, 'url': None, 'username': None, 'is_active': None, 'password_hash': None, 'employee': EmployeeEntity}
UserAccountEntity.writeable_fields = {'username': None, 'is_active': None, 'password_hash': None, 'employee': EmployeeEntity}
UserAccountEntity.required_fields = UserAccountEntity.writeable_fields

UserAccountEntity.default_list_fields = ['url', 'username', 'is_active', 'employee.url']
UserAccountEntity.default_get_fields = ['id', 'username', 'is_active', 'employee.url', 'employee.last_name', 'employee.first_name']

UserAccountEntity.get_url = lambda self: api.url_for(UserAccountResource, id=self.entity.id, _external=True)
