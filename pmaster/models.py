from pmaster import db

class Prison(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode(64), index=True, unique=True)
    address = db.Column(db.UnicodeText)
    
    security_level = db.Column(db.Integer)
    
    def __repr__(self):
        return '<Prison ' + id + '>'

class Prisoner(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	first_name = db.Column(db.Unicode(64))
	last_name = db.Column(db.Unicode(64))
	release_date = db.Column(db.Date())
	
	def __repr__(self):
		return '<Prisoner ' + id + '>'

class Cell(db.Model):
	capacity = db.Column(db.Integer)
	number = db.Column(db.Integer, primary_key=True)
	
	def __repr__(self):
		return '<Cell ' + number + '>'
		
class UserAccount(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.Unicode(64), index=True, unique=True)
	is_active = db.Column(db.Boolean())
	password_hash = db.Column(db.Text())
	
	def __repr__(self):
		return '<User Account ' + id + '>'

class Employee(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	security_clearance = db.Column(db.Integer)
	position = db.Column(db.UnicodeText)
	first_name = db.Column(db.Unicode(64))
	last_name = db.Column(db.Unicode(64))
	
	def __repr__(self):
		return '<Employee ' + id + '>'

class AccessCard(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	security_clearance = db.Column(db.Integer)
	expiry_date = db.Column(db.Date)
	
	def __repr__(self):
		return '<Access Card ' + id + '>'
		
class AccessLog(db.Model):
	timestamp = db.Column(db.DateTime(), primary_key=True)
	
	def __repr__(self):
		return '<Access Log ' + timestamp + '>'
		
class AccessPoint(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	security_clearance = db.Column(db.Integer)
	
	def __repr__(self):
		return '<Access Point ' + id + '>'
		
class Schedule(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	time_open = db.Column(db.DateTime())
	time_close = db.Column(db.DateTime())
	
	def __repr__(self):
		return '<Schedule ' + id + '>'