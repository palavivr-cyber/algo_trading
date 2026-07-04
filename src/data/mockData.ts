export interface Trade {
  id: string
  pair: string
  type: 'buy' | 'sell'
  amount: number
  price: number
  pnl: number
  time: string
  status: 'filled' | 'pending' | 'cancelled'
}

export interface Position {
  id: string
  pair: string
  side: 'long' | 'short'
  size: number
  entryPrice: number
  currentPrice: number
  pnl: number
  pnlPercent: number
}

export interface Bot {
  id: string
  name: string
  strategy: string
  status: 'running' | 'paused' | 'stopped'
  pnl: number
  pnlPercent: number
  trades: number
}

export interface MarketAsset {
  symbol: string
  name: string
  price: number
  change24h: number
  volume: string
}

export interface NewsItem {
  id: string
  title: string
  source: string
  sentiment: 'positive' | 'negative' | 'neutral'
  time: string
  summary: string
}

export interface SocialPost {
  id: string
  author: string
  handle: string
  content: string
  sentiment: 'positive' | 'negative' | 'neutral'
  likes: number
  time: string
}

export interface ExchangeConnection {
  id: string
  name: string
  logo: string
  connected: boolean
  status: 'active' | 'inactive' | 'error'
}

export const portfolioStats = {
  totalValue: 284_752.43,
  dailyPnl: 3_842.18,
  dailyPnlPercent: 1.37,
  weeklyPnl: 12_450.0,
  weeklyPnlPercent: 4.58,
  activeBots: 4,
  winRate: 68.4,
  sharpeRatio: 1.82,
  maxDrawdown: -8.3,
}

export const marketAssets: MarketAsset[] = [
  { symbol: 'BTC/USDT', name: 'Bitcoin', price: 67_842.5, change24h: 2.34, volume: '28.4B' },
  { symbol: 'ETH/USDT', name: 'Ethereum', price: 3_521.8, change24h: -0.87, volume: '12.1B' },
  { symbol: 'SOL/USDT', name: 'Solana', price: 178.42, change24h: 5.12, volume: '3.2B' },
  { symbol: 'AVAX/USDT', name: 'Avalanche', price: 42.18, change24h: 1.45, volume: '890M' },
  { symbol: 'LINK/USDT', name: 'Chainlink', price: 18.92, change24h: -1.23, volume: '420M' },
]

export const activeBots: Bot[] = [
  { id: '1', name: 'RSI Momentum', strategy: 'RSI + MACD Crossover', status: 'running', pnl: 8420.5, pnlPercent: 12.4, trades: 156 },
  { id: '2', name: 'Golden Cross', strategy: 'MA 50/200 Cross', status: 'running', pnl: 5230.0, pnlPercent: 8.2, trades: 42 },
  { id: '3', name: 'Sentiment Alpha', strategy: 'AI Sentiment + RSI', status: 'paused', pnl: -420.0, pnlPercent: -1.8, trades: 89 },
  { id: '4', name: 'Breakout Hunter', strategy: 'Volume Breakout', status: 'running', pnl: 3150.75, pnlPercent: 6.1, trades: 203 },
]

export const recentTrades: Trade[] = [
  { id: '1', pair: 'BTC/USDT', type: 'buy', amount: 0.15, price: 67842.5, pnl: 245.3, time: '2 min ago', status: 'filled' },
  { id: '2', pair: 'ETH/USDT', type: 'sell', amount: 2.5, price: 3521.8, pnl: -42.1, time: '15 min ago', status: 'filled' },
  { id: '3', pair: 'SOL/USDT', type: 'buy', amount: 45, price: 178.42, pnl: 128.5, time: '32 min ago', status: 'filled' },
  { id: '4', pair: 'BTC/USDT', type: 'sell', amount: 0.08, price: 67950.0, pnl: 86.4, time: '1 hr ago', status: 'filled' },
  { id: '5', pair: 'LINK/USDT', type: 'buy', amount: 120, price: 18.92, pnl: 0, time: '2 hr ago', status: 'pending' },
]

export const openPositions: Position[] = [
  { id: '1', pair: 'BTC/USDT', side: 'long', size: 0.25, entryPrice: 67200, currentPrice: 67842.5, pnl: 160.63, pnlPercent: 0.96 },
  { id: '2', pair: 'ETH/USDT', side: 'long', size: 5.0, entryPrice: 3480, currentPrice: 3521.8, pnl: 209.0, pnlPercent: 1.2 },
  { id: '3', pair: 'SOL/USDT', side: 'short', size: 100, entryPrice: 182.5, currentPrice: 178.42, pnl: 408.0, pnlPercent: 2.24 },
]

export const paperWallet = {
  balance: 100_000,
  equity: 112_450.75,
  available: 87_320.5,
  marginUsed: 25_130.25,
  totalPnl: 12_450.75,
  totalPnlPercent: 12.45,
}

export const sentimentData = {
  overall: 72,
  positive: 58,
  negative: 18,
  neutral: 24,
  aiConfidence: 87,
  trend: 'bullish' as const,
}

