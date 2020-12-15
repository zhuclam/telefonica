from werkzeug.security import generate_password_hash

#mine
from bootstrap import db, User
from env_var import (
    admin_username,
    admin_password,
    user_username,
    user_password
)


admin = User(username= admin_username, password_hash=generate_password_hash(admin_password), is_admin=1)
db.session.add(admin)
pub = User(username= user_username, password_hash=generate_password_hash(user_password), is_admin=0)
db.session.add(pub)
db.session.commit()
print("Admin and user created successfully.")
