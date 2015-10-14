from flask import Flask, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
app.config.from_object('config')

sio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')