export const newsItems: NewsItem[] = [
  { id: '1', title: 'Bitcoin ETF inflows hit record $2.1B this week', source: 'CoinDesk', sentiment: 'positive', time: '12 min ago', summary: 'Institutional demand continues to surge as spot ETF products attract unprecedented capital.' },
  { id: '2', title: 'Fed signals potential rate cut in Q3 2026', source: 'Reuters', sentiment: 'positive', time: '45 min ago', summary: 'Markets rally on dovish commentary from Federal Reserve officials.' },
  { id: '3', title: 'Major exchange reports temporary API outage', source: 'The Block', sentiment: 'negative', time: '1 hr ago', summary: 'Trading services restored after 23-minute disruption affecting derivatives markets.' },
  { id: '4', title: 'Ethereum L2 volumes surpass mainnet for first time', source: 'Decrypt', sentiment: 'positive', time: '2 hr ago', summary: 'Layer 2 scaling solutions process over 15M transactions daily.' },
  { id: '5', title: 'SEC delays decision on altcoin ETF applications', source: 'Bloomberg', sentiment: 'neutral', time: '3 hr ago', summary: 'Regulatory review extended by 45 days for multiple pending applications.' },
]

export const socialPosts: SocialPost[] = [
  { id: '1', author: 'CryptoWhale', handle: '@cryptowhale', content: 'BTC breaking out of consolidation. $70K target looking very achievable this week. 🚀', sentiment: 'positive', likes: 2847, time: '8 min ago' },
  { id: '2', author: 'QuantTrader', handle: '@quanttrader', content: 'RSI divergence on ETH 4H chart. Caution advised for long positions near resistance.', sentiment: 'negative', likes: 892, time: '22 min ago' },
  { id: '3', author: 'DeFiDaily', handle: '@defidaily', content: 'Total DeFi TVL stable at $95B. No significant movements in the last 24 hours.', sentiment: 'neutral', likes: 456, time: '1 hr ago' },
  { id: '4', author: 'MacroMind', handle: '@macromind', content: 'DXY weakness + risk-on sentiment = crypto tailwind. Altcoin season incoming?', sentiment: 'positive', likes: 1523, time: '2 hr ago' },
]

export const exchangeConnections: ExchangeConnection[] = [
  { id: '1', name: 'Binance', logo: 'B', connected: true, status: 'active' },
  { id: '2', name: 'Coinbase', logo: 'C', connected: true, status: 'active' },
  { id: '3', name: 'Kraken', logo: 'K', connected: false, status: 'inactive' },
  { id: '4', name: 'Bybit', logo: 'By', connected: true, status: 'active' },
]

export function generateChartData(days = 30, startValue = 250000) {
  const data = []
  let value = startValue
  const now = new Date()

  for (let i = days; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    value += (Math.random() - 0.42) * 5000
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(value * 100) / 100,
      btc: 65000 + Math.random() * 5000,
      eth: 3200 + Math.random() * 400,
    })
  }
  return data
}

export function generateCandleData(count = 50) {
  const data = []
  let price = 67000
  const now = Date.now()

  for (let i = count; i >= 0; i--) {
    const open = price
    const change = (Math.random() - 0.48) * 800
    const close = open + change
    const high = Math.max(open, close) + Math.random() * 300
    const low = Math.min(open, close) - Math.random() * 300
    price = close

    data.push({
      time: new Date(now - i * 3600000).toISOString(),
      open,
      high,
      low,
      close,
    })
  }
  return data
}

export const equityCurveData = generateChartData(90, 200000)
export const paperPerformanceData = generateChartData(60, 100000)
export const drawdownData = equityCurveData.map((d, i) => ({
  date: d.date,
  drawdown: -(Math.random() * 8 + (i % 15 === 0 ? 5 : 0)),
}))

export const tradeDistribution = [
  { name: 'Winning', value: 68, color: '#10b981' },
  { name: 'Losing', value: 32, color: '#ef4444' },
]

export const monthlyReturns = [
  { month: 'Jan', return: 4.2 },
  { month: 'Feb', return: -1.8 },
  { month: 'Mar', return: 6.5 },
  { month: 'Apr', return: 2.1 },
  { month: 'May', return: 8.3 },
  { month: 'Jun', return: 3.7 },
]

export const liveTradeFeed = [
  { id: '1', bot: 'RSI Momentum', pair: 'BTC/USDT', action: 'BUY', price: 67842.5, time: 'Just now' },
  { id: '2', bot: 'Golden Cross', pair: 'ETH/USDT', action: 'SELL', price: 3521.8, time: '3 sec ago' },
  { id: '3', bot: 'Breakout Hunter', pair: 'SOL/USDT', action: 'BUY', price: 178.42, time: '12 sec ago' },
  { id: '4', bot: 'RSI Momentum', pair: 'AVAX/USDT', action: 'BUY', price: 42.18, time: '28 sec ago' },
  { id: '5', bot: 'Sentiment Alpha', pair: 'LINK/USDT', action: 'SELL', price: 18.92, time: '45 sec ago' },
]

export const paperTradeFeed = [
  { id: '1', pair: 'BTC/USDT', action: 'BUY', amount: 0.1, price: 67500, pnl: 34.25, time: '2 min ago' },
  { id: '2', pair: 'ETH/USDT', action: 'SELL', amount: 1.5, price: 3500, pnl: 32.7, time: '8 min ago' },
  { id: '3', pair: 'SOL/USDT', action: 'BUY', amount: 25, price: 176.5, pnl: 48.0, time: '15 min ago' },
  { id: '4', pair: 'BTC/USDT', action: 'SELL', amount: 0.05, price: 67800, pnl: 15.0, time: '22 min ago' },
]
