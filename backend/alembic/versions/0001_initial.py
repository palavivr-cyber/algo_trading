"""initial schema — users, strategies, strategy_versions, exchange_connections,
paper_accounts, orders, trades, portfolios, positions, backtests, backtest_results

Revision ID: 0001
Revises:
Create Date: 2026-08-08

"""
from typing import Sequence, Union

import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from alembic import op

revision: str = "0001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

JSONB = postgresql.JSONB(astext_type=sa.Text())


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("email", sa.String(255), nullable=False),
        sa.Column("hashed_password", sa.String(255), nullable=False),
        sa.Column("full_name", sa.String(255), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.PrimaryKeyConstraint("id", name="pk_users"),
    )
    op.create_index("ix_users_email", "users", ["email"], unique=True)

    op.create_table(
        "strategies",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("user_id", sa.String(36), nullable=False),
        sa.Column("name", sa.String(255), nullable=False),
        sa.Column("description", sa.String(2000), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_strategies_user_id_users", ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id", name="pk_strategies"),
    )
    op.create_index("ix_strategies_user_id", "strategies", ["user_id"])

    op.create_table(
        "strategy_versions",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("strategy_id", sa.String(36), nullable=False),
        sa.Column("version_number", sa.Integer(), nullable=False),
        sa.Column("graph_json", JSONB, nullable=False),
        sa.Column("created_by_user_id", sa.String(36), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(
            ["strategy_id"], ["strategies.id"], name="fk_strategy_versions_strategy_id_strategies", ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["created_by_user_id"], ["users.id"], name="fk_strategy_versions_created_by_user_id_users", ondelete="SET NULL"
        ),
        sa.PrimaryKeyConstraint("id", name="pk_strategy_versions"),
        sa.UniqueConstraint("strategy_id", "version_number", name="uq_strategy_version_number"),
    )
    op.create_index("ix_strategy_versions_strategy_id", "strategy_versions", ["strategy_id"])
    op.create_index("ix_strategy_versions_created_by_user_id", "strategy_versions", ["created_by_user_id"])

    op.create_table(
        "exchange_connections",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("user_id", sa.String(36), nullable=False),
        sa.Column("exchange_name", sa.String(64), nullable=False),
        sa.Column("label", sa.String(255), nullable=True),
        sa.Column("api_key_encrypted", sa.Text(), nullable=False),
        sa.Column("api_secret_encrypted", sa.Text(), nullable=False),
        sa.Column("passphrase_encrypted", sa.Text(), nullable=True),
        sa.Column("is_testnet", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name="fk_exchange_connections_user_id_users", ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id", name="pk_exchange_connections"),
    )
    op.create_index("ix_exchange_connections_user_id", "exchange_connections", ["user_id"])

    op.create_table(
        "paper_accounts",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("user_id", sa.String(36), nullable=False),
        sa.Column("strategy_id", sa.String(36), nullable=True),
        sa.Column("name", sa.String(255), nullable=False, server_default="Paper Account"),
        sa.Column("currency", sa.String(16), nullable=False, server_default="USDT"),
        sa.Column("starting_balance", sa.Numeric(20, 8), nullable=False),
        sa.Column("balance", sa.Numeric(20, 8), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_paper_accounts_user_id_users", ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["strategy_id"], ["strategies.id"], name="fk_paper_accounts_strategy_id_strategies", ondelete="SET NULL"
        ),
        sa.PrimaryKeyConstraint("id", name="pk_paper_accounts"),
    )
    op.create_index("ix_paper_accounts_user_id", "paper_accounts", ["user_id"])
    op.create_index("ix_paper_accounts_strategy_id", "paper_accounts", ["strategy_id"])

    op.create_table(
        "orders",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("user_id", sa.String(36), nullable=False),
        sa.Column("strategy_id", sa.String(36), nullable=True),
        sa.Column("paper_account_id", sa.String(36), nullable=True),
        sa.Column("exchange_connection_id", sa.String(36), nullable=True),
        sa.Column("mode", sa.Enum("paper", "live", name="ck_orders_mode", native_enum=False), nullable=False),
        sa.Column("symbol", sa.String(32), nullable=False),
        sa.Column("side", sa.Enum("buy", "sell", name="ck_orders_side", native_enum=False), nullable=False),
        sa.Column(
            "order_type", sa.Enum("market", "limit", name="ck_orders_order_type", native_enum=False), nullable=False
        ),
        sa.Column(
            "status",
            sa.Enum(
                "pending",
                "filled",
                "partially_filled",
                "cancelled",
                "rejected",
                name="ck_orders_status",
                native_enum=False,
            ),
            nullable=False,
            server_default="pending",
        ),
        sa.Column("quantity", sa.Numeric(20, 8), nullable=False),
        sa.Column("price", sa.Numeric(20, 8), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_orders_user_id_users", ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["strategy_id"], ["strategies.id"], name="fk_orders_strategy_id_strategies", ondelete="SET NULL"
        ),
        sa.ForeignKeyConstraint(
            ["paper_account_id"],
            ["paper_accounts.id"],
            name="fk_orders_paper_account_id_paper_accounts",
            ondelete="CASCADE",
        ),
        sa.ForeignKeyConstraint(
            ["exchange_connection_id"],
            ["exchange_connections.id"],
            name="fk_orders_exchange_connection_id_exchange_connections",
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name="pk_orders"),
    )
    op.create_index("ix_orders_user_id", "orders", ["user_id"])
    op.create_index("ix_orders_strategy_id", "orders", ["strategy_id"])
    op.create_index("ix_orders_paper_account_id", "orders", ["paper_account_id"])
    op.create_index("ix_orders_exchange_connection_id", "orders", ["exchange_connection_id"])
    op.create_index("ix_orders_symbol", "orders", ["symbol"])
    op.create_index("ix_orders_status", "orders", ["status"])

    op.create_table(
        "trades",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("order_id", sa.String(36), nullable=False),
        sa.Column("executed_price", sa.Numeric(20, 8), nullable=False),
        sa.Column("executed_quantity", sa.Numeric(20, 8), nullable=False),
        sa.Column("fee", sa.Numeric(20, 8), nullable=False, server_default="0"),
        sa.Column("pnl", sa.Numeric(20, 8), nullable=True),
        sa.Column("executed_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["order_id"], ["orders.id"], name="fk_trades_order_id_orders", ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id", name="pk_trades"),
    )
    op.create_index("ix_trades_order_id", "trades", ["order_id"])
    op.create_index("ix_trades_executed_at", "trades", ["executed_at"])

    op.create_table(
        "portfolios",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("user_id", sa.String(36), nullable=False),
        sa.Column("paper_account_id", sa.String(36), nullable=True),
        sa.Column("name", sa.String(255), nullable=False, server_default="Default Portfolio"),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_portfolios_user_id_users", ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["paper_account_id"],
            ["paper_accounts.id"],
            name="fk_portfolios_paper_account_id_paper_accounts",
            ondelete="SET NULL",
        ),
        sa.PrimaryKeyConstraint("id", name="pk_portfolios"),
    )
    op.create_index("ix_portfolios_user_id", "portfolios", ["user_id"])
    op.create_index("ix_portfolios_paper_account_id", "portfolios", ["paper_account_id"])

    op.create_table(
        "positions",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("portfolio_id", sa.String(36), nullable=False),
        sa.Column("symbol", sa.String(32), nullable=False),
        sa.Column("side", sa.Enum("long", "short", name="ck_positions_side", native_enum=False), nullable=False),
        sa.Column("quantity", sa.Numeric(20, 8), nullable=False),
        sa.Column("average_entry_price", sa.Numeric(20, 8), nullable=False),
        sa.Column("is_open", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("opened_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("closed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(
            ["portfolio_id"], ["portfolios.id"], name="fk_positions_portfolio_id_portfolios", ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id", name="pk_positions"),
    )
    op.create_index("ix_positions_portfolio_id", "positions", ["portfolio_id"])
    op.create_index("ix_positions_symbol", "positions", ["symbol"])
    op.create_index("ix_positions_is_open", "positions", ["is_open"])

    op.create_table(
        "backtests",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("user_id", sa.String(36), nullable=False),
        sa.Column("strategy_version_id", sa.String(36), nullable=False),
        sa.Column(
            "engine", sa.Enum("vectorbt", "backtrader", name="ck_backtests_engine", native_enum=False), nullable=False
        ),
        sa.Column("symbol", sa.String(32), nullable=False),
        sa.Column("timeframe", sa.String(16), nullable=False),
        sa.Column("start_date", sa.DateTime(timezone=True), nullable=False),
        sa.Column("end_date", sa.DateTime(timezone=True), nullable=False),
        sa.Column("starting_capital", sa.Numeric(20, 8), nullable=False),
        sa.Column("fees", sa.Numeric(10, 6), nullable=False, server_default="0"),
        sa.Column("slippage", sa.Numeric(10, 6), nullable=False, server_default="0"),
        sa.Column(
            "status",
            sa.Enum(
                "pending", "running", "completed", "failed", name="ck_backtests_status", native_enum=False
            ),
            nullable=False,
            server_default="pending",
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_backtests_user_id_users", ondelete="CASCADE"),
        sa.ForeignKeyConstraint(
            ["strategy_version_id"],
            ["strategy_versions.id"],
            name="fk_backtests_strategy_version_id_strategy_versions",
            ondelete="RESTRICT",
        ),
        sa.PrimaryKeyConstraint("id", name="pk_backtests"),
    )
    op.create_index("ix_backtests_user_id", "backtests", ["user_id"])
    op.create_index("ix_backtests_strategy_version_id", "backtests", ["strategy_version_id"])
    op.create_index("ix_backtests_status", "backtests", ["status"])

    op.create_table(
        "backtest_results",
        sa.Column("id", sa.String(36), nullable=False),
        sa.Column("backtest_id", sa.String(36), nullable=False),
        sa.Column("total_return_pct", sa.Numeric(12, 6), nullable=False),
        sa.Column("net_profit", sa.Numeric(20, 8), nullable=False),
        sa.Column("win_rate_pct", sa.Numeric(6, 3), nullable=False),
        sa.Column("num_trades", sa.Integer(), nullable=False),
        sa.Column("max_drawdown_pct", sa.Numeric(6, 3), nullable=False),
        sa.Column("sharpe_ratio", sa.Numeric(10, 6), nullable=True),
        sa.Column("profit_factor", sa.Numeric(10, 6), nullable=True),
        sa.Column("final_portfolio_value", sa.Numeric(20, 8), nullable=False),
        sa.Column("equity_curve_json", JSONB, nullable=False),
        sa.Column("trade_history_json", JSONB, nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(
            ["backtest_id"], ["backtests.id"], name="fk_backtest_results_backtest_id_backtests", ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id", name="pk_backtest_results"),
    )
    op.create_index("ix_backtest_results_backtest_id", "backtest_results", ["backtest_id"], unique=True)


def downgrade() -> None:
    op.drop_table("backtest_results")
    op.drop_table("backtests")
    op.drop_table("positions")
    op.drop_table("portfolios")
    op.drop_table("trades")
    op.drop_table("orders")
    op.drop_table("paper_accounts")
    op.drop_table("exchange_connections")
    op.drop_table("strategy_versions")
    op.drop_table("strategies")
    op.drop_table("users")
