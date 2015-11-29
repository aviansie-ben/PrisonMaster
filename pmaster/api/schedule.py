from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityListResource, EntityResource

from datetime import time

from pmaster.models import Schedule

class ScheduleEntity(ModelEntity):
    model = Schedule
    
    supports_list = True
    supports_get = True
    supports_update = True

class ScheduleListResource(EntityListResource):
    entity_class = ScheduleEntity

class ScheduleResource(EntityResource):
    entity_class = ScheduleEntity

api.add_resource(ScheduleListResource, '/schedules/')
api.add_resource(ScheduleResource, '/schedules/<int:id>')

from pmaster.api.access_point import AccessPointEntity

ScheduleEntity.readable_fields = {'id': None, 'url': None, 'time_open': time, 'time_close': time, 'access_point': AccessPointEntity}
ScheduleEntity.writeable_fields = {'time_open': time, 'time_close': time, 'access_point': AccessPointEntity}
ScheduleEntity.required_fields = ScheduleEntity.writeable_fields

ScheduleEntity.default_list_fields = ['url', 'time_open', 'time_close', 'access_point.url']
ScheduleEntity.default_get_fields = ['id', 'time_open', 'time_close', 'access_point.url', 'access_point.id', 'access_point.prison.name']

ScheduleEntity.get_url = lambda self: api.url_for(ScheduleResource, id=self.entity.id, _external=True)
