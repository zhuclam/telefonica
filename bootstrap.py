from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from env_var import app_name, short_name, db_name

app = Flask(__name__)
app.config["DEBUG"] = True

SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username= short_name,
    password= "databasedatabase",
    hostname= app_name + ".mysql.pythonanywhere-services.com",
    databasename= short_name + "$" + db_name,
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

app.config['JWT_SECRET_KEY'] = 'reino1914'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
jwt = JWTManager(app)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128))
    password_hash = db.Column(db.String(128))
    is_admin = db.Column(db.Boolean())

    def as_dict(self):
       dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       del dict['password_hash']
       return dict


class Telefonica(db.Model):
    __tablename__ = "telefonica"
    id = db.Column(db.Integer, primary_key=True)
    direccion = db.Column(db.String(40))
    telefono = db.Column(db.String(40))
    answered_on = db.Column(db.DateTime())
    fulfilled_on = db.Column(db.Date())
    comentarios = db.Column(db.String(100))
    no_call = db.Column(db.Boolean)
    non_existent = db.Column(db.Boolean)
    unanswered_count = db.Column(db.Integer)
    unanswered_date = db.Column(db.DateTime)
    postponed_days = db.Column(db.Integer)
    commented_on = db.Column(db.Date)
    answering_machine_date = db.Column(db.Date)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class Telefonica_test(db.Model):
    __tablename__ = "telefonica_test"
    id = db.Column(db.Integer, primary_key=True)
    direccion = db.Column(db.String(40))
    telefono = db.Column(db.String(40))
    answered_on = db.Column(db.DateTime())
    fulfilled_on = db.Column(db.Date())
    comentarios = db.Column(db.String(100))
    no_call = db.Column(db.Boolean)
    non_existent = db.Column(db.Boolean)
    unanswered_count = db.Column(db.Integer)
    unanswered_date = db.Column(db.DateTime)
    postponed_days = db.Column(db.Integer)
    commented_on = db.Column(db.Date)
    answering_machine_date = db.Column(db.Date)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class History(db.Model):
    __tablename__ = "history"
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer)
    called_on = db.Column(db.Date())
    status = db.Column(db.Integer)
    genuine = db.Column(db.Boolean)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}

class History_test(db.Model):
    __tablename__ = "history_test"
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer)
    called_on = db.Column(db.Date())
    status = db.Column(db.Integer)
    genuine = db.Column(db.Boolean)

    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}