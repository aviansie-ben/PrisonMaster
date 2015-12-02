from pmaster import sio, db
from pmaster.models import AccessPoint, AccessCard, AccessLog

from flask import session
from flask.ext.socketio import emit, join_room, leave_room

from threading import Lock
from datetime import datetime

class ConnectedAccessPoint(object):
    def __init__(self, ap_id):
        self.ap_id = ap_id
        self.locked = True
        self.disabled = False
    
    def lock(self):
        sio.emit('lock', room='ap_'+str(self.ap_id), namespace='/ap_websocket')
    
    def unlock(self):
        sio.emit('unlock', room='ap_'+str(self.ap_id), namespace='/ap_websocket')
    
    def enable(self):
        self.disabled = False
        sio.emit('enable', room='ap_'+str(self.ap_id), namespace='/ap_websocket')
    
    def disable(self):
        self.disabled = True
        sio.emit('disable', room='ap_'+str(self.ap_id), namespace='/ap_websocket')
        self.lock()
    
    @property
    def access_point(self):
        return AccessPoint.query.filter_by(id=self.ap_id).first()

def get_schedule_json(ap):
    return [ {'open': s.time_open.isoformat(), 'close': s.time_close.isoformat()} for s in ap.schedules ]

ap_lock = Lock()
ap_connected = {}

@sio.on('connect', namespace='/ap_listener')
def ap_listener():
    join_room('access_point_listeners')

@sio.on('handshake', namespace='/ap_websocket')
def ap_handshake(json):
    if session.get('id') is None:
        access_point = AccessPoint.query.filter_by(id=json['id']).first()
        
        if access_point is not None:
            with ap_lock:
                if access_point.id not in ap_connected:
                    ap_connected[access_point.id] = ConnectedAccessPoint(access_point.id)
                    
                    join_room('ap_' + str(access_point.id))
                    join_room('access_points')
                    
                    session['id'] = access_point.id
                    
                    emit('handshake', {'status': 'ok', 'data': {'label': access_point.label, 'schedule': get_schedule_json(access_point)}})
                else:
                    emit('handshake', {'status': 'error', 'reason': 'already_connected'})
        else:
            emit('handshake', {'status': 'error', 'reason': 'not_found'})
    else:
        emit('handshake', {'status': 'error', 'reason': 'duplicate_handshake'})

@sio.on('unlock', namespace='/ap_websocket')
def ap_handle_unlock():
    if session.get('id') is not None:
        ap_connected[session.get('id')].locked = False
        emit('unlock', {'id': session.get('id')}, room='access_point_listeners')

@sio.on('lock', namespace='/ap_websocket')
def ap_handle_lock():
    if session.get('id') is not None:
        ap_connected[session.get('id')].locked = True
        emit('lock', {'id': session.get('id')}, room='access_point_listeners')

@sio.on('swipe', namespace='/ap_websocket')
def ap_handle_swipe(json):
    if session.get('id') is not None:
        ap = ap_connected[session.get('id')]
        card = AccessCard.query.filter_by(id=json['card_id']).first()
        
        if ap.disabled:
            return {'result': 'disabled'}
        
        if card is None or card.security_clearance < ap.access_point.security_clearance:
            return {'result': 'access_denied'}
        else:
            db.session.add(AccessLog(datetime.now(), ap.access_point, card))
            db.session.commit()
            
            return {'result': 'ok'}

@sio.on('disconnect', namespace='/ap_websocket')
def ap_disconnect():
    if session.get('id') is not None:
        with ap_lock:
            del ap_connected[session.get('id')]
