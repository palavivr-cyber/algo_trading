"""Redis pub/sub channels feeding the WebSocket manager (price_update,
candle_update, strategy_signal, paper_order, portfolio_update, pnl_update,
sentiment_update, bot_status). Implemented in Phase 8 — see
app.websocket.manager for the consumer side.
"""


async def publish_event(channel: str, payload: dict):
    raise NotImplementedError("Implemented in Phase 8")


async def subscribe(channel: str):
    raise NotImplementedError("Implemented in Phase 8")
