import os
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin
import re

# mine
from bootstrap import (
    app,
    db,
    Telefonica,
    Telefonica_test,
    Configurations,
    Configurations_test,
    Territories,
    Territories_test
)
from auth import authenticate, admin_required, update_passwords
from utils import handle_error, days_utils, PHONE_STATUS, to_locale_string, db_result_to_dict, validate, validate_keys
from services import phone_service, task_service

@app.route('/', defaults={'path': ''}, methods=["GET"])
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return app.send_static_file(path)
    else:
        return app.send_static_file('index.html')

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    try:
        return authenticate()
    except Exception as e:
        return handle_error(e, 'login')

@app.route('/auth/passwords', methods=['PUT'])
@cross_origin()
def change_passwords():
    try:
        data = request.get_json()
        validate("body", data)

        admin_password = data.get("admin", None)
        user_password = data.get("user", None)

        if not admin_password and not user_password:
            return jsonify(error="At least 1 key is required."), 400

        validate("body.admin", admin_password, lambda a: type(a) == str and a != "", optional=True)
        validate("body.user", user_password, lambda u: type(u) == str and u != "", optional=True)

        update_passwords(admin_p = admin_password, user_p = user_password)

        return jsonify({}), 200
    except Exception as e:
        return handle_error(e, 'change_passwords')

@app.route("/next", methods=["GET"])
@cross_origin()
@jwt_required
def next():
    try:
        Tel = Telefonica_test if request.args.get("test") else Telefonica
        territory_id = request.args.get("territory")
        if request.args.get("id"):
            phone = Tel().query.get(request.args.get("id"))
        else:
            is_weekend = days_utils.check_today_is_weekend()
            if is_weekend:
                phone = Tel().query.filter(Tel.no_call != 1, Tel.postponed_days == 0, Tel.territory_id == territory_id, Tel.no_weekends == False).order_by(Tel.fulfilled_on.asc()).first()
            else:
                phone = Tel().query.filter(Tel.no_call != 1, Tel.postponed_days == 0, Tel.territory_id == territory_id).order_by(Tel.fulfilled_on.asc()).first()
            phone.postponed_days = 1
            phone.non_existent = 0
            db.session.commit()

        original_data = {
            "answered_on": phone.answered_on,
            "fulfilled_on": phone.fulfilled_on,
            "no_call": phone.no_call,
            "non_existent": phone.non_existent,
            "unanswered_count": phone.unanswered_count,
            "unanswered_date": phone.unanswered_date,
            "postponed_days": phone.postponed_days,
        }

        if phone.answered_on is not None:
            phone.answered_on = to_locale_string(phone.answered_on, True)

        if phone.fulfilled_on is not None:
            phone.fulfilled_on = to_locale_string(phone.fulfilled_on, True)

        if phone.unanswered_date is not None:
            phone.unanswered_date = to_locale_string(phone.unanswered_date, True)

        if phone.answering_machine_date is not None:
            phone.answering_machine_date = to_locale_string(phone.answering_machine_date)

        if phone.commented_on is not None:
            phone.commented_on = to_locale_string(phone.commented_on)

        return jsonify({ "phone": phone.as_dict(), "original": original_data}), 200
    except Exception as e:
        return handle_error(e, 'main')

