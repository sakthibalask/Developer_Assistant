from flask import jsonify
from backend.models.userModel import User, Token, db
from flask_bcrypt import Bcrypt
import jwt
import datetime
from backend.config.ApplicationConfiguration import ApplicationConfig as config
from backend.roles.roles import *

# Helper function to decode token
def decode_token(token):
    try:
        return jwt.decode(token, config.secret_key, algorithms=['HS256']), None
    except jwt.ExpiredSignatureError:
        return None, "Token Expired"
    except jwt.InvalidTokenError:
        return None, "Token Invalid"
    except Exception as e:
        return None, str(e)

#Verify Token
def verifyToken(token):
    t = Token.query.filter_by(token = token, expired= True).first() is None
    if t:
        return False
    return True


# Token required decorator
def token_required(auth_header, role):
    if not auth_header or not auth_header.startswith("Bearer "):
        return jsonify({"message": "Token Not found"}), 401
    extracted_token = auth_header.split(" ")[1]
    decoded_token, error_message = decode_token(extracted_token)
    if not decoded_token:
        return jsonify({"message": error_message}), 403
    if decoded_token['role'] != role:
        return jsonify({"message": "Unauthorized"}), 403
    if verifyToken(extracted_token) or decoded_token['exp'] == 0:
        return jsonify({"message":"Token expired"}), 403
    return return_users()

# Expires the unused tokens
def expire_tokens(email):
    Token.query.filter_by(email=email, expired=False).update({"expired": True})
    db.session.commit()

# Stores the token
def store_token(token):
    decoded_token, error_message = decode_token(token)
    if not decoded_token:
        return jsonify({"message": error_message}), 403
    email = decoded_token['email']
    expire_tokens(email)
    new_user_token = Token(token=token, email=email, expired=False)
    db.session.add(new_user_token)
    db.session.commit()



# Creates new token
def create_token(email, role):
    payload = {
        "email": email,
        "role": role,
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
    }
    return jwt.encode(payload, config.secret_key, algorithm='HS256')

# Registers new users
def register_user(email, password, role, bcrypt):
    if User.query.filter_by(email=email).first():
        return jsonify({"message": "User Exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(email=email, password=hashed_password, role=str(hasRole(role)))
    db.session.add(new_user)
    db.session.commit()

    generated_token = create_token(new_user.email, new_user.role)
    store_token(generated_token)

    return jsonify({
        "message": "User Registered Successfully",
        "token": generated_token
    }), 200

# Authenticates users
def user_authentication(email, password, bcrypt):
    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Invalid email or password"}), 401

    generated_token = create_token(user.email, user.role)
    store_token(generated_token)

    return jsonify({
        "message": "Login Successful",
        "token": generated_token,
        "role": user.role
    }), 200

# Forgot Password
def check_forgot_user(email):
    if not User.query.filter_by(email=email).first():
        return jsonify({"error": "User Not Found"}), 404
    return jsonify({"message": "Check out your mail"}), 200

# Logouts existing users
def logout(extracted_token):
    decoded_token, error_message = decode_token(extracted_token)
    if not decoded_token:
        return jsonify({"message": error_message}), 403
    
    if verifyToken(extracted_token):
        return jsonify({"message":"Session expired"}), 404

    user_token = Token.query.filter_by(email=decoded_token['email'],expired=False).first()
    if not user_token:
        return jsonify({"message": "Session expired"}), 404

    user_token.expired = True
    db.session.commit()

    return jsonify({"message": "Logout successful"}), 200

# Gets current valid tokens
def get_token(email):
    user_token = Token.query.filter_by(email=email, expired=False).first()
    if not user_token:
        return jsonify({"message": "Session expired"}), 403
    return jsonify({"token": user_token.token}), 200

# Returns all users
def return_users():
    try:
        users = User.query.all()
        user_list = [{"email": user.email, "role": user.role} for user in users]
        return jsonify(user_list), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
