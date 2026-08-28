"""Event-driven backtesting engine (Backtrader), used where bar-by-bar
simulation fidelity matters more than vectorized speed (e.g. strategies with
path-dependent state like trailing stops). Implemented in Phase 6.
"""


def run_backtrader_backtest(strategy_graph, symbol: str, timeframe: str, start, end, starting_capital: float, fees_pct: float, slippage_pct: float):
    raise NotImplementedError("Implemented in Phase 6")
