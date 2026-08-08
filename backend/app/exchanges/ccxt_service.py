"""Concrete ExchangeInterface implementation backed by CCXT. Implemented in
Phase 5 — see the roadmap in backend/README.md and the interface this will
implement in app.exchanges.base.ExchangeInterface.
"""
from app.exchanges.base import Candle, ExchangeInterface, OrderResult, Ticker


class CCXTExchange(ExchangeInterface):
    def __init__(self, exchange_id: str, api_key: str | None = None, api_secret: str | None = None):
        raise NotImplementedError("Implemented in Phase 5")

    async def fetch_ticker(self, symbol: str) -> Ticker:
        raise NotImplementedError("Implemented in Phase 5")

    async def fetch_ohlcv(self, symbol, timeframe, since, limit) -> list[Candle]:
        raise NotImplementedError("Implemented in Phase 5")

    async def fetch_current_price(self, symbol: str) -> float:
        raise NotImplementedError("Implemented in Phase 5")

    async def fetch_exchange_info(self) -> dict:
        raise NotImplementedError("Implemented in Phase 5")

    async def create_order(self, symbol, side, order_type, quantity, price=None) -> OrderResult:
        raise NotImplementedError("Implemented in Phase 5")
