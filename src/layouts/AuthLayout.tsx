import { Bot } from 'lucide-react'
import { Link, Outlet } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold">AlgoFlow</span>
        </div>

        <div className="relative space-y-6">
          <h2 className="text-4xl font-bold leading-tight">
            Build trading strategies
            <br />
            <span className="gradient-text">without writing code</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Drag, drop, and deploy AI-powered algorithmic trading bots in minutes.
            Paper trade first, go live when you're ready.
          </p>
          <div className="flex gap-8 pt-4">
            {[
              { value: '10K+', label: 'Strategies Built' },
              { value: '$2.4B', label: 'Volume Traded' },
              { value: '99.9%', label: 'Uptime' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-primary">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative text-sm text-muted-foreground">
          © 2026 AlgoFlow. All rights reserved.
        </p>
      </div>

      <div className="flex flex-col items-center justify-center p-6 lg:p-12">
        <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold">AlgoFlow</span>
        </Link>
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
