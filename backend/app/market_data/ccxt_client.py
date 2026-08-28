"""Thin CCXT client wrapper (connection/instance management per exchange).
Implemented in Phase 5. See app.exchanges.base.ExchangeInterface for the
abstraction the rest of the app depends on instead of this module directly.
"""


def get_ccxt_client(exchange_id: str):
    raise NotImplementedError("Implemented in Phase 5")
