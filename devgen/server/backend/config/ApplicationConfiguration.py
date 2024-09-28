from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt

class ApplicationConfig:
    secret_key = 'RfurjxYlbFjdOkuVWRqtZTJMFlGbQbyoG4JGsJ4o7hw'
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://Devgenbd_owner:0ckgLlfjwIY7@ep-solitary-cherry-a52y03mo.us-east-2.aws.neon.tech/Devgenbd?sslmode=require'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db = SQLAlchemy(app) 
    cors = CORS(app, origins="*")
    bcrypt =  Bcrypt(app)

    # wishperModel = whisper.load_model("base")
    GOOGLE_API_KEY = "AIzaSyBrrSlmty4PF3iKuf7f0AzADdiZqitlYhA"
    GROQ_API_KEY = "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"
    CSEID_KEY = "8239119d1fee7415a"
    