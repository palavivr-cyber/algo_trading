import { motion } from 'framer-motion'
import { Award, BarChart3, Percent, TrendingDown } from 'lucide-react'
import { StatCard } from '@/components/common/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DistributionPie,
  DrawdownChart,
  EquityChart,
  MonthlyReturnsChart,
} from '@/components/charts/RechartsComponents'
import {
  drawdownData,
  equityCurveData,
  monthlyReturns,
  portfolioStats,
  tradeDistribution,
} from '@/data/mockData'

export function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Portfolio Analytics</h2>
        <p className="text-sm text-muted-foreground">
          Institutional-grade performance metrics and risk analysis
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Win Rate"
          value={`${portfolioStats.winRate}%`}
          change="Above benchmark"
          changeType="positive"
          icon={<Percent className="h-5 w-5" />}
        />
        <StatCard
          title="Sharpe Ratio"
          value={String(portfolioStats.sharpeRatio)}
          change="Risk-adjusted return"
          changeType="positive"
          icon={<Award className="h-5 w-5" />}
          delay={0.1}
        />
        <StatCard
          title="Max Drawdown"
          value={`${portfolioStats.maxDrawdown}%`}
          change="Within tolerance"
          changeType="neutral"
          icon={<TrendingDown className="h-5 w-5" />}
          delay={0.2}
        />
        <StatCard
          title="Total Return"
          value="+42.4%"
          change="Last 12 months"
          changeType="positive"
          icon={<BarChart3 className="h-5 w-5" />}
          delay={0.3}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Equity Curve</CardTitle>
        </CardHeader>
        <CardContent>
          <EquityChart data={equityCurveData} className="min-h-[300px]" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Drawdown Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <DrawdownChart data={drawdownData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyReturnsChart data={monthlyReturns} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Trade Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <DistributionPie data={tradeDistribution} />
            <div className="flex justify-center gap-6 mt-4">
              {tradeDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>{item.name}: {item.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Risk Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { label: 'Sortino Ratio', value: '2.14', desc: 'Downside risk-adjusted return' },
                { label: 'Calmar Ratio', value: '5.12', desc: 'Return vs max drawdown' },
                { label: 'Profit Factor', value: '1.87', desc: 'Gross profit / gross loss' },
                { label: 'Avg Trade Duration', value: '4.2 hrs', desc: 'Mean holding period' },
                { label: 'Best Trade', value: '+$2,840', desc: 'BTC/USDT long · Mar 15' },
                { label: 'Worst Trade', value: '-$620', desc: 'ETH/USDT short · Apr 3' },
              ].map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-3 border-b border-border last:border-0"
                >
                  <div>
                    <p className="text-sm font-medium">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.desc}</p>
                  </div>
                  <span className="text-sm font-mono font-semibold text-primary">{metric.value}</span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