@app.route("/update_phone", methods=["PUT"])
@cross_origin()
@jwt_required
def update_phone():
    try:
        data = request.get_json()
        validate("body", data)

        id = data.get('id')
        answered = data.get('answered')
        comments = data.get("comments")
        is_test = request.args.get("test")
        restore = data.get("restore")

        validate("body.answered", answered, lambda a: type(a) == int and a > -1 and a < 8)
        validate("body.comments", comments, lambda c: isinstance(c, str), optional = True)

        answered = int(answered)

        if answered == PHONE_STATUS.unanswered:
            phone_service.handle_unanswered(id, comments, is_test, restore)
        if answered == PHONE_STATUS.answered:
            phone_service.handle_answered(id, comments, is_test, restore)
        if answered == PHONE_STATUS.non_existent:
            phone_service.handle_non_existent(id, comments, is_test, restore)
        if answered == PHONE_STATUS.no_call:
            phone_service.handle_no_call(id, comments, is_test, restore)
        if answered == PHONE_STATUS.answering_machine:
            phone_service.handle_answering_machine(id, comments, is_test, restore)
        if answered == PHONE_STATUS.postponed:
            phone_service.handle_postponed(id, comments, is_test, restore)
        if answered == PHONE_STATUS.ignored:
            phone_service.handle_ignored(id, comments, is_test, restore)
        if answered == PHONE_STATUS.rushed:
            phone_service.handle_rushed(id, comments, is_test)

        return ('', 200)
    except Exception as e:
        return handle_error(e, "update_phone")

@app.route("/statistics", methods=["GET"])
@cross_origin()
@admin_required
def admin_dashboard():
    try:
        is_test = request.args.get("test")
        territory_id = request.args.get("territory")
        history_table = "history_test" if is_test else "history"
        telefonica_table = "telefonica_test" if is_test else "telefonica"

        row_count = db.session.execute('select count(id) as c from {} where territory_id = {}'.format(telefonica_table, territory_id)).scalar()

        if row_count == 0:
            return ('', 204)

        result = db.engine.execute("""
            select r1.called_on as date, total_calls, different, answered, no_call, non_existent from (
                select
                called_on,
                count(phone_id) as different,
                sum(if(status = 2, 1, 0)) as non_existent,
                sum(if(status = 3, 1, 0)) as no_call
                from {} h
                inner join {} t
                on h.phone_id = t.id
                where genuine = 1 and territory_id = {}
                group by date(called_on)
            ) r1
            inner join (
              select
                count(*) as total_calls,
                called_on
              from {}
              group by date(called_on)
            ) r2
            on date(r2.called_on) = date(r1.called_on)
            inner join (
                select
                sum(if(status = 1, 1, 0)) as answered,
                called_on
                from {}
                group by date(called_on)
            ) r3
            on date(r3.called_on) = date(r1.called_on)
            order by date desc
            """.format(history_table, telefonica_table, territory_id, history_table, history_table)
        )

        def row_str_to_date(row):
            row = dict(row)
            if row["date"] != 'never':
                row["date"] = row["date"].strftime("%d/%m/%Y")

            return row

        per_day_data = list(map(row_str_to_date, result))

        general_result = db.engine.execute("""
            select sum(no_call) as no_call, count(*) as total_numbers, sum(non_existent) as non_existent
            from {}
            where territory_id = {}
        """.format(telefonica_table, territory_id))

        general_result = list(general_result)

        general_data = {
            "no_call": general_result[0]["no_call"],
            "total_numbers": general_result[0]["total_numbers"],
            "non_existent": general_result[0]["non_existent"],
        }

        per_month_result = db.engine.execute("""
            select
                count(*) total,
                count(distinct phone_id) different,
                date_format(called_on, '%m/%Y') date,
                sum(if(status = 2, 1, 0)) inexistent,
                sum(if(status = 1, 1, 0)) answered
            from {} h
            inner join {} t
            on h.phone_id = t.id
            where territory_id = {}
            group by date_format(called_on, '%Y-%m')
            order by date desc;""".format(history_table, telefonica_table, territory_id))

        per_month_result = db_result_to_dict(per_month_result)

        per_month_data = {
            "months": per_month_result,
            "total_valid_numbers": general_result[0]["total_numbers"] - general_result[0]["non_existent"]
        }

        return jsonify({ "per_day_data": per_day_data, "general_data": general_data, "per_month_data": per_month_data }), 200
    except Exception as e:
        return handle_error(e, "statistics")

