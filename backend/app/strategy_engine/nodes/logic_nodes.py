from app.strategy_engine.nodes.base import EmptyParams, NodeCategory, NodeDefinition


class AndNode(NodeDefinition):
    node_type = "and"
    category = NodeCategory.LOGIC
    label = "AND"
    params_model = EmptyParams
    default_min_inputs = 2
    default_max_inputs = None


class OrNode(NodeDefinition):
    node_type = "or"
    category = NodeCategory.LOGIC
    label = "OR"
    params_model = EmptyParams
    default_min_inputs = 2
    default_max_inputs = None


class NotNode(NodeDefinition):
    node_type = "not"
    category = NodeCategory.LOGIC
    label = "NOT"
    params_model = EmptyParams
    default_min_inputs = 1
    default_max_inputs = 1
