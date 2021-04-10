from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from env_var import sendgrid_token, username

from bootstrap import db, Telefonica, Telefonica_test, History, History_test, Configurations, Configurations_test, Watch_task
from utils import now, today, PHONE_STATUS, handle_error

class config_service():
    def get_config(is_test):
        Table = Configurations_test if is_test else Configurations
        return Table().query.get(1)

class phone_service():
    def get_phone(id, is_test, restore = None):
        Table = Telefonica_test if is_test else Telefonica
        phone = Table().query.get(id)
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
        config = config_service.get_config(is_test)
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        if phone.unanswered_count >= config.unanswered_max_attemps - 1:
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
        config = config_service.get_config(is_test)
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        phone.non_existent = 1
        phone_service.send_to_end_of_queue(phone, config.non_existent_postponed_days)
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
        config = config_service.get_config(is_test)
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        if phone.unanswered_count >= config.answering_machine_max_attemps - 1:
            phone.unanswered_count = 0
            phone.unanswered_date = None
            phone.answering_machine_date = None
            phone_service.send_to_end_of_queue(phone)
        else:
            phone.unanswered_count = config.unanswered_max_attemps - 1
            phone.unanswered_date = now()
            phone.answering_machine_date = today()
            phone.postponed_days = config.answering_machine_postponed_days
        db.session.commit()

        if restore and restore["last_status"] is not None:
            history_service.restore_call(id=id, new_status=PHONE_STATUS.answering_machine, is_test=is_test, genuine=is_genuine, last_status=restore["last_status"])
        else:
            history_service.register_call(id = id, status = PHONE_STATUS.answering_machine, is_test = is_test, genuine = is_genuine)

    def handle_postponed(id, comments, is_test, restore):
        config = config_service.get_config(is_test)
        phone = phone_service.get_phone(id, is_test, restore)
        is_genuine = phone_service.is_genuine(phone)
        if restore is None:
            phone_service.handle_comments(phone, comments)
        if phone.unanswered_count >= config.unanswered_max_attemps - 1:
            phone.unanswered_count = 0
            phone.unanswered_date = None
            phone_service.send_to_end_of_queue(phone)
        else:
            phone.unanswered_count = phone.unanswered_count + 1
            phone.unanswered_date = now()
            phone.postponed_days = config.postponed_button_days
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

    def handle_rushed(id, comments, is_test):
        # this handler does not support restoring, because it shouldn't
        phone = phone_service.get_phone(id, is_test)
        is_genuine = phone_service.is_genuine(phone)
        phone_service.handle_comments(phone, comments)
        phone_service.send_to_end_of_queue(phone)
        db.session.commit()
        history_service.register_call(id = id, status = PHONE_STATUS.rushed, is_test = is_test, genuine = is_genuine)

    def validate_new_phones(phones):
        if not isinstance(phones, list) or not len(phones) > 0: return False
        for phone in phones:
            if not isinstance(phone, dict): return False
            info = phone.get("info")
            number = phone.get("number")
            if not number: return False
            if info is not None and not isinstance(info, str): return False
        return True

    def add_numbers(phones, territory_id, is_test = False):
        Tel = Telefonica_test if is_test else Telefonica

        success_count = 0
        failure_count = 0

        for phone in phones:
            try:
                info = phone.get("info")
                if info is None:
                    info = ""
                info = info.replace("'", "").strip()
                number = phone.get("number").replace("'", "").strip()

                found = Tel().query.filter(Tel.phone == number).first()

                if found:
                    failure_count = failure_count + 1
                    continue

                phone = Tel(info=info, phone=number, non_existent=0, unanswered_count=0, postponed_days=0, comments="", no_call=0, no_weekends=0, territory_id=territory_id)
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

class task_service():
    def check_task_executed():
        # task is run at 2am (ARG time) so don't check this until then
        if now().hour in (0, 1, 2): return

        status = Watch_task().query.get(1)
        if status.last_checked == today().date(): return

        if status.last_executed != today().date():
            mail_service.send_mail(
                to='zhuclam@gmail.com',
                subject='Problemas con la app de Telefonica ({})'.format(username),
                html='Hay que reactivar la tarea puesto que su plazo de 1 mes ha vencido. Para ello vaya a pythonanywhere.com, ingrese con su usuario, vaya a "tasks" y toque el botón verde. Ya que está, es recomendable también ir a la pestaña "Web" y tocar el botón amarillo para renovar también el uso de la app entera.'
            )

        status.last_checked = today().date()
        db.session.commit()

class mail_service():
    def send_mail(*, to, subject, html):
        message = Mail(
            from_email='zhuclam@gmail.com',
            to_emails=to,
            subject=subject,
            html_content=html
        )

        try:
            sg = SendGridAPIClient(sendgrid_token)
            response = sg.send(message)
            print(response.status_code)
            print(response.body)
            print(response.headers)
        except Exception as e:
            handle_error('email seding', e)
