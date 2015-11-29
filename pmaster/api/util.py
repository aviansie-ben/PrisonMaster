from pmaster import db

from datetime import datetime, date, time
import dateutil.parser

from flask import abort, request
from flask_restful import Resource

from webargs import fields, ValidationError
from webargs.flaskparser import use_args

def field_validator(entity_class):
    def validate(fields):
        for field in fields.split(','):
            cls = entity_class
            
            for part in field.split('.'):
                if cls is None or not issubclass(cls, Entity):
                    raise ValidationError('Field ' + field + ' is unknown')
                
                if part == '*':
                    cls = None
                else:
                    if part not in cls.readable_fields:
                        raise ValidationError('Field ' + field + ' is unknown')
                    
                    cls = cls.readable_fields[part]
            
            if cls is not None and issubclass(cls, Entity):
                raise ValidationError('Field ' + field + ' is composite')
    
    return validate

class EntityListField(object):
    def __init__(self, entity_type, adder=None, remover=None):
        self.entity_type = entity_type
        self.adder = adder
        self.remover = remover

class Entity(object):
    readable_fields = {}
    writeable_fields = {}
    required_fields = []
    
    default_list_fields = []
    default_get_fields = []
    
    supports_list = False
    supports_create = False
    
    supports_get = False
    supports_update = False
    
    @property
    def allow_read(self):
        return True
    
    @property
    def allow_update(self):
        return True
    
    @property
    def allow_delete(self):
        return True
    
    def allow_update_field(self, name):
        return True
    
    def to_json(self, fields):
        return {}
    
    def set_field(self, name, value):
        raise NotImplementedError()
    
    def add_to_field(self, name, value):
        raise NotImplementedError()
    
    def remove_from_field(self, name, value):
        raise NotImplementedError()
    
    def delete(self):
        raise NotImplementedError()
    
    def commit(self):
        pass
    
    @classmethod
    def allow_create(cls):
        return True
    
    @classmethod
    def allow_create_with_field(cls, name):
        return True
    
    @classmethod
    def list(cls):
        raise NotImplementedError()
    
    @classmethod
    def create_new(cls):
        raise NotImplementedError()
    
    @classmethod
    def get(cls, id):
        raise NotImplementedError()
    
    @classmethod
    def describe(cls):
        return {'fields': { f: None if not t else t.__name__ for f, t in cls.readable_fields.items() }}

class ModelEntity(Entity):
    model = None
    
    def __init__(self, entity, add=False):
        self.entity = entity
        self.add = add
    
    def get_url(self):
        return None
    
    def field_to_json(self, field, sub_fields=None):
        if field == 'url':
            return self.get_url()
        
        cls = self.readable_fields[field]
        val = getattr(self.entity, field)
        
        if cls is None or val is None:
            return val
        elif cls is datetime or cls is date or cls is time:
            return val.isoformat()
        else:
            if isinstance(val, list):
                return [ cls(lv).to_json(sub_fields) if lv is not None else None for lv in val ]
            else:
                return cls(val).to_json(sub_fields) if val is not None else None
    
    def to_json(self, fields):
        result = {}
        direct_fields = { f.split('.', 1)[0] for f in fields }
        
        for field in direct_fields:
            if field == '*':
                for n, t in self.readable_fields.items():
                    if t is None or not issubclass(t, Entity):
                        result[n] = self.field_to_json(n)
            else:
                result[field] = self.field_to_json(field, { f.split('.', 1)[1] for f in fields if f.startswith(field + '.') })
        
        return result
    
    def set_field(self, name, value):
        if self.writeable_fields[name] is not None and issubclass(self.writeable_fields[name], ModelEntity) and value is not None:
            value = self.writeable_fields[name].get(value)
            if value is None:
                abort(422)
            
            value = value.entity
        elif self.writeable_fields[name] is date and value is not None:
            value = dateutil.parser.parse(value, ignoretz=True).date()
        elif self.writeable_fields[name] is time and value is not None:
            value = dateutil.parser.parse(value, ignoretz=True).time()
        elif self.writeable_fields[name] is datetime and value is not None:
            value = dateutil.parser.parse(value, ignoretz=True)
            
        setattr(self.entity, name, value)
    
    def add_to_field(self, name, value):
        if self.writeable_fields[name] is not None and isinstance(self.writeable_fields[name], EntityListField):
            if self.writeable_fields[name].adder is None:
                abort(422)
            
            value = self.writeable_fields[name].entity_type.get(value)
            if value is None:
                abort(422)
            
            self.writeable_fields[name].adder(self, value)
        else:
            abort(422)
    
    def remove_from_field(self, name, value):
        if self.writeable_fields[name] is not None and isinstance(self.writeable_fields[name], EntityListField):
            if self.writeable_fields[name].remover is None:
                abort(422)
            
            value = self.writeable_fields[name].entity_type.get(value)
            if value is None:
                abort(422)
            
            self.writeable_fields[name].remover(self, value)
        else:
            abort(422)
    
    def delete(self):
        db.session.delete(self.entity)
    
    def commit(self):
        if self.add:
            db.session.add(self.entity)
        
        db.session.commit()
    
    @classmethod
    def list(cls):
        return [ cls(e) for e in cls.model.query.all() ]
    
    @classmethod
    def create_new(cls):
        return cls(cls.model(), True)
    
    @classmethod
    def get(cls, id):
        e = cls.model.query.filter_by(id=id).first()
        
        return cls(e) if e is not None else None