@app.route("/add_numbers", methods=["POST"])
@cross_origin()
@admin_required
def add_numbers():
    try:
        data = request.get_json()
        validate("body", data)
        phones = data.get('phones')
        validate('body.phones', phones, lambda p: phone_service.validate_new_phones(p))

        is_test = request.args.get("test")
        territory_id = request.args.get("territory")

        validate('query.territory', territory_id, lambda id: id.isnumeric() and int(id) > 0)

        territory_id = int(territory_id)

        success_count, failure_count = phone_service.add_numbers(phones, territory_id, is_test)

        return jsonify({"success_count": success_count, "failure_count": failure_count}), 201

    except Exception as e:
        return handle_error(e, "add_numbers")

@app.route("/phones/<phone_id>/options", methods=["PUT"])
@cross_origin()
@jwt_required
def edit_options(phone_id):
    try:
        data = request.get_json()
        validate("body", data, lambda d: len(d) > 0)
        invalid_key = validate_keys(data, ['call_on_weekends'])
        if invalid_key is not None:
            return jsonify(error= "Invalid '{}' key detected".format(invalid_key)), 400

        call_on_weekends = data.get('call_on_weekends')
        is_test = request.args.get("test")


        if call_on_weekends is not None:
            validate("body.call_on_weekends", call_on_weekends, lambda val: type(val) == bool)

        Tel = Telefonica_test if is_test else Telefonica
        phone = Tel().query.get(phone_id)

        if phone is None:
            return jsonify({"error": "Invalid phone id"}), 400

        if call_on_weekends is not None:
            phone.no_weekends = not call_on_weekends

        db.session.commit()

        return "", 204

    except Exception as e:
        return handle_error(e, "edit_options")

@app.route("/phones", methods=["GET"])
@cross_origin()
@admin_required
def get_phones():
    try:
        is_test = request.args.get("test")
        Telefonica_table = 'telefonica_test' if is_test else 'telefonica'

        invalid_key = validate_keys(request.args, ['count', 'info', 'number', 'id', 'answeredOn', 'calledOn', 'noWeekends', 'noCall', 'nonExistent', 'comments'])
        if invalid_key is not None:
            return jsonify(error= "Invalid '{}' key detected".format(invalid_key)), 400

        territory_id = request.args.get("territory")
        validate('query.territory', territory_id, lambda id: id.isnumeric() and int(id) > 0)
        territory_id = int(territory_id)

        limit = request.args.get("count", 100)

        filters = {
            "info" : request.args.get("info", "undefined"),
            "phone": request.args.get("number", "undefined"),
            "id": request.args.get("id", "undefined"),
            "answered_on": request.args.get("answeredOn", "undefined"),
            # calledOn is the same value for both fulfilled_on and unanswered_date
            "calledOn": request.args.get("calledOn", "undefined"),
            # end comment
            "no_weekends": request.args.get("noWeekends", "undefined"),
            "no_call": request.args.get("noCall", "undefined"),
            "non_existent": request.args.get("nonExistent", "undefined"),
            "comments": request.args.get("comments", "undefined"),
        }

        if all(x == 'undefined' for x in filters.values()):
            return jsonify(error= "At least 1 filter is required"), 400

        filters = {k: filters.get(k) if filters.get(k) != 'never' else None for k in filters if filters.get(k) != "undefined"}

        retrieve_query = "select * from {} where territory_id = {} and ".format(Telefonica_table, territory_id)
        count_query = "select count(*) as count from {} where territory_id = {} and ".format(Telefonica_table, territory_id)

        where_clause = ""

        for i, k in enumerate(filters):
            value = filters.get(k)
            if value == "false": value = 0
            if value == "true": value = 1

            if value is None:
                if k == "calledOn":
                    where_clause += "fulfilled_on is null and unanswered_date is null".format(value, value)
                else:
                    where_clause += "{} is null".format(k)
            elif value == "*":
                where_clause += "({} is not null and {} != '')".format(k, k)
            else:
                if k == "calledOn":
                    where_clause += "(fulfilled_on like '%{}%' or unanswered_date like '%{}%')".format(value, value)
                else:
                    where_clause += "{} like '%{}%'".format(k, value)

            if i != len(filters) - 1:
                where_clause += " and "

        retrieve_query += where_clause + " limit " + limit
        count_query += where_clause

        found_phones = db.engine.execute(retrieve_query)
        count = db.engine.execute(count_query)

        def phone_date_to_locale(phone):
            if phone.get("answered_on") is not None:
                phone["answered_on"] = to_locale_string(phone.get("answered_on"), True)

            if phone.get("fulfilled_on") is not None:
                phone["fulfilled_on"] = to_locale_string(phone.get("fulfilled_on"), True)

            if phone.get("unanswered_date") is not None:
                phone["unanswered_date"] = to_locale_string(phone.get("unanswered_date"), True)

            if phone.get("answering_machine_date") is not None:
                phone["answering_machine_date"] = to_locale_string(phone.get("answering_machine_date"))

            if phone.get("commented_on") is not None:
                phone["commented_on"] = to_locale_string(phone.get("commented_on"))

            return phone

        found_phones = list(map(lambda p: phone_date_to_locale(p), db_result_to_dict(found_phones)))
        count = list(count)[0]["count"]

        return jsonify(phones= found_phones, count= count)
    except Exception as e:
        return handle_error(e, "get_phones")

