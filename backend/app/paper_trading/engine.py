"""Simulated trading engine: evaluates an active strategy against live market
data and drives simulated order creation. Implemented in Phase 7. Never
places a real exchange order — see app.exchanges for the (separate) live
trading path, which paper trading never calls.
"""


async def run_paper_trading_tick(paper_account_id: str):
    raise NotImplementedError("Implemented in Phase 7")
