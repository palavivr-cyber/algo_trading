"""Shared metric computations (Sharpe ratio, max drawdown, profit factor,
win rate, equity curve) consumed by both backtesting engines so VectorBT and
Backtrader runs produce identically-shaped, comparable results. Implemented
in Phase 6.
"""


def compute_metrics(equity_curve, trade_history):
    raise NotImplementedError("Implemented in Phase 6")
