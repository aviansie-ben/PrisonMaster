from pmaster import db

class Prison(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.Unicode(64), index=True, unique=True, nullable=False)
    address = db.Column(db.UnicodeText, nullable=False)
    security_level = db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
        return '<Prison ' + id + '>'

class Prisoner(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    first_name = db.Column(db.Unicode(64), nullable=False)
    last_name = db.Column(db.Unicode(64), nullable=False)
    release_date = db.Column(db.Date)
    prison_id = db.Column(db.Integer, db.ForeignKey('prison.id'), nullable=False)
    cell_id = db.Column(db.Integer, db.ForeignKey('cell.id'), nullable=False)
    
    prison = db.relationship('Prison', backref='prisoners')
    cell = db.relationship('Cell', backref='prisoners')
    
    def __repr__(self):
        return '<Prisoner ' + id + '>'

class Cell(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    number = db.Column(db.Integer, nullable=False)
    prison_id = db.Column(db.Integer, db.ForeignKey('prison.id'), nullable=False)
    
    prison = db.relationship('Prison', backref='cells')
    
    def __repr__(self):
        return '<Cell ' + number + '>'
        
class UserAccount(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.Unicode(64), index=True, unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    password_hash = db.Column(db.Text(), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    
    employee = db.relationship('Employee', backref=db.backref('user_account', uselist=False))
    
    def __repr__(self):
        return '<User Account ' + id + '>'

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    security_clearance = db.Column(db.Integer, nullable=False)
    position = db.Column(db.UnicodeText, nullable=False)
    first_name = db.Column(db.Unicode(64), nullable=False)
    last_name = db.Column(db.Unicode(64), nullable=False)
    prison_id = db.Column(db.Integer, db.ForeignKey('prison.id'), nullable=False)
    
    prison = db.relationship('Prison', backref='employees')
    
    def __repr__(self):
        return '<Employee ' + id + '>'

class AccessCard(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    security_clearance = db.Column(db.Integer, nullable=False)
    expiry_date = db.Column(db.Date)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    
    employee = db.relationship('Employee', backref='access_cards')
    
    def __repr__(self):
        return '<Access Card ' + id + '>'
        
class AccessLog(db.Model):
    timestamp = db.Column(db.DateTime, primary_key=True, nullable=False)
    access_point_id = db.Column(db.Integer, db.ForeignKey('access_point.id'), primary_key=True, nullable=False)
    access_card_id = db.Column(db.Integer, db.ForeignKey('access_card.id'), nullable=False)
    
    access_point = db.relationship('AccessPoint', backref='access_logs')
    access_card = db.relationship('AccessCard', backref='access_logs')
    
    def __repr__(self):
        return '<Access Log ' + timestamp + '>'
        
class AccessPoint(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    security_clearance = db.Column(db.Integer, nullable=False)
    prison_id = db.Column(db.Integer, db.ForeignKey('prison.id'), nullable=False)
    
    prison = db.relationship('Prison', backref='access_points')
    
    def __repr__(self):
        return '<Access Point ' + id + '>'
        
class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    time_open = db.Column(db.DateTime, nullable=False)
    time_close = db.Column(db.DateTime, nullable=False)
    access_point_id = db.Column(db.Integer, db.ForeignKey('access_point.id'), nullable=False)
    
    access_point = db.relationship('AccessPoint', backref='schedules')
    
    def __repr__(self):
        return '<Schedule ' + id + '>'
