"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

######## LOG IN ########


@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify(message="Matching e-mail not found"), 401

    if not check_password_hash(user.password, password):
        return jsonify(message="Incorrect password"), 401

    response_body = {
        "message": "User Found",
        "token": create_access_token(identity=email),
        "user": user.serialize()
    }

    return jsonify(response_body), 200


######## SIGN UP ########


@api.route("/signup", methods=["POST"])
def signup():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if not (email and password):
        return jsonify(message="Missing information"), 401

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify(message="User already exists"), 401

    user = User(email=email, password=generate_password_hash(password))
    db.session.add(user)
    db.session.commit()
    response_body = {
        "message": "New user successfully created! You may Log In now.",
        "user": user.serialize()
    }
    return jsonify(response_body), 200


######## PRIVATE ########


@api.route("/token", methods=["GET"])
@jwt_required()
def check_token():
    response_body = {
        "message": "Valid token"
    }
    return jsonify(response_body), 200