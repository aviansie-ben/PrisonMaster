from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityListResource, EntityResource

from datetime import datetime

from pmaster.models import AccessPoint, AccessLog

class AccessPointEntity(ModelEntity):
    model = AccessPoint
    
    supports_list = True
    supports_get = True
    supports_update = True

class AccessLogEntity(ModelEntity):
    model = AccessLog

class AccessPointListResource(EntityListResource):
    entity_class = AccessPointEntity

class AccessPointResource(EntityResource):
    entity_class = AccessPointEntity

api.add_resource(AccessPointListResource, '/access_points/')
api.add_resource(AccessPointResource, '/access_points/<int:id>')

from pmaster.api.access_card import AccessCardEntity
from pmaster.api.prison import PrisonEntity
from pmaster.api.schedule import ScheduleEntity

AccessPointEntity.readable_fields = {'id': None, 'url': None, 'security_clearance': None, 'prison': PrisonEntity, 'schedules': ScheduleEntity, 'access_logs': AccessLogEntity}
AccessPointEntity.writeable_fields = {'security_clearance': None, 'prison': PrisonEntity}
AccessPointEntity.required_fields = AccessPointEntity.writeable_fields

AccessPointEntity.default_list_fields = ['url', 'security_clearance', 'prison.url']
AccessPointEntity.default_get_fields = ['id', 'security_clearance', 'prison.url', 'prison.name']

AccessPointEntity.get_url = lambda self: api.url_for(AccessPointResource, id=self.entity.id, _external=True)

AccessLogEntity.readable_fields = {'timestamp': datetime, 'access_point': AccessPointEntity, 'access_card': AccessCardEntity}
