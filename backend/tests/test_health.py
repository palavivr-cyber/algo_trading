import pytest
from httpx import AsyncClient

pytestmark = pytest.mark.asyncio


async def test_health_check_reports_ok(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert body["database"] is True
    assert body["redis"] is True
