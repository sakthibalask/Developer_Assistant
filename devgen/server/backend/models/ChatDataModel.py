from uuid import uuid4
from sqlalchemy.dialects.postgresql import ARRAY
from backend.models.models import db

def get__uuid():
    return uuid4().hex

class Chats(db.Model):
    __tablename__ = "chatsdata"
    
    id = db.Column(db.TEXT, primary_key=True, unique=True, default=get__uuid)
    chat_id = db.Column(db.TEXT, unique=True, nullable=False)
    user_prompt = db.Column(db.TEXT, unique=True, nullable=False)
    # Store plan_response and editor_code as arrays of TEXT
    plan_response = db.Column(ARRAY(db.TEXT), nullable=False)
    editor_code = db.Column(ARRAY(db.TEXT), nullable=False)


    