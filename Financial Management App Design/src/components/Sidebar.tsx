import { useNavigation } from "./NavigationContext"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import { 
  LayoutDashboard,
  Building2,
  Package,
  TrendingUp,
  TrendingDown,
  Calculator,
  Banknote,
  Settings,
  Calendar
} from "lucide-react"

const navigationItems = [
  {
    id: 'dashboard' as const,
    label: 'Dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'bank' as const,
    label: 'Bank Balance',
    icon: Building2
  },
  {
    id: 'inventory' as const,
    label: 'Inventory',
    icon: Package
  },
  {
    id: 'sales' as const,
    label: 'Sales & Income',
    icon: TrendingUp
  },
  {
    id: 'purchases' as const,
    label: 'Purchases & Expenses',
    icon: TrendingDown
  },
  {
    id: 'profit-loss' as const,
    label: 'Profit & Loss',
    icon: Calculator
  },
  {
    id: 'cash-flow' as const,
    label: 'Cash Flow',
    icon: Banknote
  }
]

export function Sidebar() {
  const { activePage, setActivePage } = useNavigation()

  return (
    <div className="w-64 min-h-screen bg-card border-r border-border/50">
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-8">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calculator className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">FinanceCheck</h1>
            <p className="text-xs text-muted-foreground">Management Suite</p>
          </div>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activePage === item.id
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start h-11 px-4 ${
                  isActive 
                    ? "bg-primary/10 text-primary hover:bg-primary/15" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
                onClick={() => setActivePage(item.id)}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            )
          })}
        </nav>

        <Separator className="my-6" />

        <Button
          variant={activePage === 'settings' ? "secondary" : "ghost"}
          className={`w-full justify-start h-11 px-4 ${
            activePage === 'settings'
              ? "bg-primary/10 text-primary hover:bg-primary/15" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
          onClick={() => setActivePage('settings')}
        >
          <Settings className="w-5 h-5 mr-3" />
          Settings
        </Button>
      </div>
    </div>
  )
}