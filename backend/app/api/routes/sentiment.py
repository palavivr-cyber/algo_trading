"""Sentiment endpoint. Real provider implementation lands in Phase 9 — see
app.sentiment.service.SentimentService for the pluggable abstraction."""
from fastapi import APIRouter, Depends

from app.api.dependencies import get_current_user
from app.core.exceptions import NotImplementedYetError
from app.database.models.user import User
from app.schemas.sentiment import SentimentOut

router = APIRouter(prefix="/sentiment", tags=["sentiment"])


@router.get("/{symbol}", response_model=SentimentOut)
async def get_sentiment(symbol: str, current_user: User = Depends(get_current_user)) -> SentimentOut:
    raise NotImplementedYetError("Sentiment analysis service")
