from bootstrap import Telefonica, db

excel = open("data.txt", "r")
lines = excel.read().splitlines()

success_count = 0
failure_count = 0

for line in lines:
    try:
        data = line.split(",")
        address = data[0].replace("'", "")
        number = data[1].replace("'", "")

        found = Telefonica().query.filter(Telefonica.telefono == number).first()

        if found:
            print("found duplicate number {}".format(number))
            failure_count = failure_count + 1
            continue

        phone = Telefonica(direccion=address, telefono=number, non_existent=0, unanswered_count=0, postponed_days=0, comentarios="", no_call=0)
        db.session.add(phone)
        success_count = success_count + 1
    except Exception as e:
        print(str(e))
        failure_count = failure_count + 1

db.session.commit()


print("All done. Added {} phones to the table. {} phones failed to be added.".format(success_count, failure_count))

