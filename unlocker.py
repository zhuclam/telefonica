from bootstrap import db


def job():
    print ("im working daily at 02:00am")
    db.engine.execute("UPDATE telefonica SET postponed_days = postponed_days - 1 WHERE postponed_days > 0;")

    print("gonna drop telefonica_test")
    db.engine.execute("DROP table telefonica_test;")
    db.engine.execute("CREATE TABLE telefonica_test LIKE telefonica;")
    db.engine.execute("INSERT INTO telefonica_test SELECT * FROM telefonica;")
    print("re-created telefonica_test")

    print("gonna drop history_test")
    db.engine.execute("DROP table history_test;")
    db.engine.execute("CREATE TABLE history_test LIKE history;")
    db.engine.execute("INSERT INTO history_test SELECT * FROM history;")
    print("re-created history_test")

    print("gonna drop telefonica_backup")
    db.engine.execute("DROP table telefonica_backup;")
    db.engine.execute("CREATE TABLE telefonica_backup LIKE telefonica;")
    db.engine.execute("INSERT INTO telefonica_backup SELECT * FROM telefonica;")
    print("re-created telefonica_backup")

    print("gonna drop history_backup")
    db.engine.execute("DROP table history_backup;")
    db.engine.execute("CREATE TABLE history_backup LIKE history;")
    db.engine.execute("INSERT INTO history_backup SELECT * FROM history;")
    print("re-created history_backup")

    print("gonna drop configurations_test")
    db.engine.execute("DROP table configurations_test;")
    db.engine.execute("CREATE TABLE configurations_test LIKE configurations;")
    db.engine.execute("INSERT INTO configurations_test SELECT * FROM configurations;")
    print("re-created configurations_test")


print ("init")
job()




#schedule.every(1).minutes.do(job)
#schedule.every().hour.do(job)



