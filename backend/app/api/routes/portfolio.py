"""Portfolio aggregation endpoints. Real implementation lands alongside
paper trading (Phase 7) and live trading (Phase 10)."""
from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.core.exceptions import NotImplementedYetError
from app.database.models.user import User
from app.schemas.trading import PortfolioOut, PortfolioPerformanceOut

router = APIRouter(prefix="/portfolio", tags=["portfolio"])


@router.get("", response_model=PortfolioOut)
async def get_portfolio(current_user: User = Depends(get_current_user)) -> PortfolioOut:
    raise NotImplementedYetError("Portfolio aggregation")


@router.get("/performance", response_model=PortfolioPerformanceOut)
async def get_portfolio_performance(current_user: User = Depends(get_current_user)) -> PortfolioPerformanceOut:
    raise NotImplementedYetError("Portfolio performance analytics")
