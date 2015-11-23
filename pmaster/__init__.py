from flask import Flask, render_template
from flask_socketio import SocketIO
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.script import Manager
from flask.ext.migrate import Migrate, MigrateCommand

app = Flask(__name__)
app.config.from_object('config')

db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

sio = SocketIO(app)

@manager.command
def run():
    sio.run(app, host='0.0.0.0', port=8080)

@app.route('/')
def index():
    return render_template('index.html')

from pmaster.models import *
