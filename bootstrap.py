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
app = Flask(__name__, static_folder="front-end/build")
app.config["DEBUG"] = True

# SQLALCHEMY
SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
    username=short_name,
    password=db_password,
    hostname=username + ".mysql.pythonanywhere-services.com",
    databasename=short_name + "$" + db_name,
)
app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"] = 299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

# MIGRATIONS
migrate = Migrate(app, db)

# AUTH
app.config["JWT_SECRET_KEY"] = "reino1914"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = False
jwt = JWTManager(app)

# CORS
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(128), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean(), nullable=False)

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        del dict["password_hash"]
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
    no_weekends = db.Column(db.Boolean, nullable=False)
    territory_id = db.Column(db.Integer, db.ForeignKey("territories.id"), nullable=False, server_default="1")
    campaign_status = db.Column(db.Boolean, nullable=False, server_default="0")
    territory = db.relationship("Territories")

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
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
    no_weekends = db.Column(db.Boolean, nullable=False)
    territory_id = db.Column(db.Integer, db.ForeignKey("territories_test.id"), nullable=False, server_default="1")
    campaign_status = db.Column(db.Boolean, nullable=False, server_default="0")
    territory = db.relationship("Territories_test")

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
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
    no_weekends = db.Column(db.Boolean, nullable=False)
    territory_id = db.Column(db.Integer, db.ForeignKey("territories.id"), nullable=False, server_default="1")
    campaign_status = db.Column(db.Boolean, nullable=False, server_default="0")
    territory = db.relationship("Territories")

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
        return dict


class History(db.Model):
    __tablename__ = "history"
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer, nullable=False, index=True)
    called_on = db.Column(db.Date(), nullable=False, index=True)
    status = db.Column(db.Integer, nullable=False)
    genuine = db.Column(db.Boolean, nullable=False)

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
        return dict


class History_test(db.Model):
    __tablename__ = "history_test"
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer, nullable=False, index=True)
    called_on = db.Column(db.Date(), nullable=False, index=True)
    status = db.Column(db.Integer, nullable=False)
    genuine = db.Column(db.Boolean, nullable=False)

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
        return dict


class History_backup(db.Model):
    __tablename__ = "history_backup"
    id = db.Column(db.Integer, primary_key=True)
    phone_id = db.Column(db.Integer, nullable=False, index=True)
    called_on = db.Column(db.Date(), nullable=False, index=True)
    status = db.Column(db.Integer, nullable=False)
    genuine = db.Column(db.Boolean, nullable=False)

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
        return dict


class Configurations(db.Model):
    __tablename__ = "configurations"
    id = db.Column(db.Integer, primary_key=True)
    unanswered_max_attemps = db.Column(db.Integer, nullable=True)
    answering_machine_max_attemps = db.Column(db.Integer, nullable=True)
    answering_machine_postponed_days = db.Column(db.Integer, nullable=True)
    postponed_button_days = db.Column(db.Integer, nullable=True)
    non_existent_postponed_days = db.Column(db.Integer, nullable=True)
    hidden_buttons = db.Column(db.String(40), nullable=True)

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
        del dict["id"]
        return dict


class Configurations_test(db.Model):
    __tablename__ = "configurations_test"
    id = db.Column(db.Integer, primary_key=True)
    unanswered_max_attemps = db.Column(db.Integer, nullable=True)
    answering_machine_max_attemps = db.Column(db.Integer, nullable=True)
    answering_machine_postponed_days = db.Column(db.Integer, nullable=True)
    postponed_button_days = db.Column(db.Integer, nullable=True)
    non_existent_postponed_days = db.Column(db.Integer, nullable=True)
    hidden_buttons = db.Column(db.String(40), nullable=True)

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
        del dict["id"]
        return dict


class Territories(db.Model):
    __tablename__ = "territories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    active = db.Column(db.Boolean, nullable=False, default=False)
    campaign_mode = db.Column(db.Boolean, nullable=False, default=False)

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
        return dict


class Territories_test(db.Model):
    __tablename__ = "territories_test"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    active = db.Column(db.Boolean, nullable=False, default=False)
    campaign_mode = db.Column(db.Boolean, nullable=False, default=False)

    def as_dict(self):
        dict = {c.name: getattr(self, c.name) for c in self.__table__.columns}
        dict = {
            key: dict.get(key) if not isinstance(dict.get(key), date) else to_locale_string(dict.get(key))
            for key in dict
        }
        return dict


class Watch_task(db.Model):
    __tablename__ = "watch_task"
    id = db.Column(db.Integer, primary_key=True)
    last_executed = db.Column(db.Date())
    last_checked = db.Column(db.Date())
