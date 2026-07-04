import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { cn } from '@/utils/cn'

const tooltipStyle = {
  contentStyle: {
    backgroundColor: 'rgba(12, 16, 25, 0.95)',
    border: '1px solid rgba(148, 163, 184, 0.12)',
    borderRadius: '8px',
    fontSize: '12px',
  },
  labelStyle: { color: '#e8edf5' },
}

interface EquityChartProps {
  data: { date: string; value: number }[]
  className?: string
}

export function EquityChart({ data, className }: EquityChartProps) {
  return (
    <div className={cn('w-full h-full min-h-[240px]', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="date" tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
          <Tooltip {...tooltipStyle} />
          <Area type="monotone" dataKey="value" stroke="#22d3ee" fill="url(#equityGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function DrawdownChart({ data, className }: { data: { date: string; drawdown: number }[]; className?: string }) {
  return (
    <div className={cn('w-full h-full min-h-[200px]', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="ddGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
              <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
          <XAxis dataKey="date" tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
          <Tooltip {...tooltipStyle} />
          <Area type="monotone" dataKey="drawdown" stroke="#ef4444" fill="url(#ddGrad)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export function MiniLineChart({ data, color = '#22d3ee' }: { data: { date: string; value: number }[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height={60}>
      <LineChart data={data.slice(-14)}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function DistributionPie({ data }: { data: { name: string; value: number; color: string }[] }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function MonthlyReturnsChart({ data }: { data: { month: string; return: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
        <XAxis dataKey="month" tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip {...tooltipStyle} />
        <Bar dataKey="return" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.return >= 0 ? '#10b981' : '#ef4444'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function DualAssetChart({ data }: { data: { date: string; btc: number; eth: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data.slice(-30)}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.08)" />
        <XAxis dataKey="date" tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} />
        <YAxis yAxisId="btc" tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} width={60} />
        <YAxis yAxisId="eth" orientation="right" tick={{ fill: '#7b8ba3', fontSize: 11 }} axisLine={false} tickLine={false} width={50} />
        <Tooltip {...tooltipStyle} />
        <Line yAxisId="btc" type="monotone" dataKey="btc" stroke="#f59e0b" strokeWidth={2} dot={false} name="BTC" />
        <Line yAxisId="eth" type="monotone" dataKey="eth" stroke="#6366f1" strokeWidth={2} dot={false} name="ETH" />
      </LineChart>
    </ResponsiveContainer>
  )
}
