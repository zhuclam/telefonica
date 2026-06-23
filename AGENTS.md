# AGENTS.md

## Project

Telefonica is a Flask + React app hosted on PythonAnywhere for telephone preaching workflows. The deployed backend directory is usually `/home/<pythonanywhere-user>/mysite`, and the PythonAnywhere WSGI file imports:

```python
from flask_app import app as application
```

The backend serves the compiled frontend from `front-end/build`. Do not delete that directory on a deployed server unless a fresh frontend build is being deployed immediately afterward.

## Congregation-Specific Files

Each PythonAnywhere server/congregation has local configuration. Do not overwrite, print, commit, or paste secrets from:

- `env_var.py`
- `translations.json`
- `buttonColors.json`
- `logs.txt`

Use `env_var.template.py`, `translations.example.json`, and `buttonColors.example.json` as safe examples.

## Dependency Rules

`requirements.txt` is the source of truth for the Python runtime. It should list only the app dependencies, not a full PythonAnywhere/global `pip freeze`.

Important compatibility constraints in the current backend:

- Keep `Flask-JWT-Extended` on `3.x` while routes use `@jwt_required` without parentheses.
- Keep `PyJWT==1.7.1` with `Flask-JWT-Extended==3.25.1`.
- Keep `SQLAlchemy<2.0` while the code uses `db.engine.execute(...)`.
- Keep `MarkupSafe<2.1` while using `Jinja2` 2.x, because `MarkupSafe>=2.1` removed `soft_unicode`.

Do not upgrade to `Flask-JWT-Extended>=4` or `SQLAlchemy>=2` without migrating the code first.

## PythonAnywhere Runtime

Recommended runtime per server:

- Python version: match the Web tab setting, currently expected to be Python `3.8`.
- Virtualenv name: `telefonica-py38`.
- Virtualenv path: `/home/<pythonanywhere-user>/.virtualenvs/telefonica-py38`.
- Source directory: `/home/<pythonanywhere-user>/mysite`.
- Scheduled task command: `/home/<pythonanywhere-user>/.virtualenvs/telefonica-py38/bin/python /home/<pythonanywhere-user>/mysite/unlocker.py`.

The scheduled task must use the virtualenv Python directly. Setting the virtualenv on the Web tab does not automatically change scheduled tasks.

## Server Repair / Setup

Run these commands in a PythonAnywhere Bash console for each congregation/server. Replace `<pythonanywhere-user>` with the account username.

```bash
cd /home/<pythonanywhere-user>/mysite

# Optional diagnostic snapshot. This is useful when comparing a broken server,
# but do not use it to regenerate requirements.txt.
python3.8 -m pip list | grep -E 'Flask|Jinja2|MarkupSafe|Werkzeug|SQLAlchemy|JWT|PyJWT|mysql|sendgrid' || true

# Create the virtualenv once.
mkvirtualenv telefonica-py38 --python=/usr/bin/python3.8

# If the virtualenv already exists, activate it instead.
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

Then update PythonAnywhere:

1. Web tab: set the virtualenv to `/home/<pythonanywhere-user>/.virtualenvs/telefonica-py38`.
2. Web tab: reload the web app.
3. Tasks tab: update the scheduled task command to `/home/<pythonanywhere-user>/.virtualenvs/telefonica-py38/bin/python /home/<pythonanywhere-user>/mysite/unlocker.py`.
4. Check the error log after reload.

Emergency-only hotfix if the site must come back before creating a virtualenv:

```bash
python3.8 -m pip install --user 'MarkupSafe==2.0.1'
```

That hotfix is temporary. The durable fix is the virtualenv.

## Release Branch Workflow

Production PythonAnywhere servers run `releases/<version>` branches. Do not deploy `main` directly unless a server has explicitly been configured that way.

The release script is `front-end/scripts/release.js`. It must be run from the `front-end/` directory while the repo is on a clean `main` branch:

```bash
git checkout main
git status
source ~/.nvm/nvm.sh
nvm use 16.13.0
cd front-end
yarn install
yarn bump major
```

For the PythonAnywhere virtualenv/runtime-management change, bump from `6.3.1` to `7.0.0`. The script bumps `front-end/.env`, commits that version bump on `main`, pushes `main`, creates `releases/<new-version>`, builds the frontend, commits `front-end/build`, and pushes the release branch.

After creating a release, deploy servers by fetching and checking out the release branch:

```bash
cd /home/<pythonanywhere-user>/mysite
git fetch origin
git checkout releases/<version>
git pull --ff-only origin releases/<version>
```

The GitHub identity running the release must have write access to `zhuclam/telefonica`.

## Verification Checklist

After each dependency or deployment change:

1. Import `flask_app` inside the virtualenv.
2. Reload the PythonAnywhere web app.
3. Open the app and log in.
4. Confirm one authenticated route works.
5. Confirm the scheduled task command points at the virtualenv Python.

Do not run `unlocker.py` manually unless it is safe for that database. It drops and recreates the test/backup tables.

## Future Upgrade Path

Do this as a separate migration, with a database backup and route testing:

- Change all `@jwt_required` decorators to `@jwt_required()`.
- Upgrade `Flask-JWT-Extended` to `4.x`.
- Replace `db.engine.execute(...)` and raw string SQL with SQLAlchemy 2-compatible calls using `text(...)`.
- Upgrade PythonAnywhere web apps from Python `3.8` to a currently supported Python version.
