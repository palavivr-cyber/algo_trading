"""Sentiment abstraction: a pluggable provider behind a stable service facade,
so swapping the underlying model (e.g. a pretrained FinBERT model in Phase 9)
never touches callers. No model is trained or invoked yet — see
app.sentiment.providers for the placeholder that Phase 9 fills in.
"""
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime
from typing import Literal


@dataclass
class SentimentResult:
    symbol: str
    score: float  # -1 (very negative) .. 1 (very positive)
    label: Literal["positive", "negative", "neutral"]
    confidence: float  # 0..1
    as_of: datetime


class SentimentProvider(ABC):
    @abstractmethod
    async def get_sentiment(self, symbol: str) -> SentimentResult: ...


class SentimentService:
    """Thin facade the rest of the app depends on instead of a concrete
    provider — swap `provider` to change the sentiment source without
    touching any caller."""

    def __init__(self, provider: SentimentProvider):
        self._provider = provider

    async def get_sentiment(self, symbol: str) -> SentimentResult:
        return await self._provider.get_sentiment(symbol)
