import { motion } from 'framer-motion'
import {
  ArrowRight,
  BarChart3,
  Bot,
  Brain,
  GitBranch,
  Play,
  Shield,
  Sparkles,
  Workflow,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: Workflow,
    title: 'Visual Strategy Builder',
    description: 'Drag-and-drop nodes to create complex trading algorithms without writing a single line of code.',
  },
  {
    icon: Brain,
    title: 'AI Sentiment Analysis',
    description: 'Real-time news and social sentiment powered by machine learning models trained on market data.',
  },
  {
    icon: Shield,
    title: 'Paper Trading First',
    description: 'Test strategies with virtual funds before risking real capital. Full simulation environment.',
  },
  {
    icon: Zap,
    title: 'One-Click Live Deploy',
    description: 'Connect exchanges via API and deploy your proven strategies to live markets instantly.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Sharpe ratio, drawdown analysis, win rate, and equity curves — institutional-grade metrics.',
  },
  {
    icon: GitBranch,
    title: 'Conditional Logic',
    description: 'Build sophisticated if/then rules with RSI, MACD, moving averages, and custom conditions.',
  },
]

const workflowSteps = [
  { step: '01', title: 'Design', desc: 'Drag nodes onto canvas' },
  { step: '02', title: 'Configure', desc: 'Set parameters & conditions' },
  { step: '03', title: 'Backtest', desc: 'Run on historical data' },
  { step: '04', title: 'Deploy', desc: 'Go live with one click' },
]

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600">
              <Bot className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">AlgoFlow</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#workflow" className="hover:text-foreground transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="gradient" asChild>
              <Link to="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="default" className="mb-6">
              <Sparkles className="h-3 w-3 mr-1" />
              No-Code AI Trading Platform
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Build Algorithmic
              <br />
              <span className="gradient-text">Trading Strategies</span>
              <br />
              Visually
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Design, backtest, and deploy AI-powered trading bots with drag-and-drop blocks.
              No coding required. Professional-grade tools for everyone.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="gradient" size="lg" asChild>
                <Link to="/signup">
                  Start Building Free
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">
                  <Play className="h-5 w-5" />
                  View Demo
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="glass rounded-2xl p-1 glow-cyan">
              <div className="rounded-xl bg-card/80 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/60" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
                    <div className="h-3 w-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">Strategy Builder — RSI Momentum</span>
                </div>
                <div className="p-8 min-h-[300px] relative grid-pattern">
                  <div className="flex items-center justify-center gap-8 flex-wrap">
                    {['RSI (14)', 'Condition < 30', 'Buy 0.1 BTC', 'Stop Loss 2%'].map((node, i) => (
                      <motion.div
                        key={node}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.15 }}
                        className="glass rounded-xl px-5 py-3 text-sm font-medium border border-primary/20"
                      >
                        {node}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need to <span className="gradient-text">trade smarter</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Professional-grade tools wrapped in an intuitive no-code interface.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-6 hover:border-primary/20 transition-all group"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
        <div className="max-w-5xl mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From idea to live bot in minutes</h2>
            <p className="text-muted-foreground">Four simple steps to algorithmic trading success.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {workflowSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center"
              >
                <div className="text-4xl font-bold gradient-text mb-3">{step.step}</div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center glass rounded-2xl p-12 glow-purple relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to automate your trading?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join thousands of traders building smarter strategies with AlgoFlow.
              Start free, upgrade when you're ready.
            </p>
            <Button variant="gradient" size="lg" asChild>
              <Link to="/signup">
                Create Free Account
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-semibold">AlgoFlow</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 AlgoFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
