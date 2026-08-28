"""Condition/logic operator evaluation (<, >, <=, >=, ==, !=, crosses_above,
crosses_below, AND, OR, NOT) over computed indicator series. Implemented in
Phase 4 — see the roadmap in backend/README.md. Structural/param validation
for these node types (this phase) lives in
app.strategy_engine.nodes.condition_nodes / logic_nodes.
"""
import pandas as pd


def compare(operator: str, left: pd.Series, right: pd.Series | float) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")


def crosses_above(left: pd.Series, right: pd.Series) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")


def crosses_below(left: pd.Series, right: pd.Series) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")


def logical_and(*operands: pd.Series) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")


def logical_or(*operands: pd.Series) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")


def logical_not(operand: pd.Series) -> pd.Series:
    raise NotImplementedError("Implemented in Phase 4")
