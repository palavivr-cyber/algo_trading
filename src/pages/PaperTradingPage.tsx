import { motion } from 'framer-motion'
import { Activity, ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react'
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
import { EquityChart } from '@/components/charts/RechartsComponents'
import { openPositions, paperPerformanceData, paperTradeFeed, paperWallet } from '@/data/mockData'
import { formatCurrency, formatPercent } from '@/utils/formatters'
import { cn } from '@/utils/cn'

export function PaperTradingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Paper Trading</h2>
        <p className="text-sm text-muted-foreground">
          Practice with virtual funds — no real money at risk
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Virtual Balance"
          value={formatCurrency(paperWallet.balance)}
          icon={<Wallet className="h-5 w-5" />}
        />
        <StatCard
          title="Total Equity"
          value={formatCurrency(paperWallet.equity)}
          change={formatPercent(paperWallet.totalPnlPercent)}
          changeType="positive"
          icon={<Activity className="h-5 w-5" />}
          delay={0.1}
        />
        <StatCard
          title="Available"
          value={formatCurrency(paperWallet.available)}
          change={`Margin: ${formatCurrency(paperWallet.marginUsed)}`}
          changeType="neutral"
          delay={0.2}
        />
        <StatCard
          title="Total P&L"
          value={formatCurrency(paperWallet.totalPnl)}
          change={formatPercent(paperWallet.totalPnlPercent)}
          changeType="positive"
          icon={<ArrowUpRight className="h-5 w-5" />}
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <EquityChart data={paperPerformanceData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Trade Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[320px] overflow-y-auto">
            {paperTradeFeed.map((trade, i) => (
              <motion.div
                key={trade.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center gap-2">
                  {trade.action === 'BUY' ? (
                    <ArrowUpRight className="h-4 w-4 text-success" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-destructive" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{trade.pair}</p>
                    <p className="text-xs text-muted-foreground">{trade.amount} @ {formatCurrency(trade.price)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn('text-sm font-mono', trade.pnl >= 0 ? 'text-success' : 'text-destructive')}>
                    {trade.pnl >= 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{trade.time}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Open Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pair</TableHead>
                <TableHead>Side</TableHead>
                <TableHead className="text-right">Size</TableHead>
                <TableHead className="text-right">Entry</TableHead>
                <TableHead className="text-right">Current</TableHead>
                <TableHead className="text-right">P&L</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {openPositions.map((pos) => (
                <TableRow key={pos.id}>
                  <TableCell className="font-medium">{pos.pair}</TableCell>
                  <TableCell>
                    <Badge variant={pos.side === 'long' ? 'success' : 'destructive'}>
                      {pos.side.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{pos.size}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(pos.entryPrice)}</TableCell>
                  <TableCell className="text-right font-mono">{formatCurrency(pos.currentPrice)}</TableCell>
                  <TableCell className={cn('text-right font-mono', pos.pnl >= 0 ? 'text-success' : 'text-destructive')}>
                    {formatCurrency(pos.pnl)} ({formatPercent(pos.pnlPercent)})
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
