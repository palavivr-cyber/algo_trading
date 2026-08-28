"""Shared response envelope shapes. Mirrors the dict shape built by
app.core.exceptions so the documented schema and the actual error responses
never drift apart."""
from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class ErrorDetail(BaseModel):
    code: str
    message: str


class ErrorResponse(BaseModel):
    success: bool = False
    error: ErrorDetail


class DataResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T
