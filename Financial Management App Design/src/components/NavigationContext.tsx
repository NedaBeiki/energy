import { createContext, useContext, useState, ReactNode } from 'react'

type PageType = 'dashboard' | 'bank' | 'inventory' | 'sales' | 'purchases' | 'profit-loss' | 'cash-flow' | 'settings'

interface NavigationContextType {
  activePage: PageType
  setActivePage: (page: PageType) => void
  dateRange: { from: Date; to: Date }
  setDateRange: (range: { from: Date; to: Date }) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activePage, setActivePage] = useState<PageType>('dashboard')
  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  })

  return (
    <NavigationContext.Provider value={{ activePage, setActivePage, dateRange, setDateRange }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return context
}