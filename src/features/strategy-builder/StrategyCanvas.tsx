import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
  type Connection,
  type EdgeChange,
  type Node,
  type NodeChange,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { Save } from 'lucide-react'
import { useCallback, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { NodePalette } from '@/features/strategy-builder/NodePalette'
import { nodeTypes } from '@/features/strategy-builder/nodes/StrategyNodes'
import { useStrategyStore, type StrategyNodeData } from '@/store/useStrategyStore'

let nodeId = 100

export function StrategyCanvas() {
  const reactFlowWrapper = useRef<HTMLDivElement>(null)
  const {
    strategyName,
    nodes,
    edges,
    isDirty,
    setStrategyName,
    setNodes,
    setEdges,
    markSaved,
  } = useStrategyStore()

  const onNodesChange = useCallback(
    (changes: NodeChange<Node<StrategyNodeData>>[]) => {
      setNodes(applyNodeChanges(changes, nodes))
    },
    [nodes, setNodes]
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges(applyEdgeChanges(changes, edges))
    },
    [edges, setEdges]
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(addEdge({ ...connection, animated: true }, edges))
    },
    [edges, setEdges]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const type = event.dataTransfer.getData('application/reactflow-type')
      const label = event.dataTransfer.getData('application/reactflow-label')
      const paramsStr = event.dataTransfer.getData('application/reactflow-params')

      if (!type || !reactFlowWrapper.current) return

      const params = JSON.parse(paramsStr) as Record<string, string | number>
      const bounds = reactFlowWrapper.current.getBoundingClientRect()
      const position = {
        x: event.clientX - bounds.left - 90,
        y: event.clientY - bounds.top - 40,
      }

      const newNode: Node<StrategyNodeData> = {
        id: `${type}-${nodeId++}`,
        type,
        position,
        data: { label, nodeType: type as StrategyNodeData['nodeType'], params },
      }

      setNodes([...nodes, newNode])
    },
    [nodes, setNodes]
  )

  const onDragStart = (
    event: React.DragEvent,
    nodeType: string,
    label: string,
    params: Record<string, string | number>
  ) => {
    event.dataTransfer.setData('application/reactflow-type', nodeType)
    event.dataTransfer.setData('application/reactflow-label', label)
    event.dataTransfer.setData('application/reactflow-params', JSON.stringify(params))
    event.dataTransfer.effectAllowed = 'move'
  }

  const handleSave = () => {
    markSaved()
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] rounded-xl border border-border overflow-hidden glass">
      <NodePalette onDragStart={onDragStart} />

      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between gap-4 p-4 border-b border-border">
          <div className="flex items-center gap-3 min-w-0">
            <Input
              value={strategyName}
              onChange={(e) => setStrategyName(e.target.value)}
              className="max-w-xs h-9 font-medium bg-transparent border-none text-base focus-visible:ring-0 px-0"
            />
            {isDirty && <Badge variant="warning">Unsaved</Badge>}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Test Run</Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4" />
              Save Strategy
            </Button>
          </div>
        </div>

        <div ref={reactFlowWrapper} className="flex-1">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDragOver={onDragOver}
            onDrop={onDrop}
            nodeTypes={nodeTypes}
            fitView
            className="bg-background/50"
            defaultEdgeOptions={{ animated: true }}
          >
            <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="rgba(148,163,184,0.1)" />
            <Controls />
            <MiniMap
              nodeColor={(n) => {
                const colors: Record<string, string> = {
                  rsi: '#22d3ee',
                  buy: '#10b981',
                  sell: '#ef4444',
                  condition: '#f59e0b',
                }
                return colors[n.type ?? ''] ?? '#6366f1'
              }}
              maskColor="rgba(6, 8, 15, 0.8)"
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}
