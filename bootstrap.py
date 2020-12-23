from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from flask_migrate import Migrate
from datetime import date

# mine
from env_var import username, short_name, db_name, db_password
from utils import to_locale_string

# APP
app = Flask(__name__, static_folder='front-end/build')
app.config["DEBUG"] = True

# SQLALCHEMY
SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username= short_name,
    password= db_password,
    hostname= username + ".mysql.pythonanywhere-services.com",
    databasename= short_name + "$" + db_name,
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# MIGRATIONS
migrate = Migrate(app, db)

# AUTH
app.config['JWT_SECRET_KEY'] = 'reino1914'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = False
jwt = JWTManager(app)

# CORS
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)

    def as_dict(self):
       dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       del dict['password_hash']
       return dict


class Telefonica(db.Model):
    __tablename__ = "telefonica"
    id = db.Column(db.Integer, primary_key=True)
    info = db.Column(db.String(40))
    phone = db.Column(db.String(40), unique=True, nullable=False)
    answered_on = db.Column(db.DateTime())
    fulfilled_on = db.Column(db.Date())
    comments = db.Column(db.String(100))
    no_call = db.Column(db.Boolean, nullable=False)
    non_existent = db.Column(db.Boolean, nullable=False)
    unanswered_count = db.Column(db.Integer, nullable=False)
    unanswered_date = db.Column(db.DateTime)
    postponed_days = db.Column(db.Integer, nullable=False)
    commented_on = db.Column(db.Date)
    answering_machine_date = db.Column(db.Date)

    def as_dict(self):
       dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       dict = {key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))  for key in dict}
       return dict

class Telefonica_test(db.Model):
    __tablename__ = "telefonica_test"
    id = db.Column(db.Integer, primary_key=True)
    info = db.Column(db.String(40))
    phone = db.Column(db.String(40), unique=True, nullable=False)
    answered_on = db.Column(db.DateTime())
    fulfilled_on = db.Column(db.Date())
    comments = db.Column(db.String(100))
    no_call = db.Column(db.Boolean, nullable=False)
    non_existent = db.Column(db.Boolean, nullable=False)
    unanswered_count = db.Column(db.Integer, nullable=False)
    unanswered_date = db.Column(db.DateTime)
    postponed_days = db.Column(db.Integer, nullable=False)
    commented_on = db.Column(db.Date)
    answering_machine_date = db.Column(db.Date)

    def as_dict(self):
       dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       dict = {key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))  for key in dict}
       return dict

class Telefonica_backup(db.Model):
    __tablename__ = "telefonica_backup"
    id = db.Column(db.Integer, primary_key=True)
    info = db.Column(db.String(40))
    phone = db.Column(db.String(40), unique=True, nullable=False)
    answered_on = db.Column(db.DateTime())
    fulfilled_on = db.Column(db.Date())
    comments = db.Column(db.String(100))
    no_call = db.Column(db.Boolean, nullable=False)
    non_existent = db.Column(db.Boolean, nullable=False)
    unanswered_count = db.Column(db.Integer, nullable=False)
    unanswered_date = db.Column(db.DateTime)
    postponed_days = db.Column(db.Integer, nullable=False)
    commented_on = db.Column(db.Date)
    answering_machine_date = db.Column(db.Date)

    def as_dict(self):
       dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       dict = {key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))  for key in dict}
       return dict

class History(db.Model):
    __tablename__ = "history"
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer, nullable=False, index=True, unique=True)
    called_on = db.Column(db.Date(), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    genuine = db.Column(db.Boolean, nullable=False)

    def as_dict(self):
       dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       dict = {key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))  for key in dict}
       return dict

class History_test(db.Model):
    __tablename__ = "history_test"
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer, nullable=False, index=True, unique=True)
    called_on = db.Column(db.Date(), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    genuine = db.Column(db.Boolean, nullable=False)

    def as_dict(self):
       dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       dict = {key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))  for key in dict}
       return dict


class History_backup(db.Model):
    __tablename__ = "history_backup"
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer, nullable=False, index=True, unique=True)
    called_on = db.Column(db.Date(), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    genuine = db.Column(db.Boolean, nullable=False)

    def as_dict(self):
       dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
       dict = {key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))  for key in dict}
       return dict