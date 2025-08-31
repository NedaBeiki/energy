import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { DateRangePicker } from "../DateRangePicker"
import { 
  Calculator,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Receipt,
  FileText,
  Download
} from "lucide-react"

interface PLItem {
  category: string
  currentPeriod: number
  previousPeriod: number
  change: number
  changePercent: number
}

export function ProfitLoss() {
  // Sample P&L data
  const revenueItems: PLItem[] = [
    {
      category: "Product Sales",
      currentPeriod: 850000,
      previousPeriod: 780000,
      change: 70000,
      changePercent: 8.97
    },
    {
      category: "Service Revenue",
      currentPeriod: 450000,
      previousPeriod: 420000,
      change: 30000,
      changePercent: 7.14
    },
    {
      category: "Consulting Fees",
      currentPeriod: 125000,
      previousPeriod: 95000,
      change: 30000,
      changePercent: 31.58
    },
    {
      category: "Other Income",
      currentPeriod: 15000,
      previousPeriod: 12000,
      change: 3000,
      changePercent: 25.00
    }
  ]

  const expenseItems: PLItem[] = [
    {
      category: "Cost of Goods Sold",
      currentPeriod: 420000,
      previousPeriod: 390000,
      change: 30000,
      changePercent: 7.69
    },
    {
      category: "Salaries & Benefits",
      currentPeriod: 285000,
      previousPeriod: 270000,
      change: 15000,
      changePercent: 5.56
    },
    {
      category: "Rent & Utilities",
      currentPeriod: 48000,
      previousPeriod: 45000,
      change: 3000,
      changePercent: 6.67
    },
    {
      category: "Marketing & Advertising",
      currentPeriod: 65000,
      previousPeriod: 58000,
      change: 7000,
      changePercent: 12.07
    },
    {
      category: "Office Supplies",
      currentPeriod: 18000,
      previousPeriod: 22000,
      change: -4000,
      changePercent: -18.18
    },
    {
      category: "Professional Services",
      currentPeriod: 25000,
      previousPeriod: 20000,
      change: 5000,
      changePercent: 25.00
    },
    {
      category: "Insurance",
      currentPeriod: 15000,
      previousPeriod: 14000,
      change: 1000,
      changePercent: 7.14
    },
    {
      category: "Depreciation",
      currentPeriod: 12000,
      previousPeriod: 12000,
      change: 0,
      changePercent: 0.00
    },
    {
      category: "Other Expenses",
      currentPeriod: 8000,
      previousPeriod: 9000,
      change: -1000,
      changePercent: -11.11
    }
  ]

  const totalRevenue = revenueItems.reduce((sum, item) => sum + item.currentPeriod, 0)
  const totalExpenses = expenseItems.reduce((sum, item) => sum + item.currentPeriod, 0)
  const grossProfit = totalRevenue - revenueItems.find(item => item.category === "Cost of Goods Sold")?.currentPeriod || 0
  const netProfit = totalRevenue - totalExpenses

  const prevTotalRevenue = revenueItems.reduce((sum, item) => sum + item.previousPeriod, 0)
  const prevTotalExpenses = expenseItems.reduce((sum, item) => sum + item.previousPeriod, 0)
  const prevNetProfit = prevTotalRevenue - prevTotalExpenses

  const revenueChange = ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100
  const profitChange = ((netProfit - prevNetProfit) / Math.abs(prevNetProfit)) * 100

  const formatCurrency = (amount: number) => {
    return `$${Math.abs(amount).toLocaleString()}`
  }

  const formatChange = (change: number, percent: number) => {
    const isPositive = change >= 0
    return (
      <div className={`flex items-center space-x-1 ${isPositive ? 'text-chart-3' : 'text-chart-5'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span className="text-xs">
          {isPositive ? '+' : ''}{formatCurrency(change)} ({isPositive ? '+' : ''}{percent.toFixed(1)}%)
        </span>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Profit & Loss Statement</h1>
          <p className="text-muted-foreground mt-1">Comprehensive income statement and financial performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <DateRangePicker />
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <FileText className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(totalRevenue)}</p>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="w-4 h-4 text-chart-3" />
                <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-0">
                  +{revenueChange.toFixed(1)}%
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-full bg-chart-3/10">
              <DollarSign className="w-6 h-6 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(totalExpenses)}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-5/10">
              <Receipt className="w-6 h-6 text-chart-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Gross Profit</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(grossProfit)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {((grossProfit / totalRevenue) * 100).toFixed(1)}% margin
              </p>
            </div>
            <div className="p-3 rounded-full bg-chart-4/10">
              <TrendingUp className="w-6 h-6 text-chart-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Net Profit</p>
              <p className={`text-2xl font-semibold ${netProfit >= 0 ? 'text-chart-3' : 'text-chart-5'}`}>
                {netProfit >= 0 ? '' : '-'}{formatCurrency(netProfit)}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                {profitChange >= 0 ? (
                  <TrendingUp className="w-4 h-4 text-chart-3" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-chart-5" />
                )}
                <Badge 
                  variant="secondary" 
                  className={`${profitChange >= 0 ? 'bg-chart-3/10 text-chart-3' : 'bg-chart-5/10 text-chart-5'} border-0`}
                >
                  {profitChange >= 0 ? '+' : ''}{profitChange.toFixed(1)}%
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-full bg-chart-1/10">
              <Calculator className="w-6 h-6 text-chart-1" />
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed P&L Statement */}
      <Tabs defaultValue="detailed" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-muted/50">
          <TabsTrigger value="detailed">Detailed Statement</TabsTrigger>
          <TabsTrigger value="summary">Executive Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Income Statement</h3>
            
            {/* Revenue Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <h4 className="font-medium text-foreground">REVENUE</h4>
                <div className="flex space-x-16 text-sm font-medium text-muted-foreground">
                  <span className="w-24 text-right">Current</span>
                  <span className="w-24 text-right">Previous</span>
                  <span className="w-32 text-right">Change</span>
                </div>
              </div>
              
              {revenueItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 hover:bg-muted/20 px-2 rounded">
                  <span className="text-foreground">{item.category}</span>
                  <div className="flex space-x-16 text-sm">
                    <span className="w-24 text-right font-medium">{formatCurrency(item.currentPeriod)}</span>
                    <span className="w-24 text-right text-muted-foreground">{formatCurrency(item.previousPeriod)}</span>
                    <div className="w-32 text-right">
                      {formatChange(item.change, item.changePercent)}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-between py-3 border-t border-border/30 font-semibold">
                <span className="text-foreground">Total Revenue</span>
                <div className="flex space-x-16">
                  <span className="w-24 text-right">{formatCurrency(totalRevenue)}</span>
                  <span className="w-24 text-right">{formatCurrency(prevTotalRevenue)}</span>
                  <div className="w-32 text-right">
                    {formatChange(totalRevenue - prevTotalRevenue, revenueChange)}
                  </div>
                </div>
              </div>
            </div>

            {/* Expenses Section */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <h4 className="font-medium text-foreground">EXPENSES</h4>
                <div className="flex space-x-16 text-sm font-medium text-muted-foreground">
                  <span className="w-24 text-right">Current</span>
                  <span className="w-24 text-right">Previous</span>
                  <span className="w-32 text-right">Change</span>
                </div>
              </div>
              
              {expenseItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between py-2 hover:bg-muted/20 px-2 rounded">
                  <span className="text-foreground">{item.category}</span>
                  <div className="flex space-x-16 text-sm">
                    <span className="w-24 text-right font-medium">{formatCurrency(item.currentPeriod)}</span>
                    <span className="w-24 text-right text-muted-foreground">{formatCurrency(item.previousPeriod)}</span>
                    <div className="w-32 text-right">
                      {formatChange(item.change, item.changePercent)}
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center justify-between py-3 border-t border-border/30 font-semibold">
                <span className="text-foreground">Total Expenses</span>
                <div className="flex space-x-16">
                  <span className="w-24 text-right">{formatCurrency(totalExpenses)}</span>
                  <span className="w-24 text-right">{formatCurrency(prevTotalExpenses)}</span>
                  <div className="w-32 text-right">
                    {formatChange(totalExpenses - prevTotalExpenses, ((totalExpenses - prevTotalExpenses) / prevTotalExpenses) * 100)}
                  </div>
                </div>
              </div>
            </div>

            {/* Net Profit */}
            <div className="mt-8 p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between font-semibold text-lg">
                <span className="text-foreground">NET PROFIT</span>
                <div className="flex space-x-16">
                  <span className={`w-24 text-right ${netProfit >= 0 ? 'text-chart-3' : 'text-chart-5'}`}>
                    {netProfit >= 0 ? '' : '-'}{formatCurrency(netProfit)}
                  </span>
                  <span className={`w-24 text-right ${prevNetProfit >= 0 ? 'text-chart-3' : 'text-chart-5'}`}>
                    {prevNetProfit >= 0 ? '' : '-'}{formatCurrency(prevNetProfit)}
                  </span>
                  <div className="w-32 text-right">
                    {formatChange(netProfit - prevNetProfit, profitChange)}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Executive Summary</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Key Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Revenue Growth</span>
                      <span className="font-medium text-chart-3">+{revenueChange.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Gross Margin</span>
                      <span className="font-medium">{((grossProfit / totalRevenue) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Net Margin</span>
                      <span className="font-medium">{((netProfit / totalRevenue) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Expense Ratio</span>
                      <span className="font-medium">{((totalExpenses / totalRevenue) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Performance Highlights</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-chart-3/10 rounded-lg">
                      <p className="text-sm font-medium text-chart-3">Revenue increased by {revenueChange.toFixed(1)}%</p>
                      <p className="text-xs text-muted-foreground">Strong growth in consulting services</p>
                    </div>
                    <div className="p-3 bg-chart-4/10 rounded-lg">
                      <p className="text-sm font-medium text-chart-4">Maintained healthy profit margins</p>
                      <p className="text-xs text-muted-foreground">Net margin of {((netProfit / totalRevenue) * 100).toFixed(1)}%</p>
                    </div>
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