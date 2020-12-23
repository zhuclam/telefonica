from bootstrap import db, Telefonica, Telefonica_test, History, History_test
from utils import now, today, PHONE_STATUS

class phone_service():
    def get_phone(id, is_test, restore):
        table = Telefonica_test if is_test else Telefonica
        phone = table.query.get(id)
        if restore:
            phone.answered_on = restore["answered_on"]
            phone.fulfilled_on = restore["fulfilled_on"]
            phone.no_call = restore["no_call"]
            phone.non_existent = restore["non_existent"]
            phone.unanswered_count = restore["unanswered_count"]
            phone.unanswered_date = restore["unanswered_date"]
            phone.postponed_days = restore["postponed_days"]
        return phone

    def send_to_end_of_queue(phone, postponed_days = 0):
        phone.fulfilled_on = today()
        phone.postponed_days = postponed_days
        phone.no_call = 0
        phone.unanswered_count = 0
        phone.unanswered_date = None
        phone.answering_machine_date = None
        if "contestador" in phone.comments or "mensaj" in phone.comments or "msj" in phone.comments or "casilla" in phone.comments:
            phone.comments = ''
            phone.commented_on = None

    def is_genuine(phone):
        return phone.unanswered_date is None

    def handle_comments(phone, comments):
        if phone.comments.strip() != comments.strip():
            phone.comments = comments.strip()
            phone.commented_on = today() if comments.strip() != '' else None

    def handle_unanswered(id, comments, is_test, restore):
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        if phone.unanswered_count >= 2:
            phone.unanswered_count = 0
            phone.unanswered_date = None
            phone_service.send_to_end_of_queue(phone)
        else:
            phone.unanswered_count = phone.unanswered_count + 1
            phone.unanswered_date = now()
            phone.postponed_days = 1 # call him again tomorrow
        db.session.commit()

        if restore and restore["last_status"] is not None:
            history_service.restore_call(id=id, new_status=PHONE_STATUS.unanswered, is_test=is_test, genuine=is_genuine, last_status=restore["last_status"])
        else:
            history_service.register_call(id = id, status = PHONE_STATUS.unanswered, is_test = is_test, genuine = is_genuine)

    def handle_answered(id, comments, is_test, restore):
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        phone.answered_on = now()
        phone_service.send_to_end_of_queue(phone)
        db.session.commit()

        if restore and restore["last_status"] is not None:
            history_service.restore_call(id=id, new_status=PHONE_STATUS.answered, is_test=is_test, genuine=is_genuine, last_status=restore["last_status"])
        else:
            history_service.register_call(id = id, status = PHONE_STATUS.answered, is_test = is_test, genuine = is_genuine)

    def handle_non_existent(id, comments, is_test, restore):
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        phone.non_existent = 1
        phone_service.send_to_end_of_queue(phone, 180)
        db.session.commit()

        if restore and restore["last_status"] is not None:
            history_service.restore_call(id=id, new_status=PHONE_STATUS.non_existent, is_test=is_test, genuine=is_genuine, last_status=restore["last_status"])
        else:
            history_service.register_call(id = id, status = PHONE_STATUS.non_existent, is_test = is_test, genuine = is_genuine)

    def handle_no_call(id, comments, is_test, restore):
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        phone_service.send_to_end_of_queue(phone)
        phone.no_call = 1
        db.session.commit()

        if restore and restore["last_status"] is not None:
            history_service.restore_call(id=id, new_status=PHONE_STATUS.no_call, is_test=is_test, genuine=is_genuine, last_status=restore["last_status"])
        else:
            history_service.register_call(id = id, status = PHONE_STATUS.no_call, is_test = is_test, genuine = is_genuine)

    def handle_answering_machine(id, comments, is_test, restore):
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        if phone.unanswered_count >= 1:
            phone.unanswered_count = 0
            phone.unanswered_date = None
            phone.answering_machine_date = None
            phone_service.send_to_end_of_queue(phone)
        else:
            phone.unanswered_count = 2
            phone.unanswered_date = now()
            phone.answering_machine_date = today()
            phone.postponed_days = 10
        db.session.commit()

        if restore and restore["last_status"] is not None:
            history_service.restore_call(id=id, new_status=PHONE_STATUS.answering_machine, is_test=is_test, genuine=is_genuine, last_status=restore["last_status"])
        else:
            history_service.register_call(id = id, status = PHONE_STATUS.answering_machine, is_test = is_test, genuine = is_genuine)

    def handle_postponed(id, comments, is_test, restore):
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        if phone.unanswered_count >= 2:
            phone.unanswered_count = 0
            phone.unanswered_date = None
            phone_service.send_to_end_of_queue(phone)
        else:
            phone.unanswered_count = phone.unanswered_count + 1
            phone.unanswered_date = now()
            phone.postponed_days = 3
        db.session.commit()

        if restore and restore["last_status"] is not None:
            history_service.restore_call(id=id, new_status=PHONE_STATUS.postponed, is_test=is_test, genuine=is_genuine, last_status=restore["last_status"])
        else:
            history_service.register_call(id = id, status = PHONE_STATUS.postponed, is_test = is_test, genuine = is_genuine)

    def handle_ignored(id, comments, is_test, restore):
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        phone_service.send_to_end_of_queue(phone)
        db.session.commit()
        if restore and restore["last_status"] is not None:
            history_service.restore_call(id=id, new_status=PHONE_STATUS.ignored, is_test=is_test, genuine=is_genuine, last_status=restore["last_status"])

    def validate_new_phones(phones):
        if not isinstance(phones, list) or not len(phones) > 0: return False
        for phone in phones:
            if not isinstance(phone, dict): return False
            info = phone.get("info")
            number = phone.get("number")
            if not number: return False
            if info is not None and not isinstance(info, str): return False
        return True

    def add_numbers(phones):
        success_count = 0
        failure_count = 0

        for phone in phones:
            try:
                info = phone.get("info")
                if info is None:
                    info = ""
                info = info.replace("'", "").strip()
                number = phone.get("number").replace("'", "").strip()

                found = Telefonica().query.filter(Telefonica.phone == number).first()

                if found:
                    failure_count = failure_count + 1
                    continue

                phone = Telefonica(info=info, phone=number, non_existent=0, unanswered_count=0, postponed_days=0, comments="", no_call=0)
                db.session.add(phone)
                success_count = success_count + 1
            except:
                failure_count = failure_count + 1

        db.session.commit()
        return success_count, failure_count

class history_service():
    def register_call(*, id, status, is_test, genuine):
        table = History_test if is_test else History
        Call = table(phone_id = id, status = status, called_on = now(), genuine = genuine)
        db.session.add(Call)
        db.session.commit()

    def restore_call(*, id, new_status, is_test, genuine, last_status):
        table = History_test if is_test else History
        if last_status == PHONE_STATUS.ignored:
            if new_status != PHONE_STATUS.ignored:
                history_service.register_call(id = id, status = new_status, is_test = is_test, genuine = genuine)
        else:
            if new_status == PHONE_STATUS.ignored:
                registry = table().query.filter(table.phone_id == id).order_by(table.called_on.desc()).first()
                #registry = db.engine.execute("select * from history{} where phone_id = {} order by called_on desc limit 1".format("_test" if is_test else "", id))
                if not registry:
                    return
                db.session.delete(registry)
                db.session.commit()
            else:
                registry = table().query.filter(table.phone_id == id).order_by(table.called_on.desc()).first()
                #registry = db.engine.execute("select * from history{} where phone_id = {} order by called_on desc limit 1".format("_test" if is_test else "", id))
                if not registry:
                    return
                registry.status = new_status
                registry.genuine = genuine
                db.session.commit()
