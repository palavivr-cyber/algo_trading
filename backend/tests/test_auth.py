import pytest
from httpx import AsyncClient

pytestmark = pytest.mark.asyncio


async def test_register_returns_token_and_user(client: AsyncClient):
    response = await client.post(
        "/api/auth/register", json={"email": "new@example.com", "password": "password123", "full_name": "New User"}
    )
    assert response.status_code == 201
    body = response.json()
    assert body["access_token"]
    assert body["user"]["email"] == "new@example.com"
    assert body["user"]["full_name"] == "New User"


async def test_register_duplicate_email_is_rejected(client: AsyncClient):
    payload = {"email": "dup@example.com", "password": "password123"}
    first = await client.post("/api/auth/register", json=payload)
    assert first.status_code == 201

    second = await client.post("/api/auth/register", json=payload)
    assert second.status_code == 409
    body = second.json()
    assert body["success"] is False
    assert body["error"]["code"] == "EMAIL_TAKEN"


async def test_login_with_correct_credentials(client: AsyncClient):
    await client.post("/api/auth/register", json={"email": "login@example.com", "password": "password123"})
    response = await client.post("/api/auth/login", json={"email": "login@example.com", "password": "password123"})
    assert response.status_code == 200
    assert response.json()["access_token"]


async def test_login_with_wrong_password_is_rejected(client: AsyncClient):
    await client.post("/api/auth/register", json={"email": "login2@example.com", "password": "password123"})
    response = await client.post("/api/auth/login", json={"email": "login2@example.com", "password": "wrong-password"})
    assert response.status_code == 401
    assert response.json()["error"]["code"] == "INVALID_CREDENTIALS"


async def test_login_with_unknown_email_is_rejected(client: AsyncClient):
    response = await client.post("/api/auth/login", json={"email": "nobody@example.com", "password": "password123"})
    assert response.status_code == 401


async def test_get_me_without_token_is_rejected(client: AsyncClient):
    response = await client.get("/api/users/me")
    assert response.status_code == 401
    assert response.json()["success"] is False


async def test_get_me_with_valid_token(client: AsyncClient):
    register = await client.post(
        "/api/auth/register", json={"email": "me@example.com", "password": "password123"}
    )
    token = register.json()["access_token"]

    response = await client.get("/api/users/me", headers={"Authorization": f"Bearer {token}"})
    assert response.status_code == 200
    assert response.json()["email"] == "me@example.com"


async def test_get_me_with_garbage_token_is_rejected(client: AsyncClient):
    response = await client.get("/api/users/me", headers={"Authorization": "Bearer not-a-real-token"})
    assert response.status_code == 401
