import { create } from 'zustand'

interface User {
  name: string
  email: string
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
}

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: 'trade' | 'alert' | 'system'
}

interface AppState {
  sidebarCollapsed: boolean
  marketOpen: boolean
  user: User
  notifications: Notification[]
  searchTerm: string
  toggleSidebar: () => void
  setSidebarCollapsed: (collapsed: boolean) => void
  markNotificationRead: (id: string) => void
  setSearchTerm: (value: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarCollapsed: false,
  marketOpen: true,
  user: {
    name: 'Alex Chen',
    email: 'alex@algoflow.io',
    plan: 'pro',
  },
  notifications: [
    { id: '1', title: 'Trade Executed', message: 'RSI Momentum bot bought 0.15 BTC at $67,842', time: '2 min ago', read: false, type: 'trade' },
    { id: '2', title: 'Strategy Alert', message: 'Golden Cross detected on ETH/USDT 4H', time: '15 min ago', read: false, type: 'alert' },
    { id: '3', title: 'System Update', message: 'New sentiment analysis model deployed', time: '1 hr ago', read: true, type: 'system' },
  ],
  searchTerm: '',
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  markNotificationRead: (id) =>
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  setSearchTerm: (value) => set({ searchTerm: value }),
}))
