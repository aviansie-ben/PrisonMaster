from flask import Blueprint
from flask_restful import Api, Resource

api_blueprint = Blueprint('api', __name__)
api = Api(api_blueprint)

from pmaster.api import cell, prison, prisoner, user_account, employee, access_card, access_point, schedule
