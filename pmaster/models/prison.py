from pmaster import db

class Prison(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(64), index=True, unique=True)
    address = db.Column(db.UnicodeText)
    
    security_level = db.Column(db.Integer)
    
    def __repr__(self):
        return '<Prison ' + id + '>'