@app.route("/phones/<phone_id>", methods=["PUT"])
@cross_origin()
@admin_required
def edit_phone(phone_id):
    try:
        is_test = request.args.get("test")
        Tel = Telefonica_test if is_test else Telefonica

        allowed_keys = [
            'phone',
            'comments',
            'info',
            'no_call',
            'non_existent',
            'postponed_days',
            'no_weekends'
        ]

        data = request.get_json()
        validate("body", data, lambda d: len(d) > 0)
        invalid_key = validate_keys(data, allowed_keys)
        if invalid_key is not None:
            return jsonify(error= "Invalid '{}' key detected".format(invalid_key)), 400

        number = data.get('phone')
        no_call = data.get('no_call')
        non_existent = data.get('non_existent')
        postponed_days = data.get('postponed_days')
        no_weekends = data.get('no_weekends')

        validate("body.phone", number, lambda p: p != '', optional=True)
        validate("body.no_call", no_call, lambda x: type(x) == bool, optional=True)
        validate("body.non_existent", non_existent, lambda x: type(x) == bool, optional=True)
        validate("body.no_weekends", no_weekends, lambda x: type(x) == bool, optional=True)
        validate("body.postponed_days", postponed_days, lambda n: n.isnumeric() and int(n) >= 0, optional=True)

        if not phone_id.isnumeric():
            return jsonify({"error": "Invalid phone id"}), 400

        phone = Tel().query.get(phone_id)

        if phone is None:
            return jsonify({"error": "Invalid phone id"}), 400

        for k, v in data.items():
            setattr(phone, k , v)

        db.session.commit()

        return jsonify(phone=phone.as_dict()), 200

    except Exception as e:
        return handle_error(e, "edit_phone")

@app.route("/phones/<phone_id>", methods=["DELETE"])
@cross_origin()
@admin_required
def delete_phone(phone_id):
    try:
        is_test = request.args.get("test")
        Tel = Telefonica_test if is_test else Telefonica

        if not phone_id.isnumeric():
            return jsonify({"error": "Invalid phone id"}), 400

        phone = Tel().query.get(phone_id)

        if phone is None:
            return jsonify({"error": "Invalid phone id"}), 400

        db.session.delete(phone)
        db.session.commit()

        return "{}", 200

    except Exception as e:
        return handle_error(e, "delete_phone")

