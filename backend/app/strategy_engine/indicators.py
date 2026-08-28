"""Indicator math (RSI, SMA, EMA, MACD, Bollinger Bands) over pandas
DataFrames of OHLCV data. Implemented in Phase 4 — see the roadmap in
backend/README.md. Node definitions/validation (this phase) already exist in
app.strategy_engine.nodes.indicator_nodes; this module will hold the pandas
computations they call into.
"""
import pandas as pd


def rsi(close: pd.Series, period: int) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")


def sma(close: pd.Series, period: int) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")


def ema(close: pd.Series, period: int) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")


def macd(close: pd.Series, fast: int, slow: int, signal: int) -> pd.DataFrame:
    raise NotImplementedError("Implemented in Phase 4")


def bollinger_bands(close: pd.Series, period: int, std_dev: float) -> pd.DataFrame:
    raise NotImplementedError("Implemented in Phase 4")
