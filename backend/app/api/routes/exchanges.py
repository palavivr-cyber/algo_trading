"""Exchange connection endpoints. Real implementation (CCXT credential
validation) lands in Phase 5. Credentials are always encrypted at rest (see
app.core.security.encrypt_secret) and never echoed back in a response."""
from fastapi import APIRouter, Depends, status

from app.api.dependencies import get_current_user
from app.core.exceptions import NotImplementedYetError
from app.database.models.user import User
from app.schemas.trading import ExchangeConnectionOut, ExchangeConnectRequest

router = APIRouter(prefix="/exchanges", tags=["exchanges"])


@router.post("/connect", response_model=ExchangeConnectionOut, status_code=status.HTTP_201_CREATED)
async def connect_exchange(
    payload: ExchangeConnectRequest, current_user: User = Depends(get_current_user)
) -> ExchangeConnectionOut:
    raise NotImplementedYetError("Exchange connectivity (CCXT integration)")
