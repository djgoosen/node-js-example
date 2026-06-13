# hframe

## Validation workflow

Install dependencies:

```bash
npm install
```

Run the automated test suite:

```bash
npm test
```

Run the full validation workflow, including a container sanity check:

```bash
npm run validate:all
```

The container validation builds the local Docker image and runs the test suite inside the container so the modernized service can be verified in both local and containerized environments.
