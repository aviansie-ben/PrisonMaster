from pmaster.api import api
from pmaster.api.util import ModelEntity, EntityField, EntityListField, EntityListResource, EntityResource
from pmaster.ap_websocket import ap_lock, ap_connected

from datetime import datetime

from pmaster.models import AccessPoint, AccessLog

class AccessPointEntity(ModelEntity):
    model = AccessPoint
    
    supports_list = True
    supports_get = True
    supports_update = True
    
    def field_to_json(self, field, sub_fields=None):
        if field == 'status':
            with ap_lock:
                if self.entity.id not in ap_connected:
                    return 'not_connected'
                elif not ap_connected[self.entity.id].locked:
                    return 'open'
                elif ap_connected[self.entity.id].disabled:
                    return 'disabled'
                else:
                    return 'closed'
        else:
            return ModelEntity.field_to_json(self, field, sub_fields)
    
    def set_field(self, name, value):
        if name == 'status':
            with ap_lock:
                ap = ap_connected.get(self.entity.id)
                
                if value == 'open':
                    if ap is not None:
                        if ap.disabled:
                            ap.enable()
                            ap.unlock()
                        elif ap.locked:
                            ap.unlock()
                elif value == 'closed':
                    if ap is not None:
                        if ap.disabled:
                            ap.enable()
                        elif not ap.locked:
                            ap.lock()
                elif value == 'disabled':
                    if ap is not None:
                        if not ap.disabled:
                            ap.disable()
                            ap.lock()

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
    'status': EntityField(str),
    'label': EntityField(str, required=False),
    'security_clearance': EntityField(int),
    'prison': EntityField(PrisonEntity),
    'schedules': EntityListField(ScheduleEntity),
    'access_logs': EntityListField(AccessLogEntity),
}

AccessPointEntity.default_list_fields = ['url', 'status', 'label', 'security_clearance', 'prison.url']
AccessPointEntity.default_get_fields = ['id', 'status', 'label', 'security_clearance', 'prison.url', 'prison.name']

AccessPointEntity.get_url = lambda self: api.url_for(AccessPointResource, id=self.entity.id, _external=True)

AccessLogEntity.fields = {
    'timestamp': EntityField(datetime, settable=False),
    'access_point': EntityField(AccessPointEntity, settable=False),
    'access_card': EntityField(AccessCardEntity, settable=False),
}
