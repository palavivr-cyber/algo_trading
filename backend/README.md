# AlgoFlow Backend

FastAPI backend for **AlgoFlow — No-Code AI-Powered Algorithmic Trading Platform**. The existing React frontend (repo root) is untouched; this is a sibling `backend/` service that integrates with it over a REST + WebSocket API.

The heart of the system is this pipeline:

```
React Flow visual strategy
        │
        ▼
   Strategy JSON            (app/schemas/strategy.py)
        │
        ▼
  Strategy Validator         (app/strategy_engine/parser.py, validator.py)
        │
        ▼
Strategy Execution Engine    (app/strategy_engine/executor.py — Phase 4)
        │
        ▼
     Market Data             (app/market_data, app/exchanges — Phase 5)
        │
        ▼
Backtesting / Paper Trading / Live Trading   (Phases 6, 7, 10)
```

Strategies are **never** converted into generated Python and never `eval()`/`exec()`'d. A validated graph compiles into a safe internal representation (an `NodeDefinition` registry + a small execution IR) that the backend evaluates directly.

## Current status: Increment 1 (spec Phases 1–3)

This increment ships the project scaffold, auth, and the strategy schema/validation architecture — explicitly *not* the full 10-phase system in one pass. Endpoints outside this scope return **HTTP 501** with the standard error envelope so the full API contract is documented and stable in Swagger today, even before each phase lands.

| Phase | Area | Status |
|---|---|---|
| 1 | Scaffold, Postgres, Redis, Docker, config | ✅ Done |
| 2 | Auth, users, DB models | ✅ Done |
| 3 | Strategy schema, validation, React Flow integration | ✅ Done |
| 4 | Node evaluation engine, indicators, conditions, logic, actions | ⏳ Stubbed (`NotImplementedError`) |
| 5 | CCXT market data | ⏳ Stubbed (routes return 501) |
| 6 | VectorBT / Backtrader backtesting | ⏳ Stubbed (routes return 501) |
| 7 | Paper trading engine | ⏳ Stubbed (routes return 501) |
| 8 | WebSockets + Redis real-time events | ⏳ Stubbed |
| 9 | Sentiment service (e.g. FinBERT) | ⏳ Stubbed (routes return 501) |
| 10 | Live trading | ⏳ Reserved, disabled by `ENABLE_LIVE_TRADING=false` |

All ten database models (`User`, `Strategy`, `StrategyVersion`, `ExchangeConnection`, `PaperAccount`, `Order`, `Trade`, `Position`, `Portfolio`, `Backtest`, `BacktestResult`) exist now with a committed initial Alembic migration, so later phases only ever *add* migrations — no destructive schema changes.

## Project layout

```
backend/
├── app/
│   ├── main.py                # FastAPI app factory, CORS, exception handlers, lifespan
│   ├── api/                   # routes/ + dependencies.py + router.py
│   ├── core/                  # config, security (JWT/bcrypt/Fernet), logging, exceptions
│   ├── database/               # SQLAlchemy engine/session, models/, repositories/
│   ├── schemas/                # Pydantic request/response contracts
│   ├── strategy_engine/        # parser, validator, node registry (THE core engine)
│   ├── exchanges/               # ExchangeInterface abstraction (Phase 5 fills in CCXT)
│   ├── sentiment/                # SentimentService abstraction (Phase 9 fills in a provider)
│   ├── market_data/, backtesting/, paper_trading/   # Phase 5–7 placeholders
│   ├── redis/                   # client, cache, rate limiting (pubsub is Phase 8)
│   └── websocket/                # connection manager (Phase 8)
├── tests/                       # pytest — strategy_engine tests run with zero DB/FastAPI
├── alembic/                      # migrations (async template)
├── docker-compose.yml, Dockerfile, docker/entrypoint.sh
└── requirements.txt, .env.example
```

## Running locally

### With Docker (recommended)

```bash
cd backend
cp .env.example .env        # fill in JWT_SECRET / ENCRYPTION_KEY (see comments in the file)
docker compose up --build
```

This starts Postgres, Redis, and the API (the entrypoint runs `alembic upgrade head` before `uvicorn`). Verify with:

```bash
curl http://localhost:8000/health
# {"success": true, "database": true, "redis": true}
```

Swagger UI: `http://localhost:8000/docs`.

### Without Docker

Requires Python 3.12+, a running Postgres, and a running Redis.

```bash
cd backend
python -m venv .venv && source .venv/bin/activate   # or .venv\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.example .env   # point DATABASE_URL / REDIS_URL at your local services
alembic upgrade head
uvicorn app.main:app --reload
```

### Tests

```bash
cd backend
pip install -r requirements.txt
pytest
```

No Docker, Postgres, or Redis required — tests substitute an in-memory SQLite database (via `aiosqlite`) and an in-memory fake Redis (`fakeredis`). `tests/test_strategy_engine/` exercises the parser/validator/node-registry as plain Python with no FastAPI or DB involved at all.

## API contract

All endpoints are under `/api` except `/health`. Errors always look like:

```json
{"success": false, "error": {"code": "INVALID_STRATEGY", "message": "..."}}
```

No endpoint ever leaks a stack trace — unhandled exceptions are logged server-side and returned as a generic `INTERNAL_SERVER_ERROR`.

### Auth

```
POST /api/auth/register   {"email": "...", "password": "...", "full_name": "..."}
POST /api/auth/login      {"email": "...", "password": "..."}
GET  /api/users/me        (Authorization: Bearer <token>)
```

