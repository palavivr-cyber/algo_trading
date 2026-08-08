"""Backtesting endpoints. Real implementation (VectorBT/Backtrader) lands in
Phase 6. Backtest results are historical simulations only and are never a
guarantee of future performance."""
from fastapi import APIRouter, Depends, status

from app.api.dependencies import get_current_user
from app.core.exceptions import NotImplementedYetError
from app.database.models.user import User
from app.schemas.backtest import BacktestRequest, BacktestResultOut

router = APIRouter(prefix="/backtest", tags=["backtest"])


@router.post("", response_model=BacktestResultOut, status_code=status.HTTP_202_ACCEPTED)
async def run_backtest(payload: BacktestRequest, current_user: User = Depends(get_current_user)) -> BacktestResultOut:
    raise NotImplementedYetError("Backtesting (VectorBT/Backtrader engines)")


@router.get("/{backtest_id}", response_model=BacktestResultOut)
async def get_backtest(backtest_id: str, current_user: User = Depends(get_current_user)) -> BacktestResultOut:
    raise NotImplementedYetError("Backtesting (VectorBT/Backtrader engines)")
