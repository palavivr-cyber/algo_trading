"""Pure-Python tests for the node registry — no FastAPI/DB involved."""
from app.strategy_engine.nodes.registry import NODE_REGISTRY, get_node_definition, is_known_node_type


def test_frontend_node_types_are_all_registered():
    # Every nodeType the strategy-builder frontend can currently emit
    # (src/store/useStrategyStore.ts) must resolve to a known definition.
    frontend_node_types = {
        "rsi",
        "macd",
        "movingAverage",
        "buy",
        "sell",
        "sentiment",
        "condition",
        "stopLoss",
        "takeProfit",
    }
    assert frontend_node_types.issubset(NODE_REGISTRY.keys())


def test_unknown_node_type_returns_none():
    assert get_node_definition("not_a_real_node") is None
    assert is_known_node_type("not_a_real_node") is False


def test_rsi_params_accept_valid_input():
    definition = get_node_definition("rsi")
    assert definition.validate_params({"period": 14, "oversold": 30, "overbought": 70}) == []


def test_rsi_params_reject_invalid_period():
    definition = get_node_definition("rsi")
    errors = definition.validate_params({"period": -1})
    assert errors  # non-empty: negative period is invalid


def test_condition_arity_depends_on_operator():
    definition = get_node_definition("condition")
    assert definition.input_arity({"operator": "<", "value": 30}) == (1, 1)
    assert definition.input_arity({"operator": "crosses_above"}) == (2, 2)


def test_logic_and_requires_at_least_two_inputs():
    definition = get_node_definition("and")
    min_inputs, max_inputs = definition.input_arity({})
    assert min_inputs == 2
    assert max_inputs is None
