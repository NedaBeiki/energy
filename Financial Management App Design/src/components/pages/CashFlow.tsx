import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { DateRangePicker } from "../DateRangePicker"
import { 
  Banknote,
  TrendingUp,
  TrendingDown,
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  FileText,
  Download
} from "lucide-react"

interface CashFlowItem {
  category: string
  amount: number
  type: 'inflow' | 'outflow'
}

interface CashFlowPeriod {
  period: string
  openingBalance: number
  inflows: CashFlowItem[]
  outflows: CashFlowItem[]
  closingBalance: number
}

export function CashFlow() {
  const [activeTab, setActiveTab] = useState('statement')

  // Sample cash flow data
  const cashFlowData: CashFlowPeriod[] = [
    {
      period: 'Week 1 (Aug 1-7)',
      openingBalance: 125000,
      inflows: [
        { category: 'Customer Payments', amount: 45000, type: 'inflow' },
        { category: 'Investment Income', amount: 2500, type: 'inflow' },
        { category: 'Loan Proceeds', amount: 15000, type: 'inflow' }
      ],
      outflows: [
        { category: 'Supplier Payments', amount: 18000, type: 'outflow' },
        { category: 'Salaries', amount: 25000, type: 'outflow' },
        { category: 'Rent', amount: 5000, type: 'outflow' },
        { category: 'Utilities', amount: 2200, type: 'outflow' }
      ],
      closingBalance: 137300
    },
    {
      period: 'Week 2 (Aug 8-14)',
      openingBalance: 137300,
      inflows: [
        { category: 'Customer Payments', amount: 38000, type: 'inflow' },
        { category: 'Consulting Fees', amount: 12000, type: 'inflow' }
      ],
      outflows: [
        { category: 'Equipment Purchase', amount: 15000, type: 'outflow' },
        { category: 'Marketing', amount: 8000, type: 'outflow' },
        { category: 'Office Supplies', amount: 3500, type: 'outflow' },
        { category: 'Insurance', amount: 2800, type: 'outflow' }
      ],
      closingBalance: 158000
    },
    {
      period: 'Week 3 (Aug 15-21)',
      openingBalance: 158000,
      inflows: [
        { category: 'Customer Payments', amount: 52000, type: 'inflow' },
        { category: 'Product Sales', amount: 28000, type: 'inflow' }
      ],
      outflows: [
        { category: 'Salaries', amount: 25000, type: 'outflow' },
        { category: 'Supplier Payments', amount: 22000, type: 'outflow' },
        { category: 'Loan Payment', amount: 5000, type: 'outflow' },
        { category: 'Professional Services', amount: 3200, type: 'outflow' }
      ],
      closingBalance: 182800
    },
    {
      period: 'Week 4 (Aug 22-31)',
      openingBalance: 182800,
      inflows: [
        { category: 'Customer Payments', amount: 41000, type: 'inflow' },
        { category: 'Investment Income', amount: 1800, type: 'inflow' }
      ],
      outflows: [
        { category: 'Supplier Payments', amount: 19000, type: 'outflow' },
        { category: 'Marketing', amount: 12000, type: 'outflow' },
        { category: 'Maintenance', amount: 4500, type: 'outflow' },
        { category: 'Miscellaneous', amount: 2100, type: 'outflow' }
      ],
      closingBalance: 188000
    }
  ]

  // Calculate totals
  const totalInflows = cashFlowData.reduce((sum, period) => 
    sum + period.inflows.reduce((s, item) => s + item.amount, 0), 0)
  
  const totalOutflows = cashFlowData.reduce((sum, period) => 
    sum + period.outflows.reduce((s, item) => s + item.amount, 0), 0)
  
  const netCashFlow = totalInflows - totalOutflows
  const currentBalance = cashFlowData[cashFlowData.length - 1]?.closingBalance || 0
  const openingBalance = cashFlowData[0]?.openingBalance || 0

  // Projection data for next 4 weeks
  const projectionData = [
    {
      period: 'Week 1 (Sep 1-7)',
      projected: 195000,
      confidence: 'high'
    },
    {
      period: 'Week 2 (Sep 8-14)',
      projected: 203000,
      confidence: 'high'
    },
    {
      period: 'Week 3 (Sep 15-21)',
      projected: 198000,
      confidence: 'medium'
    },
    {
      period: 'Week 4 (Sep 22-30)',
      projected: 210000,
      confidence: 'medium'
    }
  ]

  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString()}`
  }

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-chart-3/10 text-chart-3'
      case 'medium': return 'bg-chart-4/10 text-chart-4'
      case 'low': return 'bg-chart-5/10 text-chart-5'
      default: return 'bg-muted'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Cash Flow Statement</h1>
          <p className="text-muted-foreground mt-1">Monitor cash inflows, outflows, and projections</p>
        </div>
        <div className="flex items-center space-x-3">
          <DateRangePicker />
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <FileText className="w-4 h-4 mr-2" />
            Generate Forecast
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Opening Balance</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(openingBalance)}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-1/10">
              <Calendar className="w-6 h-6 text-chart-1" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Inflows</p>
              <p className="text-2xl font-semibold text-chart-3">{formatCurrency(totalInflows)}</p>
              <div className="flex items-center space-x-2 mt-2">
                <ArrowUpCircle className="w-4 h-4 text-chart-3" />
                <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-0">
                  +8.2%
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-full bg-chart-3/10">
              <TrendingUp className="w-6 h-6 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Outflows</p>
              <p className="text-2xl font-semibold text-chart-5">{formatCurrency(totalOutflows)}</p>
              <div className="flex items-center space-x-2 mt-2">
                <ArrowDownCircle className="w-4 h-4 text-chart-5" />
                <Badge variant="secondary" className="bg-chart-5/10 text-chart-5 border-0">
                  +3.1%
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-full bg-chart-5/10">
              <TrendingDown className="w-6 h-6 text-chart-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Current Balance</p>
              <p className="text-2xl font-semibold text-foreground">{formatCurrency(currentBalance)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Net: {formatCurrency(netCashFlow)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-chart-4/10">
              <Banknote className="w-6 h-6 text-chart-4" />
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="statement" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="statement">Cash Flow Statement</TabsTrigger>
          <TabsTrigger value="projections">Projections</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="statement" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Weekly Cash Flow Breakdown</h3>
            
            <div className="space-y-6">
              {cashFlowData.map((period, index) => {
                const totalInflowsWeek = period.inflows.reduce((sum, item) => sum + item.amount, 0)
                const totalOutflowsWeek = period.outflows.reduce((sum, item) => sum + item.amount, 0)
                const netFlowWeek = totalInflowsWeek - totalOutflowsWeek
                
                return (
                  <div key={index} className="border border-border/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-foreground">{period.period}</h4>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          Opening: {formatCurrency(period.openingBalance)}
                        </span>
                        <span className={`text-sm font-medium ${netFlowWeek >= 0 ? 'text-chart-3' : 'text-chart-5'}`}>
                          Net: {netFlowWeek >= 0 ? '+' : ''}{formatCurrency(netFlowWeek)}
                        </span>
                        <span className="text-sm font-semibold text-foreground">
                          Closing: {formatCurrency(period.closingBalance)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Inflows */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-chart-3 flex items-center">
                          <ArrowUpCircle className="w-4 h-4 mr-2" />
                          Cash Inflows ({formatCurrency(totalInflowsWeek)})
                        </h5>
                        <div className="space-y-1">
                          {period.inflows.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{item.category}</span>
                              <span className="font-medium text-chart-3">+{formatCurrency(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Outflows */}
                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-chart-5 flex items-center">
                          <ArrowDownCircle className="w-4 h-4 mr-2" />
                          Cash Outflows ({formatCurrency(totalOutflowsWeek)})
                        </h5>
                        <div className="space-y-1">
                          {period.outflows.map((item, i) => (
                            <div key={i} className="flex justify-between text-sm">
                              <span className="text-muted-foreground">{item.category}</span>
                              <span className="font-medium text-chart-5">-{formatCurrency(item.amount)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="projections" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Cash Flow Projections</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {projectionData.map((projection, index) => (
                  <div key={index} className="p-4 border border-border/30 rounded-lg">
                    <p className="text-sm font-medium text-foreground">{projection.period}</p>
                    <p className="text-xl font-semibold text-foreground mt-1">
                      {formatCurrency(projection.projected)}
                    </p>
                    <Badge 
                      variant="secondary" 
                      className={`${getConfidenceColor(projection.confidence)} border-0 text-xs mt-2`}
                    >
                      {projection.confidence} confidence
                    </Badge>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">Projection Assumptions</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Customer payment patterns based on 90-day rolling average</p>
                  <p>• Seasonal adjustments for September business patterns</p>
                  <p>• Planned equipment purchases and major expenses included</p>
                  <p>• Conservative growth rate of 2-3% applied to recurring revenues</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-6">Cash Flow Analysis</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Key Insights</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-chart-3/10 rounded-lg">
                    <p className="text-sm font-medium text-chart-3">Strong Cash Generation</p>
                    <p className="text-xs text-muted-foreground">Positive net cash flow for all periods</p>
                  </div>
                  <div className="p-3 bg-chart-4/10 rounded-lg">
                    <p className="text-sm font-medium text-chart-4">Healthy Cash Reserves</p>
                    <p className="text-xs text-muted-foreground">3.2 months of operating expenses covered</p>
                  </div>
                  <div className="p-3 bg-chart-1/10 rounded-lg">
                    <p className="text-sm font-medium text-chart-1">Stable Growth Pattern</p>
                    <p className="text-xs text-muted-foreground">Consistent week-over-week improvement</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Recommendations</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="text-chart-3 mt-1">•</span>
                    <span className="text-muted-foreground">Consider investing excess cash in short-term investments</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-chart-3 mt-1">•</span>
                    <span className="text-muted-foreground">Maintain minimum cash reserve of $150,000 for operations</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-chart-4 mt-1">•</span>
                    <span className="text-muted-foreground">Review payment terms with major customers to improve cash timing</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="text-chart-4 mt-1">•</span>
                    <span className="text-muted-foreground">Plan major equipment purchases for optimal cash flow timing</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 border border-border/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Cash Flow Ratios</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Cash Conversion</p>
                  <p className="text-lg font-semibold text-foreground">18 days</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Operating CF Margin</p>
                  <p className="text-lg font-semibold text-foreground">24.3%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Cash Coverage</p>
                  <p className="text-lg font-semibold text-foreground">3.2x</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Free Cash Flow</p>
                  <p className="text-lg font-semibold text-chart-3">{formatCurrency(netCashFlow * 0.85)}</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}