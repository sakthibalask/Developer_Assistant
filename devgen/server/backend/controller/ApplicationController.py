from flask import jsonify, request
from backend.config.ApplicationConfiguration import ApplicationConfig as config
from backend.service.ChatSender import ChatSenderService as ChatService
from backend.service.userService import *
from backend.roles.roles import *;

class ApplicationController:
    appconfig = config()
    app = appconfig.app

    # User Authentication 
    @app.route("/signup", methods =["POST"])
    def register():
        email = request.json["email"]
        password = request.json["password"]
        role = request.json["role"]
        return register_user(email, password,role,config.bcrypt)

    @app.route("/auth", methods = ["POST"])
    def login_user():
        email = request.json["email"]
        password = request.json["password"]
        return user_authentication(email, password, config.bcrypt)

    @app.route("/auth/forgot", methods = ["POST"])
    def checkUser():
        email = request.json["email"]
        return check_forgot_user(email)

    @app.route("/user/logout", methods = ["POST"])
    def userlogout():
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith("Bearer "):
            return {"message": "Token is missing or invalid format!"}, 401
        token = auth_header.split(" ")[1]
        response = logout(token)
        return response


    @app.route("/getUsers", methods=['GET'])
    def getUsers():
        auth_header = request.headers.get('Authorization')
        response = token_required(auth_header, hasRole('ADMIN'))
        return response

    @app.route("/user/logged", methods=["POST"])
    def getUserToken():
        user_email = request.json["email"]
        return get_token(user_email)
    

    # Devgen Controller

    @app.route('/devgen/chat', methods=["POST"])
    def DevgenChat():
        chatService = ChatService()
        query = request.json['query']
        code_data = chatService.chatSender(query)
        return code_data
    
