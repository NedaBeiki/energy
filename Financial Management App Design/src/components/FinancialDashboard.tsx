import { Card } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Receipt, PieChart } from "lucide-react"

export function FinancialDashboard() {
  // Mock data for demonstration
  const metrics = [
    {
      title: "Total Revenue",
      value: "$1,247,820",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "text-chart-1"
    },
    {
      title: "Total Expenses",
      value: "$892,340",
      change: "-3.2%",
      trend: "down",
      icon: Receipt,
      color: "text-chart-2"
    },
    {
      title: "Net Profit",
      value: "$355,480",
      change: "+8.7%",
      trend: "up",
      icon: TrendingUp,
      color: "text-chart-3"
    },
    {
      title: "Cash Flow",
      value: "$189,750",
      change: "+15.3%",
      trend: "up",
      icon: BarChart3,
      color: "text-chart-4"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Financial Overview</h1>
          <p className="text-muted-foreground mt-1">Monitor your accounting metrics and performance</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <PieChart className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon
          return (
            <Card key={index} className="p-6 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
                  <div className="flex items-center space-x-2">
                    {metric.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-chart-3" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-chart-5" />
                    )}
                    <Badge 
                      variant="secondary" 
                      className={`${metric.trend === "up" ? "bg-chart-3/10 text-chart-3" : "bg-chart-5/10 text-chart-5"} border-0`}
                    >
                      {metric.change}
                    </Badge>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-muted ${metric.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
          <TabsTrigger value="accounts">Account Balances</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {[
                { id: "TXN001", description: "Office Supplies Purchase", amount: "-$2,450", date: "2025-08-30", type: "expense" },
                { id: "TXN002", description: "Client Payment - Project Alpha", amount: "+$15,750", date: "2025-08-29", type: "income" },
                { id: "TXN003", description: "Software License Renewal", amount: "-$1,200", date: "2025-08-28", type: "expense" },
                { id: "TXN004", description: "Consulting Services", amount: "+$8,500", date: "2025-08-27", type: "income" },
                { id: "TXN005", description: "Utilities Payment", amount: "-$850", date: "2025-08-26", type: "expense" }
              ].map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground">{transaction.id} • {transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === "income" ? "text-chart-3" : "text-chart-5"}`}>
                      {transaction.amount}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      {transaction.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Account Balances</h3>
            <div className="grid gap-4">
              {[
                { name: "Operating Account", balance: "$125,430", type: "Checking", status: "active" },
                { name: "Savings Account", balance: "$89,720", type: "Savings", status: "active" },
                { name: "Petty Cash", balance: "$2,150", type: "Cash", status: "active" },
                { name: "Investment Account", balance: "$234,890", type: "Investment", status: "active" }
              ].map((account, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-accent/30 border border-border/30">
                  <div>
                    <p className="font-medium text-foreground">{account.name}</p>
                    <p className="text-sm text-muted-foreground">{account.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">{account.balance}</p>
                    <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-0">
                      {account.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Financial Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Monthly Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenue Growth</span>
                    <span className="text-sm font-medium text-chart-3">+12.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Expense Reduction</span>
                    <span className="text-sm font-medium text-chart-1">-3.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Profit Margin</span>
                    <span className="text-sm font-medium text-chart-4">28.5%</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Key Ratios</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Ratio</span>
                    <span className="text-sm font-medium">2.4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Quick Ratio</span>
                    <span className="text-sm font-medium">1.8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Debt-to-Equity</span>
                    <span className="text-sm font-medium">0.3</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}