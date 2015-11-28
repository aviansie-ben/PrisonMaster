from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityListResource, EntityResource

from datetime import date

from pmaster.models import AccessCard

class AccessCardEntity(ModelEntity):
    model = AccessCard
    
    supports_list = True
    supports_get = True
    supports_update = True

class AccessCardListResource(EntityListResource):
    entity_class = AccessCardEntity

class AccessCardResource(EntityResource):
    entity_class = AccessCardEntity

api.add_resource(AccessCardListResource, '/access_cards/')
api.add_resource(AccessCardResource, '/access_cards/<int:id>')

from pmaster.api.employee import EmployeeEntity

AccessCardEntity.readable_fields = {'id': None, 'url': None, 'security_clearance': None, 'expiry_date': date, 'employee': EmployeeEntity}
AccessCardEntity.writeable_fields = {'security_clearance': None, 'expiry_date': date, 'employee': EmployeeEntity}
AccessCardEntity.required_fields = AccessCardEntity.writeable_fields

AccessCardEntity.default_list_fields = ['url', 'security_clearance', 'employee.url']
AccessCardEntity.default_get_fields = ['id', 'security_clearance', 'expiry_date', 'employee.url', 'employee.last_name', 'employee.first_name']

AccessCardEntity.get_url = lambda self: api.url_for(AccessCardResource, id=self.entity.id, _external=True)
