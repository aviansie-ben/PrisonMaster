import eventlet
eventlet.monkey_patch()

from pmaster import app, sio

if __name__ == '__main__':
    sio.run(app, host='0.0.0.0', port=8080)
