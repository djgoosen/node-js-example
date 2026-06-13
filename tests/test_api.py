import importlib
import os
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))


@pytest.fixture()
def app_module(monkeypatch):
    monkeypatch.setenv("PORT", "3456")
    if "api.index" in sys.modules:
        del sys.modules["api.index"]
    module = importlib.import_module("api.index")
    yield module
    if "api.index" in sys.modules:
        del sys.modules["api.index"]


@pytest.fixture()
def client(app_module):
    return TestClient(app_module.app)


def test_health_route_returns_expected_payload(client):
    response = client.get("/")

    assert response.status_code == 200
    assert response.json() == {"message": "Hello from hframe!"}


def test_non_get_root_method_returns_method_not_allowed(client):
    response = client.post("/")

    assert response.status_code == 405


def test_unknown_route_returns_not_found(client):
    response = client.get("/does-not-exist")

    assert response.status_code == 404


def test_server_configuration_reads_port_from_environment(app_module):
    assert app_module.port == int(os.environ["PORT"])
