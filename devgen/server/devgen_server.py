from backend.config.ApplicationConfiguration import ApplicationConfig as config
from backend.models.models import db
from backend.models.userModel import *
from backend.models.ChatDataModel import *
from backend.controller.ApplicationController import *


appConfig = config()



with appConfig.app.app_context():
    db.create_all()

if __name__ == "__main__":
    appConfig.app.run(debug=True, port=8181)