Both `register` and `login` return:

```json
{
  "access_token": "eyJhbGciOi...",
  "token_type": "bearer",
  "user": {"id": "...", "email": "...", "full_name": null, "is_active": true, "created_at": "..."}
}
```

`register`/`login` are rate-limited per client IP (Redis fixed window, defaults: 10 attempts / 60s, configurable via `.env`).

### Strategies — the core of the platform

```
POST   /api/strategies                    create (creates version 1)
GET    /api/strategies                    list current user's strategies
GET    /api/strategies/{id}               full detail, all versions
PUT    /api/strategies/{id}                edit (creates a new StrategyVersion — old ones are never touched)
DELETE /api/strategies/{id}
POST   /api/strategies/{id}/validate       validate the current saved version, or an unsaved draft
```

Request body for create/update — this mirrors the frontend's React Flow graph shape exactly (`src/store/useStrategyStore.ts`):

```json
{
  "name": "RSI Oversold Strategy",
  "description": "Buy when RSI < 30",
  "graph": {
    "nodes": [
      {"id": "rsi-1", "type": "rsi", "position": {"x": 100, "y": 150},
       "data": {"label": "RSI", "nodeType": "rsi", "params": {"period": 14, "oversold": 30, "overbought": 70}}},
      {"id": "condition-1", "type": "condition", "position": {"x": 350, "y": 150},
       "data": {"label": "Condition", "nodeType": "condition", "params": {"operator": "<", "value": 30}}},
      {"id": "buy-1", "type": "buy", "position": {"x": 600, "y": 100},
       "data": {"label": "Buy", "nodeType": "buy", "params": {"amount": 0.1, "type": "market"}}}
    ],
    "edges": [
      {"id": "e1", "source": "rsi-1", "target": "condition-1"},
      {"id": "e2", "source": "condition-1", "target": "buy-1"}
    ]
  }
}
```

`POST /api/strategies/{id}/validate` (body optional — omit it to validate the saved current version, or pass `{"graph": {...}}` to validate an unsaved draft while editing):

```json
{
  "valid": false,
  "errors": [
    {"node_id": "buy-1", "code": "MISSING_INPUT", "message": "'Buy' requires at least 1 input(s) but has 0", "severity": "error"}
  ],
  "warnings": [
    {"node_id": "stopLoss-1", "code": "RISK_NODE_NO_CONDITION_UPSTREAM", "message": "'Stop Loss' is not gated by a condition/logic node upstream", "severity": "warning"}
  ]
}
```

Validation checks: unknown node types, per-node parameter validation, input arity (including operator-dependent arity for `crosses_above`/`crosses_below`), cycle detection, dangling edges, duplicate node ids, self-loops, and reachability (at least one BUY/SELL/HOLD action must be reachable from a data/indicator/sentiment source). A few checks the frontend UI can legally produce are reported as **warnings** rather than errors so they never block saving — see `app/strategy_engine/validator.py` for the full rule set.

### Supported node types (Phase 3: structure + validation; Phase 4 fills in evaluation)

| Category | Node types |
|---|---|
| Data | `price`, `volume` |
| Indicator | `rsi`, `sma`, `ema`, `macd`, `movingAverage` (SMA/EMA via `params.type`), `bollinger_bands` |
| Condition | `condition` — operators `<`, `>`, `<=`, `>=`, `==`, `!=`, `crosses_above`, `crosses_below` |
| Logic | `and`, `or`, `not` |
| Sentiment | `sentiment` |
| Action | `buy`, `sell`, `hold` |
| Risk | `stopLoss`, `takeProfit` |

Adding a new node type is one `NodeDefinition` subclass + one line in `app/strategy_engine/nodes/registry.py` — nothing else changes.

### Everything else (currently 501)

`market`, `backtest`, `paper-trading`, `exchanges`, `portfolio`, `sentiment` routes are registered with final request/response schemas (visible in `/docs`) but return:

```json
{"success": false, "error": {"code": "NOT_IMPLEMENTED", "message": "... is not implemented yet — planned for a later development phase."}}
```

### WebSocket events (planned, Phase 8)

Not implemented yet — reserved names for when `app/websocket/manager.py` is built out: `price_update`, `candle_update`, `strategy_signal`, `paper_order`, `portfolio_update`, `pnl_update`, `sentiment_update`, `bot_status`. Planned flow: `Exchange/Market Data → Redis pub/sub → WebSocketManager → React frontend`.

## Security notes

- Passwords: bcrypt, never stored or logged in plain text.
- JWT: PyJWT, `HS256`, configurable expiry.
- Exchange API credentials: encrypted at rest with Fernet (`app.core.security.encrypt_secret`); never returned by any API response.
- Authorization: every strategy/account lookup is scoped to the authenticated user; another user's resource returns `404` (not `403`), so existence isn't leaked.
- No `eval()`/`exec()`/dynamic code generation anywhere in the strategy pipeline.
- `ENABLE_LIVE_TRADING` defaults to `false` and nothing currently reads it as "go" — live execution is Phase 10 and will require this flag plus explicit per-request confirmation.

## Team workflow

Modules are independently owned: `strategy_engine/`, `market_data/`, `paper_trading/`, `sentiment/`, `exchanges/` don't import each other's internals — only the stable interfaces (`ExchangeInterface`, `SentimentService`, the node registry). Suggested branches: `feature/strategy-engine`, `feature/market-data`, `feature/paper-trading`, `feature/sentiment`, matching those module boundaries.
