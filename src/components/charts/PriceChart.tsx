import { useEffect, useRef } from 'react'
import { createChart, AreaSeries, type IChartApi, ColorType, type UTCTimestamp } from 'lightweight-charts'
import { cn } from '@/utils/cn'

interface PriceChartProps {
  data: { time: string; value: number }[]
  className?: string
  color?: string
}

export function PriceChart({ data, className, color = '#22d3ee' }: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#7b8ba3',
      },
      grid: {
        vertLines: { color: 'rgba(148, 163, 184, 0.06)' },
        horzLines: { color: 'rgba(148, 163, 184, 0.06)' },
      },
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight || 280,
      timeScale: { borderVisible: false },
      rightPriceScale: { borderVisible: false },
    })

    const series = chart.addSeries(AreaSeries, {
      lineColor: color,
      topColor: `${color}40`,
      bottomColor: `${color}05`,
      lineWidth: 2,
    })

    const formatted = data.map((d, i) => ({
      time: (Math.floor(Date.now() / 1000) - (data.length - i) * 86400) as UTCTimestamp,
      value: d.value,
    }))

    series.setData(formatted)
    chart.timeScale().fitContent()
    chartRef.current = chart

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth })
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, color])

  return (
    <div ref={containerRef} className={cn('w-full h-full min-h-[200px]', className)} />
  )
}
