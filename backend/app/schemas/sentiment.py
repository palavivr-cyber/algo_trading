"""Response contract for the sentiment endpoint. Real provider integration
(e.g. FinBERT) lands in Phase 9 — the route currently returns 501."""
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class SentimentOut(BaseModel):
    symbol: str
    score: float = Field(ge=-1, le=1, description="-1 (very negative) to 1 (very positive)")
    label: Literal["positive", "negative", "neutral"]
    confidence: float = Field(ge=0, le=1)
    as_of: datetime
