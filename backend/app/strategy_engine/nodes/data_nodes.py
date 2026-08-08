"""DATA nodes: raw market series a condition can compare against directly
(e.g. Price crosses_above a moving average)."""
from app.strategy_engine.nodes.base import EmptyParams, NodeCategory, NodeDefinition


class PriceNode(NodeDefinition):
    node_type = "price"
    category = NodeCategory.DATA
    label = "Price"
    params_model = EmptyParams
    default_min_inputs = 0
    default_max_inputs = 0


class VolumeNode(NodeDefinition):
    node_type = "volume"
    category = NodeCategory.DATA
    label = "Volume"
    params_model = EmptyParams
    default_min_inputs = 0
    default_max_inputs = 0
