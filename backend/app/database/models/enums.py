"""Shared enums for DB models and Pydantic schemas.

Stored via sa.Enum(..., native_enum=False) everywhere (VARCHAR + CHECK
constraint on every dialect) rather than a native Postgres CREATE TYPE, so
adding a new value in a later phase is a simple column-constraint migration
instead of a type-altering one.
"""
from enum import Enum


class OrderSide(str, Enum):
    BUY = "buy"
    SELL = "sell"


class OrderType(str, Enum):
    MARKET = "market"
    LIMIT = "limit"


class OrderStatus(str, Enum):
    PENDING = "pending"
    FILLED = "filled"
    PARTIALLY_FILLED = "partially_filled"
    CANCELLED = "cancelled"
    REJECTED = "rejected"


class PositionSide(str, Enum):
    LONG = "long"
    SHORT = "short"


class TradingMode(str, Enum):
    PAPER = "paper"
    LIVE = "live"


class BacktestStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"


class BacktestEngine(str, Enum):
    VECTORBT = "vectorbt"
    BACKTRADER = "backtrader"
