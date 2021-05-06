from flask import jsonify, request
from flask_jwt_extended import create_access_token, get_jwt_identity, verify_jwt_in_request
from functools import wraps
from werkzeug.security import check_password_hash, generate_password_hash

# mine
from bootstrap import User, db


def admin_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        user = get_jwt_identity()
        if not user.get("is_admin"):
            return jsonify({"msg": "Only admins are allowed to access this resource."}), 403
        return func(*args, **kwargs)

    return wrapper


def authenticate():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get("username", None)
    password = request.json.get("password", None)
    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    user = User().query.filter(User.username == username).first()
    if not user or not check_password_hash(user.password_hash, password):
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.as_dict())
    return jsonify({"access_token": access_token, "is_admin": user.is_admin}), 200


def update_passwords(*, admin_p=None, user_p=None):
    if admin_p:
        password_hash = generate_password_hash(admin_p)
        db.engine.execute(f"UPDATE users set password_hash = '{password_hash}' where is_admin = 1")
    if user_p:
        password_hash = generate_password_hash(user_p)
        db.engine.execute(f"UPDATE users set password_hash = '{password_hash}' where is_admin = 0")
