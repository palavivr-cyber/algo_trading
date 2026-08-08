from sqlalchemy import ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.models.base import Base, JSONVariant, TimestampMixin, uuid_pk


class Strategy(Base, TimestampMixin):
    """A user-owned strategy. Holds identity/metadata only — the actual React
    Flow graph lives in its StrategyVersion rows so past versions are never
    destroyed. "Current version" is derived as MAX(version_number)."""

    __tablename__ = "strategies"

    id: Mapped[str] = uuid_pk()
    user_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(String(2000), nullable=True)

    user: Mapped["User"] = relationship(back_populates="strategies")
    versions: Mapped[list["StrategyVersion"]] = relationship(
        back_populates="strategy", cascade="all, delete-orphan", order_by="StrategyVersion.version_number"
    )


class StrategyVersion(Base, TimestampMixin):
    """Immutable snapshot of a strategy's React Flow graph. Never updated or
    deleted individually — a new row is inserted every time a strategy is
    edited."""

    __tablename__ = "strategy_versions"
    __table_args__ = (UniqueConstraint("strategy_id", "version_number", name="uq_strategy_version_number"),)

    id: Mapped[str] = uuid_pk()
    strategy_id: Mapped[str] = mapped_column(
        String(36), ForeignKey("strategies.id", ondelete="CASCADE"), nullable=False, index=True
    )
    version_number: Mapped[int] = mapped_column(Integer, nullable=False)
    graph_json: Mapped[dict] = mapped_column(JSONVariant, nullable=False)
    created_by_user_id: Mapped[str | None] = mapped_column(
        String(36), ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )

    strategy: Mapped["Strategy"] = relationship(back_populates="versions")
