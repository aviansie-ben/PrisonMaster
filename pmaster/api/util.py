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
                    if part not in cls.fields or cls.fields[part].writeonly:
                        raise ValidationError('Field ' + field + ' is unknown')
                    
                    cls = cls.fields[part].type
            
            if cls is not None and issubclass(cls, Entity):
                raise ValidationError('Field ' + field + ' is composite')
    
    return validate

class EntityField(object):
    def __init__(self, type, settable=True, required=True, writeonly=False):
        self.type = type
        self.settable = settable
        self.required = required and settable
        self.writeonly = writeonly
    
    def from_json(self, value):
        if value is None:
            if self.required:
                raise ValueError('Cannot put null into required field')
            
            return None
        else:
            if self.type is datetime:
                value = dateutil.parser.parse(value, ignoretz=True)
            elif self.type is date:
                value = dateutil.parser.parse(value, ignoretz=True).date()
            elif self.type is time:
                value = dateutil.parser.parse(value, ignoretz=True).time()
            elif issubclass(self.type, Entity):
                value = self.type.get(value)
                if value is None:
                    raise ValueError('Cannot find entity for relationship')
            
            if not isinstance(value, self.type):
                raise ValueError('Incorrect type for field')
            
            return value
    
    def to_json(self, value, sub_fields={}):
        if value is None:
            return None
        elif self.type is datetime or self.type is date or self.type is time:
            return value.isoformat()
        elif issubclass(self.type, Entity):
            return value.to_json(sub_fields)
        else:
            return value
    
    def describe(self):
        description = {
            'type': self.type_name,
            'ops': self.supported_ops,
            'readable': not self.writeonly,
        }
        
        if self.settable:
            description['required'] = self.required
        
        return description
    
    @property
    def supported_ops(self):
        if self.settable:
            return ['set']
        else:
            return []
    
    @property
    def type_name(self):
        return self.type.__name__

class EntityListField(EntityField):
    def __init__(self, entity_type, adder=None, remover=None):
        EntityField.__init__(self, entity_type, False, False)
        
        self.adder = adder
        self.remover = remover
    
    @property
    def supported_ops(self):
        ops = EntityField.supported_ops.fget(self)
        
        if self.adder is not None:
            ops.append('add')
            
        if self.remover is not None:
            ops.append('remove')
        
        return ops
    
    @property
    def type_name(self):
        return '[' + self.type.__name__ + ']'

class Entity(object):
    fields = {}
    
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
        return {'fields': { f: t.describe() for f, t in cls.fields.items() }}

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
        
        f = self.fields[field]
        val = getattr(self.entity, field)
        
        if issubclass(f.type, ModelEntity):
            if isinstance(val, list):
                val = [ f.type(lv) for lv in val ]
            else:
                val = f.type(val)
        
        if isinstance(val, list):
            return [ f.to_json(lv, sub_fields) for lv in val ]
        else:
            return f.to_json(val, sub_fields)
    
    def to_json(self, fields):
        result = {}
        direct_fields = { f.split('.', 1)[0] for f in fields }
        
        for field in direct_fields:
            if field == '*':
                for n, f in self.fields.items():
                    if not f.writeonly and not issubclass(f.type, Entity):
                        result[n] = self.field_to_json(n)
            else:
                result[field] = self.field_to_json(field, { f.split('.', 1)[1] for f in fields if f.startswith(field + '.') })
        
        return result
    
    def set_field(self, name, value):
        value = self.fields[name].from_json(value)
        if isinstance(value, ModelEntity):
            value = value.entity
            
        setattr(self.entity, name, value)
    
    def add_to_field(self, name, value):
        value = self.fields[name].type.get(value)
        if value is None:
            abort(422)
        
        self.fields[name].adder(self, value)
    
    def remove_from_field(self, name, value):
        value = self.fields[name].type.get(value)
        if value is None:
            abort(422)
        
        self.fields[name].remover(self, value)
    
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
        
        if any( not self.entity_class.fields[k].settable for k in json.keys() ):
            abort(422)
        elif any( f.required and n not in json for n, f in self.entity_class.fields.items() ):
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
    
    def put(self, id):
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
        
        for n, v in json.items():
            if n not in self.entity_class.fields:
                abort(422)
            elif not result.allow_update_field(n):
                abort(403)
            
            f = self.entity_class.fields[n]
            if not f.settable:
                abort(422)
            
            result.set_field(n, v)
        
        result.commit()
        
        return { 'data': result.to_json(self.entity_class.default_get_fields) }
    
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
            
            if n not in self.entity_class.fields:
                abort(422)
            elif not result.allow_update_field(n):
                abort(403)
            
            f = self.entity_class.fields[n]
            if o == 'set':
                if not f.settable:
                    abort(422)
                
                result.set_field(n, v)
            elif o == 'add':
                if not isinstance(f, EntityListField) or f.adder is None:
                    abort(422)
                
                result.add_to_field(n, v)
            elif o == 'remove':
                if not isinstance(f, EntityListField) or f.remover is None:
                    abort(422)
                
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
