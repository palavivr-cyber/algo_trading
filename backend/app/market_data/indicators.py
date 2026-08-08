"""Vectorized (pandas/NumPy) indicator computation over full OHLCV
DataFrames, as opposed to app.strategy_engine.indicators which computes a
single node's series during strategy execution. Implemented in Phase 5/6 for
bulk backtesting use.
"""


def compute_indicator(name: str, df, params: dict):
    raise NotImplementedError("Implemented in Phase 5/6")
