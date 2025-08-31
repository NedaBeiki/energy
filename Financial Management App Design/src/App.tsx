import { NavigationProvider, useNavigation } from "./components/NavigationContext"
import { Sidebar } from "./components/Sidebar"
import { FinancialDashboard } from "./components/FinancialDashboard"
import { BankBalance } from "./components/pages/BankBalance"
import { Inventory } from "./components/pages/Inventory"
import { SalesIncome } from "./components/pages/SalesIncome"
import { PurchasesExpenses } from "./components/pages/PurchasesExpenses"
import { ProfitLoss } from "./components/pages/ProfitLoss"
import { CashFlow } from "./components/pages/CashFlow"
import { Settings } from "./components/pages/Settings"
import { Button } from "./components/ui/button"
import { Bell, LogOut, User } from "lucide-react"
import { Badge } from "./components/ui/badge"

function AppContent() {
  const { activePage } = useNavigation()

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <FinancialDashboard />
      case 'bank':
        return <BankBalance />
      case 'inventory':
        return <Inventory />
      case 'sales':
        return <SalesIncome />
      case 'purchases':
        return <PurchasesExpenses />
      case 'profit-loss':
        return <ProfitLoss />
      case 'cash-flow':
        return <CashFlow />
      case 'settings':
        return <Settings />
      default:
        return <FinancialDashboard />
    }
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="border-b border-border/50 bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-0">
                Online
              </Badge>
              <span className="text-sm text-muted-foreground">
                Last updated: {new Date().toLocaleTimeString()}
              </span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground relative">
                <Bell className="w-4 h-4" />
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 w-2 h-2 p-0 text-xs"
                >
                  <span className="sr-only">3 notifications</span>
                </Badge>
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <User className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 bg-muted/10">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  )
}