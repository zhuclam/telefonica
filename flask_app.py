from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_cors import cross_origin

# mine
from bootstrap import app, db, Telefonica, Telefonica_test
from auth import authenticate, admin_required
from utils import handle_error, days_utils, PHONE_STATUS, to_locale_string, db_result_to_dict
from services import phone_service

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    try:
        return authenticate()
    except Exception as e:
        return handle_error(e, 'login')

@app.route('/protected', methods=['GET'])
@cross_origin()
@admin_required
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route("/next", methods=["GET"])
@cross_origin()
@jwt_required
def index():
    try:
        Tel = Telefonica_test if request.args.get("test") else Telefonica
        if request.args.get("id"):
            phone = Tel().query.get(request.args.get("id"))
        else:
            #phone = Tel().query.filter(Tel.no_call != 1, Tel.postponed_days == 0).order_by(Tel.fulfilled_on.asc()).first()
            phone = Tel().query.filter(Tel.no_call != 1).order_by(Tel.fulfilled_on.asc()).first()
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
        id = data.get('id')
        answered = int(data.get('answered'))
        comments = data.get("comments")
        is_test = request.args.get("test")
        restore = data.get("restore")

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
        result = db.engine.execute("""
            select
              t1.called_on as date,
              t2.total_calls,
              count(t1.phone_id) as different,
              sum(if(t1.status = 2, 1, 0)) as non_existent,
              sum(if(t1.status = 3, 1, 0)) as no_call,
              sum(if(t1.status = 1, 1, 0)) as answered
            from history t1
            inner join (
              select
                count(*) as total_calls,
                called_on
              from history
              group by date(called_on)
            ) t2
            on date(t2.called_on) = date(t1.called_on)
            where
              t1.genuine = 1
            group by date(t1.called_on)
            order by t1.called_on desc;
        """)

        def row_str_to_date(row):
            row = dict(row)
            if row["date"] != 'never':
                row["date"] = row["date"].strftime("%d/%m/%Y")

            return row
        per_day_data = list(map(row_str_to_date, result))

        calls = {
            "today": days_utils.today(per_day_data),
            "yesterday": days_utils.yesterday(per_day_data),
            "this_week": days_utils.this_week(per_day_data),
            "last_week": days_utils.last_week(per_day_data),
            "this_month": days_utils.this_month(per_day_data),
            "last_month": days_utils.last_month(per_day_data)
        }

        general_result = db.engine.execute("select sum(no_call) as no_call, count(*) as total_numbers, sum(non_existent) as non_existent from telefonica;")
        general_result = list(general_result)

        general_data = {
            "no_call": general_result[0]["no_call"],
            "total_numbers": general_result[0]["total_numbers"],
            "non_existent": general_result[0]["non_existent"],
        }

        per_month_result = db.engine.execute("select count(*) total, count(distinct phone_id) different, date_format(called_on, '%m/%Y') date, sum(if(status = 2, 1, 0)) inexistent, sum(if(status = 1, 1, 0)) answered from history group by date_format(called_on, '%Y-%m') order by date desc;")
        per_month_result = db_result_to_dict(per_month_result)

        per_month_data = {
            #"months": days_utils.by_months(per_day_data),
            "months": per_month_result,
            "total_valid_numbers": general_result[0]["total_numbers"] - general_result[0]["non_existent"]
        }

        return jsonify({ "per_day_data": per_day_data, "calls": calls, "general_data": general_data, "per_month_data": per_month_data }), 200
    except Exception as e:
        return handle_error(e, "statistics")