@app.route("/phones/bulk", methods=["DELETE"])
@cross_origin()
@admin_required
def delete_phones():
    try:
        is_test = request.args.get("test")
        table = "telefonica_test" if is_test else "telefonica"

        data = request.get_json()
        validate("body", data, lambda d: len(d) > 0)

        allowed_keys = ["ids"]
        invalid_key = validate_keys(data, allowed_keys)

        if invalid_key is not None:
            return jsonify(error= "Invalid '{}' key detected".format(invalid_key)), 400

        ids = data.get('ids')
        validate("body.ids", ids, lambda l: isinstance(l, list) and len(l) > 0 and all(isinstance(x, int) for x in l))

        id_list = "("

        for index, id in enumerate(ids):
            id_list += str(id)
            if len(ids) -1 != index:
                id_list += ","

        id_list += ")"

        result = db.engine.execute("DELETE from {} where id in {}".format(table, id_list))

        if result.rowcount > 0:
            return "", 204
        else:
            return "No phones where deleted", 400

    except Exception as e:
        return handle_error(e, "delete_phones")

@app.route("/configurations", methods=["GET"])
@cross_origin()
@jwt_required
def get_configurations():
    try:
        is_test = request.args.get("test")

        Configs = Configurations_test if is_test else Configurations
        configs = Configs().query.all()
        configs = list(map(lambda c: c.as_dict(), configs))

        Terr = Territories_test if is_test else Territories
        territories = Terr().query.all()
        territories = list(map(lambda t: t.as_dict(), territories))

        task_service.check_task_executed()

        return jsonify(configs=configs, territories=territories), 200

    except Exception as e:
        return handle_error(e, "get_configurations")

@app.route("/configurations", methods=["PUT"])
@cross_origin()
@admin_required
def edit_configurations():
    try:
        is_test = request.args.get("test")
        Configs = Configurations_test if is_test else Configurations

        allowed_keys = [
            'unanswered_max_attemps',
            'answering_machine_max_attemps',
            'answering_machine_postponed_days',
            'postponed_button_days',
            'non_existent_postponed_days',
            'hidden_buttons'
        ]

        data = request.get_json()
        validate("body", data, lambda d: len(d) > 0)
        invalid_key = validate_keys(data, allowed_keys)
        if invalid_key is not None:
            return jsonify(error= "Invalid '{}' key detected".format(invalid_key)), 400

        unanswered_max_attemps = data.get('unanswered_max_attemps', 'nil')
        answering_machine_max_attemps = data.get('answering_machine_max_attemps', 'nil')
        answering_machine_postponed_days = data.get('answering_machine_postponed_days', 'nil')
        postponed_button_days = data.get('postponed_button_days', 'nil')
        non_existent_postponed_days = data.get('non_existent_postponed_days', 'nil')
        hidden_buttons = data.get('hidden_buttons', 'nil')


        if unanswered_max_attemps != 'nil':
            validate("body.unanswered_max_attemps", unanswered_max_attemps, lambda val: type(val) == int and val >= 1)

        if answering_machine_max_attemps != 'nil':
            validate("body.answering_machine_max_attemps", answering_machine_max_attemps, lambda val: type(val) == int and val >= 1)

        if answering_machine_postponed_days != 'nil':
            validate("body.answering_machine_postponed_days", answering_machine_postponed_days, lambda val: type(val) == int and val >= 1)

        if postponed_button_days != 'nil':
            validate("body.postponed_button_days", postponed_button_days, lambda val: type(val) == int and val >= 1)

        if non_existent_postponed_days != 'nil':
            validate("body.non_existent_postponed_days", non_existent_postponed_days, lambda val: type(val) == int and val >= 1)

        if hidden_buttons != 'nil':
            validate("body.hidden_buttons", hidden_buttons, lambda val: type(val) == str and (True if len(val) == 0 else all(n.isnumeric() and int(n) > -1 and int(n) < 7 for n in val.split(','))))

        baseConfig = Configs().query.get(1)

        for config, value in data.items():
            setattr(baseConfig, config, value)

        db.session.commit()

        allConfigs = list(map(lambda c: c.as_dict(), Configs().query.all()))

        return jsonify(configurations=allConfigs), 200

    except Exception as e:
        return handle_error(e, "edit_configurations")

