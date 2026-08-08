"""Compiles a validated StrategyGraph into a topologically-ordered execution
plan and walks it against a market-data context to produce BUY/SELL/HOLD
signals plus attached risk (stop-loss/take-profit) instructions.

Implemented in Phase 4 — see the roadmap in backend/README.md. This is the
component that turns the safe internal IR (never generated Python — see
app.strategy_engine.parser / validator) into actual trading signals, and is
what app.backtesting and app.paper_trading call into.
"""
from dataclasses import dataclass
from typing import Any

from app.schemas.strategy import StrategyGraph


@dataclass
class Signal:
    node_id: str
    action: str  # "buy" | "sell" | "hold" | "set_stop_loss" | "set_take_profit"
    params: dict[str, Any]


class StrategyExecutor:
    """Constructed from an already-validated StrategyGraph. `evaluate()` is
    called once per bar/tick with the current market-data context."""

    def __init__(self, graph: StrategyGraph):
        self.graph = graph

    def evaluate(self, market_context: dict[str, Any]) -> list[Signal]:
        raise NotImplementedError("Implemented in Phase 4")
