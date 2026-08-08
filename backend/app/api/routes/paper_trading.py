"""Paper trading endpoints. Real implementation lands in Phase 7. Paper
trading never sends real orders to an exchange — see app.paper_trading."""
from fastapi import APIRouter, Depends, status

from app.api.dependencies import get_current_user
from app.core.exceptions import NotImplementedYetError
from app.database.models.user import User
from app.schemas.trading import PaperAccountOut, PaperTradeOut, PaperTradingStartRequest

router = APIRouter(prefix="/paper-trading", tags=["paper-trading"])


@router.post("/start", response_model=PaperAccountOut, status_code=status.HTTP_202_ACCEPTED)
async def start_paper_trading(
    payload: PaperTradingStartRequest, current_user: User = Depends(get_current_user)
) -> PaperAccountOut:
    raise NotImplementedYetError("Paper trading engine")


@router.post("/stop", status_code=status.HTTP_202_ACCEPTED)
async def stop_paper_trading(current_user: User = Depends(get_current_user)) -> None:
    raise NotImplementedYetError("Paper trading engine")


@router.get("/account", response_model=PaperAccountOut)
async def get_paper_account(current_user: User = Depends(get_current_user)) -> PaperAccountOut:
    raise NotImplementedYetError("Paper trading engine")


@router.get("/trades", response_model=list[PaperTradeOut])
async def list_paper_trades(current_user: User = Depends(get_current_user)) -> list[PaperTradeOut]:
    raise NotImplementedYetError("Paper trading engine")
