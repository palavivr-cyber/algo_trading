"""Simple fill simulator for paper trading MVP.

This module provides a deterministic, testable fill model used during
development. It is intentionally simple: fills at the provided ``current_price``
and applies a configurable slippage + fee model. More realistic order book
and partial-fill models will be added in later phases.
"""

DEFAULT_FEE_PCT = 0.001  # 0.1% fee
DEFAULT_SLIPPAGE_PCT = 0.0005  # 0.05% slippage


def _apply_slippage(price: float, side: str, slippage_pct: float) -> float:
    # Buys suffer upward slippage, sells suffer downward slippage
    if side.lower() == "buy":
        return price * (1 + slippage_pct)
    return price * (1 - slippage_pct)


def simulate_fill(order, current_price: float, fee_pct: float | None = None, slippage_pct: float | None = None):
    """Return a dict representing a single fill for the order.

    Parameters
    - order: ORM-like object with `side` and `quantity` attributes (duck-typed)
    - current_price: last trade price from market data
    - fee_pct, slippage_pct: optional overrides for the default model
    """
    fee_pct = DEFAULT_FEE_PCT if fee_pct is None else fee_pct
    slippage_pct = DEFAULT_SLIPPAGE_PCT if slippage_pct is None else slippage_pct

    # order.side may be an Enum instance (with .value) or a plain string
    side_val = order.side.value if hasattr(order.side, "value") else order.side

    executed_price = _apply_slippage(current_price, side_val, slippage_pct)
    executed_quantity = float(order.quantity)
    gross = executed_price * executed_quantity
    fee = gross * fee_pct
    pnl = None  # PnL will be computed by the portfolio layer when applicable

    return {
        "executed_price": float(executed_price),
        "executed_quantity": float(executed_quantity),
        "fee": float(fee),
        "pnl": pnl,
    }
