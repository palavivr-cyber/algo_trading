"""Pure-Python tests for structural graph parsing — no FastAPI/DB involved."""
from app.schemas.strategy import StrategyGraph
from app.strategy_engine.parser import parse_graph


def _node(node_id: str, node_type: str, params: dict | None = None) -> dict:
    return {
        "id": node_id,
        "type": node_type,
        "position": {"x": 0, "y": 0},
        "data": {"label": node_type, "nodeType": node_type, "params": params or {}},
    }


def _edge(edge_id: str, source: str, target: str) -> dict:
    return {"id": edge_id, "source": source, "target": target}


def test_parses_valid_graph_into_adjacency_maps():
    graph = StrategyGraph.model_validate(
        {
            "nodes": [_node("rsi-1", "rsi"), _node("condition-1", "condition", {"operator": "<", "value": 30})],
            "edges": [_edge("e1", "rsi-1", "condition-1")],
        }
    )
    result = parse_graph(graph)

    assert result.issues == []
    assert set(result.graph.nodes.keys()) == {"rsi-1", "condition-1"}
    assert result.graph.outgoing["rsi-1"] == ["condition-1"]
    assert result.graph.incoming["condition-1"] == ["rsi-1"]


def test_duplicate_node_id_is_flagged():
    graph = StrategyGraph.model_validate({"nodes": [_node("a", "rsi"), _node("a", "rsi")], "edges": []})
    result = parse_graph(graph)
    assert any(issue.code == "DUPLICATE_NODE_ID" for issue in result.issues)


def test_dangling_edge_is_flagged():
    graph = StrategyGraph.model_validate({"nodes": [_node("a", "rsi")], "edges": [_edge("e1", "a", "does-not-exist")]})
    result = parse_graph(graph)
    assert any(issue.code == "DANGLING_EDGE" for issue in result.issues)


def test_self_loop_is_flagged():
    graph = StrategyGraph.model_validate({"nodes": [_node("a", "rsi")], "edges": [_edge("e1", "a", "a")]})
    result = parse_graph(graph)
    assert any(issue.code == "SELF_LOOP" for issue in result.issues)


def test_node_type_mismatch_is_a_warning_not_an_error():
    node = _node("a", "rsi")
    node["type"] = "macd"  # top-level `type` disagrees with data.nodeType
    graph = StrategyGraph.model_validate({"nodes": [node], "edges": []})
    result = parse_graph(graph)
    mismatch_issues = [i for i in result.issues if i.code == "NODE_TYPE_MISMATCH"]
    assert len(mismatch_issues) == 1
    assert mismatch_issues[0].severity == "warning"
    # data.nodeType ("rsi") wins as the authoritative type
    assert result.graph.nodes["a"].node_type == "rsi"
