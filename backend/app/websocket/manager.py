"""WebSocket connection registry + broadcast, fed by app.redis.pubsub so the
frontend receives real-time updates without polling. Implemented in Phase 8.

Planned architecture:

    Exchange / Market Data -> Redis (pub/sub) -> WebSocketManager -> React frontend

Planned event names: price_update, candle_update, strategy_signal,
paper_order, portfolio_update, pnl_update, sentiment_update, bot_status.
"""
from fastapi import WebSocket


class WebSocketManager:
    def __init__(self):
        self._connections: dict[str, list[WebSocket]] = {}

    async def connect(self, user_id: str, websocket: WebSocket) -> None:
        raise NotImplementedError("Implemented in Phase 8")

    def disconnect(self, user_id: str, websocket: WebSocket) -> None:
        raise NotImplementedError("Implemented in Phase 8")

    async def broadcast(self, user_id: str, event: str, payload: dict) -> None:
        raise NotImplementedError("Implemented in Phase 8")


manager = WebSocketManager()
