import { Handle, Position, type Node, type NodeProps } from '@xyflow/react'
import {
  Activity,
  ArrowDownCircle,
  ArrowUpCircle,
  Brain,
  GitBranch,
  ShieldAlert,
  Target,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/utils/cn'
import type { StrategyNodeData } from '@/store/useStrategyStore'

const nodeStyles: Record<string, { icon: React.ElementType; color: string; bg: string }> = {
  rsi: { icon: Activity, color: 'text-cyan-400', bg: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30' },
  macd: { icon: TrendingUp, color: 'text-blue-400', bg: 'from-blue-500/20 to-blue-500/5 border-blue-500/30' },
  movingAverage: { icon: TrendingUp, color: 'text-indigo-400', bg: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/30' },
  buy: { icon: ArrowUpCircle, color: 'text-emerald-400', bg: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30' },
  sell: { icon: ArrowDownCircle, color: 'text-red-400', bg: 'from-red-500/20 to-red-500/5 border-red-500/30' },
  sentiment: { icon: Brain, color: 'text-purple-400', bg: 'from-purple-500/20 to-purple-500/5 border-purple-500/30' },
  condition: { icon: GitBranch, color: 'text-amber-400', bg: 'from-amber-500/20 to-amber-500/5 border-amber-500/30' },
  stopLoss: { icon: ShieldAlert, color: 'text-orange-400', bg: 'from-orange-500/20 to-orange-500/5 border-orange-500/30' },
  takeProfit: { icon: Target, color: 'text-teal-400', bg: 'from-teal-500/20 to-teal-500/5 border-teal-500/30' },
}

function BaseNode({ data, selected }: NodeProps<Node<StrategyNodeData>>) {
  const style = nodeStyles[data.nodeType] ?? nodeStyles.rsi
  const Icon = style.icon
  const isAction = data.nodeType === 'buy' || data.nodeType === 'sell'

  return (
    <div
      className={cn(
        'min-w-[180px] rounded-xl border bg-gradient-to-br backdrop-blur-sm transition-shadow',
        style.bg,
        selected && 'ring-2 ring-primary shadow-[0_0_20px_rgba(34,211,238,0.2)]'
      )}
    >
      {!isAction && (
        <Handle type="target" position={Position.Left} className="!bg-primary !border-primary !w-3 !h-3" />
      )}

      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <Icon className={cn('h-4 w-4', style.color)} />
          <span className="text-sm font-semibold">{data.label}</span>
        </div>
        <div className="space-y-1">
          {Object.entries(data.params).map(([key, value]) => (
            <div key={key} className="flex justify-between text-[11px]">
              <span className="text-muted-foreground capitalize">{key}</span>
              <span className="font-mono text-foreground">{String(value)}</span>
            </div>
          ))}
        </div>
      </div>

      <Handle type="source" position={Position.Right} className="!bg-primary !border-primary !w-3 !h-3" />
    </div>
  )
}

export const RsiNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />
export const MacdNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />
export const MovingAverageNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />
export const BuyNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />
export const SellNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />
export const SentimentNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />
export const ConditionNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />
export const StopLossNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />
export const TakeProfitNode = (props: NodeProps<Node<StrategyNodeData>>) => <BaseNode {...props} />

export const nodeTypes = {
  rsi: RsiNode,
  macd: MacdNode,
  movingAverage: MovingAverageNode,
  buy: BuyNode,
  sell: SellNode,
  sentiment: SentimentNode,
  condition: ConditionNode,
  stopLoss: StopLossNode,
  takeProfit: TakeProfitNode,
}

export const paletteItems = [
  { type: 'rsi', label: 'RSI', params: { period: 14, oversold: 30, overbought: 70 } },
  { type: 'macd', label: 'MACD', params: { fast: 12, slow: 26, signal: 9 } },
  { type: 'movingAverage', label: 'Moving Average', params: { period: 50, type: 'SMA' } },
  { type: 'sentiment', label: 'Sentiment', params: { threshold: 70, source: 'AI' } },
  { type: 'condition', label: 'Condition', params: { operator: '>', value: 0 } },
  { type: 'buy', label: 'Buy Action', params: { amount: 0.1, type: 'market' } },
  { type: 'sell', label: 'Sell Action', params: { amount: 0.1, type: 'market' } },
  { type: 'stopLoss', label: 'Stop Loss', params: { percent: 2 } },
  { type: 'takeProfit', label: 'Take Profit', params: { percent: 5 } },
] as const
