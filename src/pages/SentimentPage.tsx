import { motion } from 'framer-motion'
import { Brain, ExternalLink, MessageCircle, Newspaper, ThumbsDown, ThumbsUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { newsItems, sentimentData, socialPosts } from '@/data/mockData'
import { cn } from '@/utils/cn'

function SentimentGauge({ value, label }: { value: number; label: string }) {
  const color = value >= 60 ? 'text-success' : value >= 40 ? 'text-warning' : 'text-destructive'

  return (
    <div className="text-center">
      <div className="relative mx-auto w-32 h-32 mb-3">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeDasharray={`${value * 2.64} 264`}
            strokeLinecap="round"
            className={color}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn('text-3xl font-bold', color)}>{value}</span>
          <span className="text-[10px] text-muted-foreground uppercase">{label}</span>
        </div>
      </div>
    </div>
  )
}

const sentimentBadge = {
  positive: 'success' as const,
  negative: 'destructive' as const,
  neutral: 'secondary' as const,
}

export function SentimentPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Sentiment Analysis</h2>
        <p className="text-sm text-muted-foreground">
          AI-powered market sentiment from news, social media, and on-chain data
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              Market Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SentimentGauge value={sentimentData.overall} label="Overall Score" />
            <div className="space-y-3 mt-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-success"><ThumbsUp className="h-3 w-3" /> Positive</span>
                  <span>{sentimentData.positive}%</span>
                </div>
                <Progress value={sentimentData.positive} indicatorClassName="bg-success" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Neutral</span>
                  <span>{sentimentData.neutral}%</span>
                </div>
                <Progress value={sentimentData.neutral} indicatorClassName="bg-muted-foreground" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="flex items-center gap-1 text-destructive"><ThumbsDown className="h-3 w-3" /> Negative</span>
                  <span>{sentimentData.negative}%</span>
                </div>
                <Progress value={sentimentData.negative} indicatorClassName="bg-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">AI Confidence</CardTitle>
            <Badge variant="success">{sentimentData.trend.toUpperCase()}</Badge>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Model Confidence</span>
                  <span className="text-2xl font-bold text-primary">{sentimentData.aiConfidence}%</span>
                </div>
                <Progress value={sentimentData.aiConfidence} className="h-3" />
                <p className="text-xs text-muted-foreground mt-3">
                  Based on analysis of 2,847 news articles and 15,230 social posts in the last 24 hours.
                  Model v3.2 trained on 5 years of market correlation data.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Newspaper className="h-4 w-4" />
              News Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {newsItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant={sentimentBadge[item.sentiment]} className="text-[10px] shrink-0">
                    {item.sentiment}
                  </Badge>
                  <ExternalLink className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-sm font-medium mb-1">{item.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{item.summary}</p>
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                  <span>{item.source}</span>
                  <span>·</span>
                  <span>{item.time}</span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Social Feed
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {socialPosts.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-lg bg-secondary/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-sm font-medium">{post.author}</span>
                    <span className="text-xs text-muted-foreground ml-2">{post.handle}</span>
                  </div>
                  <Badge variant={sentimentBadge[post.sentiment]} className="text-[10px]">
                    {post.sentiment}
                  </Badge>
                </div>
                <p className="text-sm mb-2">{post.content}</p>
                <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span>{post.likes.toLocaleString()} likes</span>
                  <span>·</span>
                  <span>{post.time}</span>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
