import os
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin

# mine
from bootstrap import app, db, Telefonica, Telefonica_test
from auth import authenticate, admin_required
from utils import handle_error, days_utils, PHONE_STATUS, to_locale_string, db_result_to_dict, validate, validate_keys
from services import phone_service

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

@app.route("/next", methods=["GET"])
@cross_origin()
@jwt_required
def next():
    try:
        Tel = Telefonica_test if request.args.get("test") else Telefonica
        if request.args.get("id"):
            phone = Tel().query.get(request.args.get("id"))
        else:
            is_weekend = days_utils.check_today_is_weekend()
            if is_weekend:
                phone = Tel().query.filter(Tel.no_call != 1, Tel.postponed_days == 0, Tel.no_weekends == False).order_by(Tel.fulfilled_on.asc()).first()
            else:
                phone = Tel().query.filter(Tel.no_call != 1, Tel.postponed_days == 0).order_by(Tel.fulfilled_on.asc()).first()
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
            phone.fulfilled_on = to_locale_string(phone.fulfilled_on)

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
        answered = int(data.get('answered'))
        comments = data.get("comments")
        is_test = request.args.get("test")
        restore = data.get("restore")

        validate("body.answered", answered, lambda d: isinstance(d, int))
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

        return ('', 200)
    except Exception as e:
        return handle_error(e, "update_phone")

@app.route("/statistics", methods=["GET"])
@cross_origin()
@admin_required
def admin_dashboard():
    try:
        is_test = request.args.get("test")
        history_table = "history_test" if is_test else "history"
        telefonica_table = "telefonica_test" if is_test else "telefonica"

        result = db.engine.execute("""
            select r1.called_on as date, total_calls, different, answered, no_call, non_existent from (
                select
                called_on,
                count(phone_id) as different,
                sum(if(status = 2, 1, 0)) as non_existent,
                sum(if(status = 3, 1, 0)) as no_call
                from {}
                where genuine = 1
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
            """.format(history_table, history_table, history_table)
        )

        def row_str_to_date(row):
            row = dict(row)
            if row["date"] != 'never':
                row["date"] = row["date"].strftime("%d/%m/%Y")

            return row

        per_day_data = list(map(row_str_to_date, result))

        general_result = db.engine.execute("select sum(no_call) as no_call, count(*) as total_numbers, sum(non_existent) as non_existent from {};".format(telefonica_table))
        general_result = list(general_result)

        general_data = {
            "no_call": general_result[0]["no_call"],
            "total_numbers": general_result[0]["total_numbers"],
            "non_existent": general_result[0]["non_existent"],
        }

        per_month_result = db.engine.execute("select count(*) total, count(distinct phone_id) different, date_format(called_on, '%m/%Y') date, sum(if(status = 2, 1, 0)) inexistent, sum(if(status = 1, 1, 0)) answered from {} group by date_format(called_on, '%Y-%m') order by date desc;".format(history_table))

        per_month_result = db_result_to_dict(per_month_result)

        per_month_data = {
            #"months": days_utils.by_months(per_day_data),
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

        success_count, failure_count = phone_service.add_numbers(phones, is_test)

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
@jwt_required
def get_phones():
    try:
        is_test = request.args.get("test")
        Tel = Telefonica_test if is_test else Telefonica

        filters = {
            Tel.info : request.args.get("info", defaults="undefined"),
            Tel.phone: request.args.get("number", defaults="undefined"),
            Tel.id: request.args.get("id", defaults="undefined"),
            Tel.answered_on: request.args.get("answeredOn", defaults="undefined"),
            # calledOn is the same value for both fulfilled_on and unanswered_date
            Tel.fulfilled_on: request.args.get("calledOn", defaults="undefined"),
            Tel.unanswered_date: request.args.get("calledOn", defaults="undefined"),
            # end comment
            Tel.no_weekends: request.args.get("noWeekends", defaults="undefined"),
            Tel.no_call: request.args.get("noCall", defaults="undefined"),
            Tel.non_existent: request.args.get("nonExistent", defaults="undefined")
        }
        
        return jsonify(filters)

        if all(x == 'undefined' for x in filters.values()):
            return jsonify(error= "At least 1 filter is required"), 400

        filters = {k: a.get(k) if a.get(k) != 'never' else None for k in a if a.get(k) is not "undefined"}
        
        return jsonify(filters)


    except Exception as e:
        return handle_error(e, "get_phones")