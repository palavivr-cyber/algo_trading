"""Market data endpoints. Real implementation (CCXT) lands in Phase 5 — see
app.exchanges.base.ExchangeInterface. Schemas are final so the frontend/team
can integrate against this contract now."""
from fastapi import APIRouter, Depends, Query

from app.api.dependencies import get_current_user
from app.core.exceptions import NotImplementedYetError
from app.database.models.user import User
from app.schemas.market import OHLCVResponse, TickerOut

router = APIRouter(prefix="/market", tags=["market"])


@router.get("/ticker", response_model=TickerOut)
async def get_ticker(
    symbol: str = Query(..., examples=["BTC/USDT"]), current_user: User = Depends(get_current_user)
) -> TickerOut:
    raise NotImplementedYetError("Market ticker data (CCXT integration)")


@router.get("/ohlcv", response_model=OHLCVResponse)
async def get_ohlcv(
    symbol: str = Query(..., examples=["BTC/USDT"]),
    timeframe: str = Query("1h", examples=["1h"]),
    limit: int = Query(200, le=1000),
    current_user: User = Depends(get_current_user),
) -> OHLCVResponse:
    raise NotImplementedYetError("Market OHLCV data (CCXT integration)")
