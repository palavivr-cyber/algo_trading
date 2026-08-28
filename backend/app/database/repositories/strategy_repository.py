from sqlalchemy import func, select
from sqlalchemy.orm import selectinload

from app.database.models.strategy import Strategy, StrategyVersion
from app.database.repositories.base import BaseRepository


class StrategyRepository(BaseRepository[Strategy]):
    model = Strategy

    async def get_with_versions(self, strategy_id: str) -> Strategy | None:
        stmt = (
            select(Strategy)
            .where(Strategy.id == strategy_id)
            .options(selectinload(Strategy.versions))
            # The session uses expire_on_commit=False (see database.py), so a
            # Strategy already in the identity map (e.g. loaded earlier in
            # the same request) would otherwise keep its stale `versions`
            # collection even after a new version was just committed.
            .execution_options(populate_existing=True)
        )
        result = await self.session.execute(stmt)
        return result.scalar_one_or_none()

    async def list_for_user(self, user_id: str) -> list[Strategy]:
        stmt = (
            select(Strategy)
            .where(Strategy.user_id == user_id)
            .options(selectinload(Strategy.versions))
            .order_by(Strategy.updated_at.desc())
            .execution_options(populate_existing=True)
        )
        result = await self.session.execute(stmt)
        return list(result.scalars().all())

    async def next_version_number(self, strategy_id: str) -> int:
        stmt = select(func.max(StrategyVersion.version_number)).where(
            StrategyVersion.strategy_id == strategy_id
        )
        result = await self.session.execute(stmt)
        current_max = result.scalar_one_or_none()
        return (current_max or 0) + 1

    def add_version(self, version: StrategyVersion) -> StrategyVersion:
        self.session.add(version)
        return version
