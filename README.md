# hframe

A small Node.js service with a repeatable local and container-based development workflow.

## Runtime expectations

- Node.js: use the version in `.nvmrc` (`20`)
- npm: use the npm version bundled with that Node.js release
- Docker: required for the container validation workflow

## Developer setup

1. Install Node.js 20.
2. Install dependencies from the project root:
   ```bash
   npm install
   ```
3. Start the service for local development:
   ```bash
   npm start
   ```

## Available scripts

Run all commands from the project root.

- `npm start` — start the application
- `npm test` — run the automated test suite
- `npm run validate` — install-independent validation flow for CI/local checks
- `npm run container:check` — build and smoke-test the container image

## Validation workflow

Use the same commands locally that the project uses for repeatable verification:

```bash
npm test
npm run validate
npm run container:check
```

A good pre-PR check is:

```bash
npm install
npm run validate
```

## Container workflow

Build and validate the containerized service with:

```bash
npm run container:check
```

This command should confirm that the image builds successfully and that the container starts with the expected runtime configuration.
