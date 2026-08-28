# AlgoFlow

**No-Code AI-Powered Algorithmic Trading Platform** — a production-quality frontend UI for visually building, testing, and deploying trading strategies.

![AlgoFlow](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)

## Overview

AlgoFlow is a fintech SaaS platform where users create algorithmic trading strategies using drag-and-drop visual blocks — no coding required. This repository contains the **frontend UI only** (no backend, auth logic, or live trading APIs).

### Design Inspiration

TradingView · QuantConnect · Notion · Figma

## Features

- **Landing Page** — Hero, features, workflow demo, glassmorphism aesthetic
- **Authentication UI** — Login, signup, forgot password with social login buttons
- **Dashboard** — Portfolio stats, market overview, active bots, trade history, charts
- **Strategy Builder** — React Flow drag-and-drop node editor (RSI, MACD, Buy/Sell, etc.)
- **Paper Trading** — Virtual wallet, open positions, P/L tracking, trade feed
- **Sentiment Analysis** — AI confidence score, news cards, social feed simulation
- **Live Trading** — Exchange connections, API key forms, bot status, live feed
- **Portfolio Analytics** — Equity curve, drawdown, Sharpe ratio, win rate charts
- **Settings** — Profile, notifications, security, billing tabs

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + Vite 8 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| UI Components | shadcn/ui (Radix primitives) |
| Strategy Builder | React Flow (@xyflow/react) |
| Charts | Recharts + TradingView Lightweight Charts |
| Animation | Framer Motion |
| State | Zustand |
| Routing | React Router 7 |
| Icons | Lucide React |

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
git clone <repo-url>
cd algoflow
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn-style primitives (Button, Card, Table…)
│   ├── layout/          # Sidebar, TopNavbar
│   ├── charts/          # Recharts + Lightweight Charts wrappers
│   └── common/          # StatCard, EmptyState, LoadingSkeleton
├── pages/               # Route-level page components
│   └── auth/            # Login, Signup, Forgot Password
├── layouts/             # MainLayout (dashboard shell), AuthLayout
├── features/
│   └── strategy-builder/  # React Flow canvas, nodes, palette
├── store/               # Zustand stores (app, strategy)
├── routes/              # React Router configuration
├── data/                # Mock trading data
├── utils/               # cn(), formatters
└── styles/              # Global CSS + Tailwind theme
```

## Routes

| Path | Page |
|------|------|
| `/` | Landing |
| `/login` | Login |
| `/signup` | Signup |
| `/forgot-password` | Forgot Password |
| `/dashboard` | Dashboard |
| `/strategy-builder` | Strategy Builder |
| `/paper-trading` | Paper Trading |
| `/live-trading` | Live Trading |
| `/sentiment` | Sentiment Analysis |
| `/portfolio` | Portfolio Analytics |
| `/settings` | Settings |

## Strategy Builder Nodes

| Node | Purpose |
|------|---------|
| RSI | Relative Strength Index indicator |
| MACD | Moving Average Convergence Divergence |
| Moving Average | SMA/EMA trend indicator |
| Sentiment | AI sentiment signal |
| Condition | If/then logic gate |
| Buy Action | Execute buy order |
| Sell Action | Execute sell order |
| Stop Loss | Risk management exit |
| Take Profit | Profit target exit |

Drag nodes from the left palette onto the canvas, connect them, and save your strategy.

## Theme

Dark-only fintech theme with:

- **Backgrounds:** `#06080f` → `#0c1019`
- **Accents:** Cyan (`#22d3ee`), Blue, Purple, Emerald
- **Effects:** Glassmorphism, neon glows, gradient text
- **Typography:** Inter (UI) + JetBrains Mono (data)

## What's Not Included

- Backend API / database
- Real authentication (forms are UI-only)
- Exchange API integrations
- Live market data feeds
- Strategy backtesting engine

## License

MIT
