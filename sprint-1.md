# Sprint 1

## Sprint Goal
Ship a modernized, test-backed Node.js web service that follows current runtime and container best practices.

## In-Scope Chains

1. Baseline the repository and identify the missing service/runtime pieces.
2. Define the Node package contract, scripts, and runtime expectations.
3. Implement a minimal web service with a health endpoint and configuration handling.
4. Add automated tests plus local lint/test workflows.
5. Containerize the service and verify it runs correctly in Docker.
6. Document how to run, test, and containerize the service.

## Deferred Work

- Production deployment manifests or cloud hosting setup
- CI/CD workflow automation for the upstream app repo
- Feature endpoints beyond a minimal health/status surface
- Observability, metrics, auth, and persistence layers

## Critical Path

PIN-001 → PIN-002 → PIN-003 → PIN-004 → PIN-007 → PIN-008 → PIN-009

Supporting proof tracks:
- PIN-003 → PIN-005
- PIN-002 → PIN-006
- PIN-005 + PIN-006 + PIN-008 → PIN-010

## Root Targets

- PIN-001 — Establish a current Node.js service baseline and document missing app/runtime files

## Risks

- The upstream repo snapshot shows almost no application code, so the baseline may reveal missing expected files or an ambiguous service shape.
- Container choices may depend on the Node version and package manager selected during package setup.
- Early documentation assumptions can drift if the runnable service contract is not settled first.

## Owner-Class Summary

- default: all planned sprint targets

## Planned Targets

| ID | Depends on | Target |
| --- | --- | --- |
| PIN-001 | — | Establish a current Node.js service baseline and document missing app/runtime files |
| PIN-002 | PIN-001 | Define package.json scripts, engine target, and dependency set for the service |
| PIN-003 | PIN-002 | Create the application entrypoint and HTTP health endpoint |
| PIN-004 | PIN-003 | Add environment/config loading with safe defaults for local and container runs |
| PIN-005 | PIN-003 | Add automated tests for the health endpoint and startup behavior |
| PIN-006 | PIN-002 | Add linting and test commands that run cleanly in the Node project |
| PIN-007 | PIN-004 | Create a modern Dockerfile and .dockerignore for the Node service |
| PIN-008 | PIN-007 | Add container runtime verification for the service health endpoint |
| PIN-009 | PIN-006 | Document local development and container usage in a root README |
| PIN-010 | PIN-005 | Run end-to-end sprint hardening and close gaps from baseline to tested containerized service |