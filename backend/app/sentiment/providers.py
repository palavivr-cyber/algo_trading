"""Concrete SentimentProvider implementations. Implemented in Phase 9 (e.g. a
pretrained FinBERT model, or a news/social aggregation API) — see the
interface in app.sentiment.service.SentimentProvider and the roadmap in
backend/README.md.
"""
from app.sentiment.service import SentimentProvider, SentimentResult


class FinBERTSentimentProvider(SentimentProvider):
    async def get_sentiment(self, symbol: str) -> SentimentResult:
        raise NotImplementedError("Implemented in Phase 9")