class EntityListResource(Resource):
    entity_class = None
    
    def get(self):
        if self.entity_class is None or not self.entity_class.supports_list:
            abort(405)
        
        @use_args({'fields': fields.String(validate=field_validator(self.entity_class))})
        def get(self, args):
            fields = args['fields'].split(',') if 'fields' in args else self.entity_class.default_list_fields
            
            return { 'data': [ e.to_json(fields) for e in self.entity_class.list() if e.allow_read ] }
        
        return get(self)
    
    def post(self):
        if self.entity_class is None or not self.entity_class.supports_create and False:
            abort(405)
        
        if not self.entity_class.allow_create():
            abort(403)
        
        json = request.get_json()
        if json is None:
            abort(415)
        
        if any( k not in self.entity_class.writeable_fields for k in json.keys() ):
            abort(422)
        elif any( k not in json or json[k] is None for k in self.entity_class.required_fields ):
            abort(422)
        elif any( not self.entity_class.allow_create_with_field(k) for k in json.keys() ):
            abort(403)
        
        e = self.entity_class.create_new()
        
        for k, v in json.items():
            e.set_field(k, v)
        
        e.commit()
        
        return { 'data': e.to_json(self.entity_class.default_get_fields) }
    
    def options(self):
        if self.entity_class is None:
            return {}
        else:
            return self.entity_class.describe()

class EntitySubListResource(Resource):
    outer_entity_class = None
    inner_entity_class = None
    
    def get_sub_list(self, outer):
        raise NotImplementedError()
    
    def get(self, id):
        if self.outer_entity_class is None or not self.outer_entity_class.supports_list:
            abort(405)
        elif self.inner_entity_class is None:
            abort(405)
        
        outer = self.outer_entity_class.get(id)
            
        if outer is None:
            abort(404)
        elif not outer.allow_read:
            abort(403)
        
        @use_args({'fields': fields.String(validate=field_validator(self.inner_entity_class))})
        def get(self, args):
            fields = args['fields'].split(',') if 'fields' in args else self.inner_entity_class.default_list_fields
            
            return { 'data': [ e.to_json(fields) for e in self.get_sub_list(outer) if e.allow_read ] }
        
        return get(self)
    
    def options(self, id):
        if self.inner_entity_class is None:
            return {}
        else:
            return self.entity_class.describe()

class EntityResource(Resource):
    entity_class = None
    
    def get(self, id):
        if self.entity_class is None or not self.entity_class.supports_get:
            abort(405)
        
        @use_args({'fields': fields.String(validate=field_validator(self.entity_class))})
        def get(self, id, args):
            fields = args['fields'].split(',') if 'fields' in args else self.entity_class.default_get_fields
            result = self.entity_class.get(id)
            
            if result is None:
                abort(404)
            elif not result.allow_read:
                abort(403)
            
            return { 'data': result.to_json(fields) }
        
        return get(self, id)
    
    def delete(self, id):
        if self.entity_class is None or not self.entity_class.supports_get:
            abort(405)
        
        result = self.entity_class.get(id)
        
        if result is None:
            abort(404)
        elif not result.allow_delete:
            abort(403)
        
        result.delete()
        result.commit()
        
        return {}
    
    def patch(self, id):
        if self.entity_class is None or not self.entity_class.supports_update:
            abort(405)
        
        result = self.entity_class.get(id)
        
        if result is None:
            abort(404)
        elif not result.allow_update:
            abort(403)
        
        json = request.get_json()
        if json is None:
            abort(415)
        
        for op_dict in json['ops']:
            o = op_dict['op']
            n = op_dict['field']
            v = op_dict['value']
            
            if n not in self.entity_class.writeable_fields:
                abort(422)
            elif not result.allow_update_field(n):
                abort(403)
            
            if o == 'set':
                result.set_field(n, v)
            elif o == 'add':
                result.add_to_field(n, v)
            elif o == 'remove':
                result.remove_from_field(n, v)
            else:
                abort(422)
        
        result.commit()
        
        return { 'data': result.to_json(self.entity_class.default_get_fields) }
    
    def options(self, id):
        if self.entity_class is None:
            return {}
        else:
            return self.entity_class.describe()
