import traceback
from datetime import datetime, timedelta
import functools
from flask import jsonify
from env_var import app_name
import calendar
import locale
locale.setlocale(locale.LC_TIME, "es_AR")

def handle_error(e, id):
        with open("/home/" + app_name + "/mysite/logs.txt", "a") as f:
                f.write(str(now()) + " - Error in " + id + " route: " + str(e) + ".\n" + traceback.format_exc() + "\n")
        return jsonify({"error": str(e)}), 500

def db_result_to_dict(db_result):
    def to_dict(row):
        return dict(row)
    return list(map(to_dict, db_result))

class PHONE_STATUS:
    unanswered = 0
    answered = 1
    non_existent = 2
    no_call = 3
    answering_machine = 4
    postponed = 5
    ignored = 6

def validate(name, data, validator = None, **kwargs):
    if data is None:
        if kwargs.get('optional'):
            return
        raise Exception("'{}' is required".format(name))

    if validator:
        valid = validator(data)
        if not valid:
            raise Exception("'{}' is invalid".format(name))

"""

Date utils here

"""
def today():
    return datetime.combine(datetime.today() - timedelta(hours=3), datetime.min.time())

def now():
    return datetime.now() - timedelta(hours=3)

def to_locale_string(d, show_time = False):
    if (show_time):
        return d.strftime("%a, %d %b %Y. %H:%Mhs")
    return d.strftime("%a, %d %b %Y")

class days_utils():
    def today(per_day_data):
        today_data = list(filter(lambda x: x["date"] == today().strftime("%d/%m/%Y"), per_day_data))
        if len(today_data) > 0:
            return today_data[0]["total_calls"]
        return 0

    def yesterday(per_day_data):
        yesterday_data = list(filter(lambda x: x["date"] == (today() - timedelta(days=1)).strftime("%d/%m/%Y"), per_day_data))
        if len(yesterday_data) > 0:
            return yesterday_data[0]["total_calls"]
        return 0

    def this_week(per_day_data):
        date_obj = today()
        start_of_this_week = date_obj - timedelta(days=date_obj.weekday())  # Monday
        days_list = [(start_of_this_week + timedelta(days=x)).strftime("%d/%m/%Y") for x in range(0,7)]
        data_list = list(filter(lambda x: x["date"] in days_list, per_day_data))
        return functools.reduce(lambda a, x: a+(x["total_calls"]), data_list, 0)

    def last_week(per_day_data):
        date_obj = today()
        start_of_last_week = date_obj - timedelta(days=date_obj.weekday()) - timedelta(days=7)
        days_list = [(start_of_last_week + timedelta(days=x)).strftime("%d/%m/%Y") for x in range(0,7)]
        data_list = list(filter(lambda x: x["date"] in days_list, per_day_data))
        return functools.reduce(lambda a, x: a+(x["total_calls"]), data_list, 0)

    def this_month(per_day_data):
        current_date = today()
        start_of_this_month = current_date - timedelta(days=current_date.day - 1)
        max_date = calendar.monthrange(current_date.year, current_date.month)[1]
        days_list = [(start_of_this_month + timedelta(days=x)).strftime("%d/%m/%Y") for x in range(0,max_date)]
        data_list = list(filter(lambda x: x["date"] in days_list, per_day_data))
        return functools.reduce(lambda a, x: a+(x["total_calls"]), data_list, 0)

    def last_month(per_day_data):
        current_date = today()
        last_month = current_date.month - 1 if current_date.month != 1 else 12
        last_month_year = current_date.year if current_date.month != 1 else current_date.year - 1
        last_month_max_date = calendar.monthrange(last_month_year, last_month)[1]
        start_of_last_month = current_date - timedelta(days=current_date.day - 1) - timedelta(days=last_month_max_date)
        days_list = [(start_of_last_month + timedelta(days=x)).strftime("%d/%m/%Y") for x in range(0,last_month_max_date)]
        data_list = list(filter(lambda x: x["date"] in days_list, per_day_data))
        return functools.reduce(lambda a, x: a+(x["total_calls"]), data_list, 0)

    def by_months(per_day_data):
        months = {}
        for item in per_day_data:
            if item["date"] == 'never':
                continue
            month = datetime.strptime(item["date"], "%d/%m/%Y").strftime("%m/%Y")
            if not month in months:
                months[month] = item["total_calls"] - item["non_existent"]
            else:
                months[month] = months[month] + item["total_calls"] - item["non_existent"]
        return months