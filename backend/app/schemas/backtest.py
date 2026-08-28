"""Request/response contracts for backtesting endpoints. Real implementation
(VectorBT/Backtrader) lands in Phase 6 — routes currently return 501.

Backtest results are historical simulations only and are never a guarantee
of future performance.
"""
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field

from app.database.models.enums import BacktestStatus


class BacktestRequest(BaseModel):
    strategy_id: str
    strategy_version: int | None = Field(default=None, description="Defaults to the latest saved version")
    symbol: str
    timeframe: str = "1h"
    start_date: datetime
    end_date: datetime
    starting_capital: float = Field(default=10_000, gt=0)
    fees_pct: float = Field(default=0.1, ge=0)
    slippage_pct: float = Field(default=0.05, ge=0)
    engine: Literal["vectorbt", "backtrader"] = "vectorbt"


class TradeHistoryItem(BaseModel):
    timestamp: datetime
    side: Literal["buy", "sell"]
    price: float
    quantity: float
    pnl: float | None


class EquityCurvePoint(BaseModel):
    timestamp: datetime
    value: float


class BacktestMetricsOut(BaseModel):
    total_return_pct: float
    net_profit: float
    win_rate_pct: float
    num_trades: int
    max_drawdown_pct: float
    sharpe_ratio: float | None
    profit_factor: float | None
    final_portfolio_value: float


class BacktestResultOut(BaseModel):
    id: str
    status: BacktestStatus
    metrics: BacktestMetricsOut | None
    equity_curve: list[EquityCurvePoint]
    trade_history: list[TradeHistoryItem]
