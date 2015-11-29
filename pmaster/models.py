from pmaster import db

class Prison(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.Unicode(64), index=True, unique=True, nullable=False)
    address = db.Column(db.UnicodeText, nullable=False)
    security_level = db.Column(db.Integer, nullable=False)
    
    def __repr__(self):
        return '<Prison ' + str(self.id) + '>'

class Prisoner(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    first_name = db.Column(db.Unicode(64), nullable=False)
    last_name = db.Column(db.Unicode(64), nullable=False)
    release_date = db.Column(db.Date)
    prison_id = db.Column(db.Integer, db.ForeignKey('prison.id'), index=True, nullable=False)
    cell_id = db.Column(db.Integer, db.ForeignKey('cell.id'), index=True, nullable=False)
    
    prison = db.relationship('Prison', backref='prisoners')
    cell = db.relationship('Cell', backref='prisoners')
    
    __table_args__ = (
        db.Index('ix_prisoner_name', 'last_name', 'first_name'),
    )
    
    def __repr__(self):
        return '<Prisoner ' + str(self.id) + '>'

class Cell(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    number = db.Column(db.Integer, nullable=False)
    prison_id = db.Column(db.Integer, db.ForeignKey('prison.id'), nullable=False)
    
    prison = db.relationship('Prison', backref='cells')
    
    __table_args__ = (
        db.Index('ix_cell_number', 'prison_id', 'number', unique=True),
    )
    
    def __repr__(self):
        return '<Cell ' + str(self.id) + '>'
        
class UserAccount(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    username = db.Column(db.Unicode(64), index=True, unique=True, nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    password_hash = db.Column(db.Text(), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), index=True)
    
    employee = db.relationship('Employee', backref=db.backref('user_account', uselist=False))
    
    def __repr__(self):
        return '<User Account ' + str(self.id) + '>'

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    security_clearance = db.Column(db.Integer, nullable=False)
    position = db.Column(db.UnicodeText, nullable=False)
    first_name = db.Column(db.Unicode(64), nullable=False)
    last_name = db.Column(db.Unicode(64), nullable=False)
    prison_id = db.Column(db.Integer, db.ForeignKey('prison.id'), index=True, nullable=False)
    
    prison = db.relationship('Prison', backref='employees')
    
    __table_args__ = (
        db.Index('ix_employee_name', 'last_name', 'first_name'),
    )
    
    def __repr__(self):
        return '<Employee ' + str(self.id) + '>'

class AccessCard(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    security_clearance = db.Column(db.Integer, nullable=False)
    expiry_date = db.Column(db.Date)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), index=True, nullable=False)
    
    employee = db.relationship('Employee', backref='access_cards')
    
    def __repr__(self):
        return '<Access Card ' + str(self.id) + '>'
        
class AccessLog(db.Model):
    __tablename__ = 'access_log'
    
    timestamp = db.Column(db.DateTime, nullable=False)
    access_point_id = db.Column(db.Integer, db.ForeignKey('access_point.id'), nullable=False)
    access_card_id = db.Column(db.Integer, db.ForeignKey('access_card.id'), nullable=False)
    
    access_point = db.relationship('AccessPoint', backref='access_logs')
    access_card = db.relationship('AccessCard', backref='access_logs')
    
    __table_args__ = (
        db.PrimaryKeyConstraint('access_point_id', 'timestamp'),
        db.Index('ix_access_log_card', 'access_card_id', 'timestamp'),
    )
    
    def __repr__(self):
        return '<Access Log ' + str(self.access_point_id) + ' ' + str(self.timestamp) + '>'
        
class AccessPoint(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    security_clearance = db.Column(db.Integer, nullable=False)
    prison_id = db.Column(db.Integer, db.ForeignKey('prison.id'), index=True, nullable=False)
    
    prison = db.relationship('Prison', backref='access_points')
    
    def __repr__(self):
        return '<Access Point ' + str(self.id) + '>'
        
class Schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    time_open = db.Column(db.Time, nullable=False)
    time_close = db.Column(db.Time, nullable=False)
    access_point_id = db.Column(db.Integer, db.ForeignKey('access_point.id'), index=True, nullable=False)
    
    access_point = db.relationship('AccessPoint', backref='schedules')
    
    def __repr__(self):
        return '<Schedule ' + str(self.id) + '>'
