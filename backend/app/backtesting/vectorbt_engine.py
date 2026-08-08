"""Primary vectorized backtesting engine (VectorBT). Implemented in Phase 6.
Accepts a validated strategy + symbol/timeframe/period/capital/fees/slippage
and returns the metrics defined in app.schemas.backtest.BacktestMetricsOut.

Backtest results are historical simulations only and are never a guarantee
of future performance.
"""


def run_vectorbt_backtest(strategy_graph, symbol: str, timeframe: str, start, end, starting_capital: float, fees_pct: float, slippage_pct: float):
    raise NotImplementedError("Implemented in Phase 6")
