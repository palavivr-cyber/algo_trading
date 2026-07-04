import { create } from 'zustand'
import type { Edge, Node } from '@xyflow/react'

export type NodeType =
  | 'rsi'
  | 'macd'
  | 'movingAverage'
  | 'buy'
  | 'sell'
  | 'sentiment'
  | 'condition'
  | 'stopLoss'
  | 'takeProfit'

export interface StrategyNodeData extends Record<string, unknown> {
  label: string
  nodeType: NodeType
  params: Record<string, string | number>
}

interface StrategyState {
  strategyName: string
  nodes: Node<StrategyNodeData>[]
  edges: Edge[]
  isDirty: boolean
  setStrategyName: (name: string) => void
  setNodes: (nodes: Node<StrategyNodeData>[]) => void
  setEdges: (edges: Edge[]) => void
  addNode: (node: Node<StrategyNodeData>) => void
  updateNodeParams: (nodeId: string, params: Record<string, string | number>) => void
  markSaved: () => void
}

const initialNodes: Node<StrategyNodeData>[] = [
  {
    id: 'rsi-1',
    type: 'rsi',
    position: { x: 100, y: 150 },
    data: { label: 'RSI', nodeType: 'rsi', params: { period: 14, oversold: 30, overbought: 70 } },
  },
  {
    id: 'condition-1',
    type: 'condition',
    position: { x: 350, y: 150 },
    data: { label: 'Condition', nodeType: 'condition', params: { operator: '<', value: 30 } },
  },
  {
    id: 'buy-1',
    type: 'buy',
    position: { x: 600, y: 100 },
    data: { label: 'Buy', nodeType: 'buy', params: { amount: 0.1, type: 'market' } },
  },
  {
    id: 'stopLoss-1',
    type: 'stopLoss',
    position: { x: 600, y: 250 },
    data: { label: 'Stop Loss', nodeType: 'stopLoss', params: { percent: 2 } },
  },
]

const initialEdges: Edge[] = [
  { id: 'e1', source: 'rsi-1', target: 'condition-1', animated: true },
  { id: 'e2', source: 'condition-1', target: 'buy-1', animated: true },
  { id: 'e3', source: 'condition-1', target: 'stopLoss-1', animated: true },
]

export const useStrategyStore = create<StrategyState>((set) => ({
  strategyName: 'RSI Oversold Strategy',
  nodes: initialNodes,
  edges: initialEdges,
  isDirty: false,
  setStrategyName: (name) => set({ strategyName: name, isDirty: true }),
  setNodes: (nodes) => set({ nodes, isDirty: true }),
  setEdges: (edges) => set({ edges, isDirty: true }),
  addNode: (node) => set((s) => ({ nodes: [...s.nodes, node], isDirty: true })),
  updateNodeParams: (nodeId, params) =>
    set((s) => ({
      nodes: s.nodes.map((n) =>
        n.id === nodeId ? { ...n, data: { ...n.data, params: { ...n.data.params, ...params } } } : n
      ),
      isDirty: true,
    })),
  markSaved: () => set({ isDirty: false }),
}))
