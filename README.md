# Telefonica

Flask + React app for managing telephone preaching workflows. The app is deployed to multiple PythonAnywhere accounts, one per congregation/server.

## Repository Layout

- `flask_app.py` contains the Flask routes.
- `bootstrap.py` creates the Flask app, SQLAlchemy connection, auth, CORS, and models.
- `unlocker.py` is the daily PythonAnywhere scheduled task.
- `front-end/` is the React app.
- `front-end/build/` is the compiled frontend served by Flask in production.
- `env_var.template.py` documents the required local configuration keys.

## Server-Local Configuration

Each congregation needs its own ignored local files on PythonAnywhere:

- `env_var.py`
- `translations.json`
- `buttonColors.json`

Do not commit these files. `env_var.py` contains database credentials and SendGrid credentials.

## Python Dependencies

Install dependencies from `requirements.txt` inside a virtualenv. Do not use PythonAnywhere's global packages as the runtime, and do not replace `requirements.txt` with the output of `pip freeze`.

The current backend intentionally stays on older major versions because it still uses:

- `@jwt_required` instead of `@jwt_required()`.
- `db.engine.execute(...)`.
- Jinja2 2.x, which requires `MarkupSafe<2.1`.

## PythonAnywhere Setup

PythonAnywhere's own virtualenv guide is here: https://help.pythonanywhere.com/pages/VirtualEnvForWebsites

For each server, open a PythonAnywhere Bash console and replace `<pythonanywhere-user>` with that account username:

```bash
cd /home/<pythonanywhere-user>/mysite

mkvirtualenv telefonica-py38 --python=/usr/bin/python3.8
# If it already exists:
# workon telefonica-py38

python -m pip install --upgrade pip setuptools wheel
python -m pip install -r requirements.txt
python -m pip freeze > requirements.lock.txt
python -m compileall -q .

python - <<'PY'
import flask, flask_jwt_extended, flask_sqlalchemy, sqlalchemy, jinja2, markupsafe
print("Flask", flask.__version__)
print("Flask-JWT-Extended", flask_jwt_extended.__version__)
print("Flask-SQLAlchemy", flask_sqlalchemy.__version__)
print("SQLAlchemy", sqlalchemy.__version__)
print("Jinja2", jinja2.__version__)
print("MarkupSafe", markupsafe.__version__)
from flask_app import app
print("Imported app:", app.name)
PY
```

In the PythonAnywhere Web tab:

```text
Virtualenv: /home/<pythonanywhere-user>/.virtualenvs/telefonica-py38
Source code: /home/<pythonanywhere-user>/mysite
Working directory: /home/<pythonanywhere-user>
WSGI file imports: from flask_app import app as application
```

Reload the web app after changing the virtualenv or code.

## Scheduled Task

The PythonAnywhere scheduled task should use the virtualenv Python, not plain `python3.8`:

```bash
/home/<pythonanywhere-user>/.virtualenvs/telefonica-py38/bin/python /home/<pythonanywhere-user>/mysite/unlocker.py
```

`unlocker.py` drops and recreates the test/backup tables, so only run it manually when that is expected.

## Frontend Build

Build the frontend from the `front-end/` directory:

```bash
cd front-end
yarn install
yarn build
```

Deploy the resulting `front-end/build/` directory with the backend. Flask serves it through `app = Flask(__name__, static_folder="front-end/build")`.

## Creating A Release Branch

Production servers are expected to run `releases/<version>` branches, not `main`.

The release script lives at `front-end/scripts/release.js`. It:

1. Reads the current version from `front-end/.env`.
2. Bumps the version by `major`, `minor`, or `patch`.
3. Commits the updated `front-end/.env` on `main`.
4. Pushes `main`.
5. Creates `releases/<new-version>`.
6. Runs `yarn build`.
7. Commits the generated `front-end/build/`.
8. Pushes the release branch.

For the PythonAnywhere virtualenv/runtime-management change, create a major release from `6.3.1` to `7.0.0`:

```bash
git checkout main
git status
cd front-end
yarn bump major
```

That should create and push `releases/7.0.0`.

This frontend was built with Create React App 4. Use Node 16 for release builds when possible:

```bash
source ~/.nvm/nvm.sh
nvm use 16.13.0
cd front-end
yarn install
yarn bump major
```

The script requires a clean working tree on `main` and a GitHub credential with write access to `zhuclam/telefonica`.

## Rolling Out To Many PythonAnywhere Servers

For each congregation/server:

1. Back up or verify the ignored local config files.
2. Fetch the new release branch in `/home/<pythonanywhere-user>/mysite`.
3. Check out the target `releases/<version>` branch.
4. Create or activate `telefonica-py38`.
5. Run `python -m pip install -r requirements.txt`.
6. Import `flask_app` inside the virtualenv.
7. Set the Web tab virtualenv path.
8. Update the scheduled task command to use the virtualenv Python.
9. Reload the web app and check the error log.
