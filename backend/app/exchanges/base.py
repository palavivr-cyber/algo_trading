"""The exchange abstraction the rest of the backend depends on, so no module
outside app.exchanges ever imports CCXT or references a specific exchange
directly. app.exchanges.ccxt_service.CCXTExchange (Phase 5) is the first
concrete implementation; the strategy/execution/backtesting layers only ever
see this interface.

    Strategy Engine -> Execution Service -> ExchangeInterface -> CCXT -> Exchange
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from typing import Any


@dataclass
class Ticker:
    symbol: str
    last_price: float
    bid: float | None
    ask: float | None
    high_24h: float | None
    low_24h: float | None
    volume_24h: float | None
    timestamp: datetime


@dataclass
class Candle:
    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float


@dataclass
class OrderResult:
    exchange_order_id: str
    symbol: str
    side: str
    order_type: str
    quantity: float
    price: float | None
    status: str
    raw: dict[str, Any]


class ExchangeInterface(ABC):
    """Every method normalizes the underlying exchange's response into the
    dataclasses above — callers never see a raw CCXT/exchange-specific
    payload."""

    @abstractmethod
    async def fetch_ticker(self, symbol: str) -> Ticker: ...

    @abstractmethod
    async def fetch_ohlcv(self, symbol: str, timeframe: str, since: datetime | None, limit: int) -> list[Candle]: ...

    @abstractmethod
    async def fetch_current_price(self, symbol: str) -> float: ...

    @abstractmethod
    async def fetch_exchange_info(self) -> dict[str, Any]: ...

    @abstractmethod
    async def create_order(
        self, symbol: str, side: str, order_type: str, quantity: float, price: float | None = None
    ) -> OrderResult:
        """Live order placement. Must never be called unless
        settings.enable_live_trading is True and the caller has explicitly
        confirmed live (not paper) execution — see app.paper_trading, which
        never calls this."""
        ...