@app.route("/territories", methods=["POST"])
@cross_origin()
@admin_required
def create_territory():
    try:
        is_test = request.args.get("test")
        data = request.get_json()

        validate("body", data, lambda d: len(d) > 0)
        invalid_key = validate_keys(data, ["name"])
        if invalid_key is not None:
            return jsonify(error= "Invalid '{}' key detected".format(invalid_key)), 400

        Terr = Territories_test if is_test else Territories

        name = data.get("name")
        is_valid_name = re.search("[^\w\-\d]", name) is None and Terr().query.filter(Terr.name == name).first() is None

        if not is_valid_name:
            return jsonify(error="invalid or duplicated name"), 400

        new_territory = Terr(name=name, active=1)
        db.session.add(new_territory)
        db.session.commit()

        Config = Configurations_test if is_test else Configurations
        new_config = Config( \
        campaign_mode = False, \
        unanswered_max_attemps = None, \
        answering_machine_max_attemps = None, \
        answering_machine_postponed_days = None, \
        postponed_button_days = None, \
        non_existent_postponed_days = None, \
        hidden_buttons = None, \
        territory_id = new_territory.id \
        )
        db.session.add(new_config)
        db.session.commit()

        return "", 201
    except Exception as e:
        return handle_error(e, "create_territory")

@app.route("/territories/<territory_id>", methods=["PUT"])
@cross_origin()
@admin_required
def modify_territory(territory_id):
    try:
        is_test = request.args.get("test")
        data = request.get_json()

        validate("body", data, lambda d: len(d) > 0)
        invalid_key = validate_keys(data, ["name", "active", "campaign_mode"])
        if invalid_key is not None:
            return jsonify(error= "Invalid '{}' key detected".format(invalid_key)), 400

        name = data.get("name")
        active = data.get("active")
        campaign_mode = data.get("campaign_mode")

        validate("body.name", name, lambda name: re.search("[^\w\-\d]", name) is None, optional=True)
        validate("body.active", active, lambda a: a in (0, 1, True, False), optional=True)
        validate("body.campaign_mode", campaign_mode, lambda a: a in (0, 1, True, False), optional=True)

        Terr = Territories_test if is_test else Territories
        territory = Terr().query.get(territory_id)

        validate("territory_id", territory_id, lambda t: territory is not None)

        if campaign_mode is not None:
            Configs = Configurations_test if is_test else Configurations
            config = Configs().query.filter(Configs.territory_id == territory_id).first()
            setattr(config, "campaign_mode", campaign_mode)
            del data["campaign_mode"]

        for key, value in data.items():
            setattr(territory, key, value)

        db.session.commit()

        return jsonify(territory=territory.as_dict(), config=config.as_dict()), 200
    except Exception as e:
        return handle_error(e, "modify_territory")

@app.route("/territories/<territory_id>", methods=["DELETE"])
@cross_origin()
@admin_required
def delete_territory(territory_id):
    try:
        if territory_id == "1":
            return jsonify({"error": "Base territory may not be deleted"}), 400

        is_test = request.args.get("test")
        Tel = Telefonica_test if is_test else Telefonica
        Terr = Territories_test if is_test else Territories
        Configs = Configurations_test if is_test else Configurations

        if not territory_id.isnumeric():
            return jsonify({"error": "Invalid territory id"}), 400

        territory = Terr().query.get(territory_id)

        if territory is None:
            return jsonify({"error": "Invalid territory id"}), 400

        config = Configs().query.filter(Configs.territory_id == territory_id).first()

        phones = Tel().query.filter(Tel.territory_id == territory_id)

        for phone in phones:
            phone.territory_id = 1

        db.session.delete(config)
        db.session.delete(territory)
        db.session.commit()

        return "", 200

    except Exception as e:
        return handle_error(e, "delete_territory")