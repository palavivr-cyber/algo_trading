"""Shared declarative base, naming convention, and small cross-dialect helpers
used by every model. Postgres is the source of truth in every real
environment; SQLite (aiosqlite) is used only to run the test suite without a
running Postgres instance, so every column type here must work on both.
"""
import uuid
from datetime import datetime

from sqlalchemy import JSON, DateTime, MetaData, String, func
from sqlalchemy.dialects import postgresql
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column

# Explicit naming convention so constraint names are stable across dialects
# and Alembic autogenerate never proposes a rename-only diff.
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}

metadata_obj = MetaData(naming_convention=NAMING_CONVENTION)


class Base(DeclarativeBase):
    metadata = metadata_obj


# JSON on every dialect, JSONB (indexable) on Postgres specifically.
JSONVariant = JSON().with_variant(postgresql.JSONB(astext_type=JSON), "postgresql")


def new_uuid() -> str:
    return str(uuid.uuid4())


def uuid_pk() -> Mapped[str]:
    return mapped_column(String(36), primary_key=True, default=new_uuid)


class TimestampMixin:
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )
