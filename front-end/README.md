# Telefonica Frontend

React frontend for the Telefonica Flask app.

## Development

```bash
yarn install
yarn start
```

The development server runs at http://localhost:3000.

## Build

```bash
yarn build
```

The production build is written to `front-end/build/`. The Flask backend serves that directory in production:

```python
app = Flask(__name__, static_folder="front-end/build")
```

## Release Helper

The existing release script is:

```bash
yarn bump patch
yarn bump minor
yarn bump major
```

It expects to run from the `front-end/` directory on the `main` branch with a clean working tree. It updates `.env`, creates a release branch, builds the frontend, commits the build output, and pushes the release branch.
