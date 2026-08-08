"""Unauthenticated liveness/readiness probe — used by the Docker Compose
healthcheck and for manually verifying the stack came up correctly."""
import redis.asyncio as redis
from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import get_db, get_redis

router = APIRouter(tags=["health"])


@router.get("/health")
async def health_check(db: AsyncSession = Depends(get_db), redis_client: redis.Redis = Depends(get_redis)) -> dict:
    db_ok = True
    try:
        await db.execute(text("SELECT 1"))
    except Exception:  # health checks must report status, never raise
        db_ok = False

    redis_ok = True
    try:
        redis_ok = bool(await redis_client.ping())
    except Exception:
        redis_ok = False

    return {"success": db_ok and redis_ok, "database": db_ok, "redis": redis_ok}
