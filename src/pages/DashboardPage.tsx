import { motion } from 'framer-motion'
import { Bot, DollarSign, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import { useState, useEffect } from 'react'
import { StatCard } from '@/components/common/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { DualAssetChart } from '@/components/charts/RechartsComponents'
import { DashboardSkeleton } from '@/components/common/LoadingSkeleton'
import {
  activeBots,
  equityCurveData,
  marketAssets,
  portfolioStats,
  recentTrades,
} from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/utils/formatters'
import { cn } from '@/utils/cn'

export function DashboardPage() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <DashboardSkeleton />

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Portfolio Value"
          value={formatCurrency(portfolioStats.totalValue)}
          change={formatPercent(portfolioStats.dailyPnlPercent)}
          changeType="positive"
          icon={<Wallet className="h-5 w-5" />}
          delay={0}
        />
        <StatCard
          title="Daily P&L"
          value={formatCurrency(portfolioStats.dailyPnl)}
          change={formatPercent(portfolioStats.dailyPnlPercent)}
          changeType="positive"
          icon={<DollarSign className="h-5 w-5" />}
          delay={0.1}
        />
        <StatCard
          title="Weekly P&L"
          value={formatCurrency(portfolioStats.weeklyPnl)}
          change={formatPercent(portfolioStats.weeklyPnlPercent)}
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5" />}
          delay={0.2}
        />
        <StatCard
          title="Active Bots"
          value={String(portfolioStats.activeBots)}
          change="2 running, 1 paused"
          changeType="neutral"
          icon={<Bot className="h-5 w-5" />}
          delay={0.3}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">BTC / ETH Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <DualAssetChart data={equityCurveData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Market Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {marketAssets.slice(0, 5).map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{asset.symbol}</p>
                  <p className="text-xs text-muted-foreground">{asset.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-mono">{formatCurrency(asset.price)}</p>
                  <p className={cn('text-xs font-medium', asset.change24h >= 0 ? 'text-success' : 'text-destructive')}>
                    {formatPercent(asset.change24h)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Active Bots</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activeBots.map((bot) => (
              <div key={bot.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{bot.name}</p>
                    <p className="text-xs text-muted-foreground">{bot.strategy}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={bot.status === 'running' ? 'success' : bot.status === 'paused' ? 'warning' : 'secondary'}>
                    {bot.status}
                  </Badge>
                  <p className={cn('text-sm font-mono mt-1', bot.pnl >= 0 ? 'text-success' : 'text-destructive')}>
                    {bot.pnl >= 0 ? '+' : ''}{formatCurrency(bot.pnl)}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pair</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">P&L</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTrades.map((trade) => (
                  <TableRow key={trade.id}>
                    <TableCell className="font-medium">{trade.pair}</TableCell>
                    <TableCell>
                      <Badge variant={trade.type === 'buy' ? 'success' : 'destructive'} className="text-[10px]">
                        {trade.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className={cn('text-right font-mono', trade.pnl >= 0 ? 'text-success' : 'text-destructive')}>
                      {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground text-xs">{trade.time}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Equity Curve</CardTitle>
          <div className="flex items-center gap-1 text-sm text-destructive">
            <TrendingDown className="h-4 w-4" />
            Max DD: {portfolioStats.maxDrawdown}%
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <DualAssetChart data={equityCurveData} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
