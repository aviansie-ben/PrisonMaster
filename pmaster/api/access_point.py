from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityField, EntityListField, EntityListResource, EntityResource

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
api.add_resource(AccessPointResource, '/access_points/<int:id>/')

from pmaster.api.access_card import AccessCardEntity
from pmaster.api.prison import PrisonEntity
from pmaster.api.schedule import ScheduleEntity

AccessPointEntity.fields = {
    'id': EntityField(int, settable=False),
    'url': EntityField(str, settable=False),
    'label': EntityField(str, required=False),
    'security_clearance': EntityField(int),
    'prison': EntityField(PrisonEntity),
    'schedules': EntityListField(ScheduleEntity),
    'access_logs': EntityListField(AccessLogEntity),
}

AccessPointEntity.default_list_fields = ['url', 'label', 'security_clearance', 'prison.url']
AccessPointEntity.default_get_fields = ['id', 'label', 'security_clearance', 'prison.url', 'prison.name']

AccessPointEntity.get_url = lambda self: api.url_for(AccessPointResource, id=self.entity.id, _external=True)

AccessLogEntity.fields = {
    'timestamp': EntityField(datetime, settable=False),
    'access_point': EntityField(AccessPointEntity, settable=False),
    'access_card': EntityField(AccessCardEntity, settable=False),
}
