import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { DateRangePicker } from "../DateRangePicker"
import { 
  TrendingDown, 
  Plus, 
  Search, 
  Receipt,
  CreditCard,
  Calendar,
  Building,
  Filter
} from "lucide-react"

interface ExpenseTransaction {
  id: string
  date: string
  vendor: string
  description: string
  category: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  paymentMethod: string
  receiptNumber: string
}

export function PurchasesExpenses() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [transactions, setTransactions] = useState<ExpenseTransaction[]>([
    {
      id: '1',
      date: '2025-08-31',
      vendor: 'Office Depot',
      description: 'Office Supplies - Printer Paper, Pens, Folders',
      category: 'Office Supplies',
      amount: 2450.00,
      status: 'paid',
      paymentMethod: 'Credit Card',
      receiptNumber: 'RCP-2025-001'
    },
    {
      id: '2',
      date: '2025-08-30',
      vendor: 'Microsoft Corporation',
      description: 'Software License Renewal - Office 365 Business',
      category: 'Software',
      amount: 1200.00,
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      receiptNumber: 'RCP-2025-002'
    },
    {
      id: '3',
      date: '2025-08-29',
      vendor: 'City Utilities',
      description: 'Monthly Utility Bills - Electricity, Water, Internet',
      category: 'Utilities',
      amount: 850.00,
      status: 'pending',
      paymentMethod: 'Auto-Pay',
      receiptNumber: 'RCP-2025-003'
    },
    {
      id: '4',
      date: '2025-08-28',
      vendor: 'Marketing Solutions Inc',
      description: 'Google Ads Campaign - Q3 Marketing',
      category: 'Marketing',
      amount: 3200.00,
      status: 'paid',
      paymentMethod: 'Credit Card',
      receiptNumber: 'RCP-2025-004'
    },
    {
      id: '5',
      date: '2025-08-27',
      vendor: 'Cleaning Services Pro',
      description: 'Office Cleaning - Monthly Service',
      category: 'Maintenance',
      amount: 450.00,
      status: 'overdue',
      paymentMethod: 'Check',
      receiptNumber: 'RCP-2025-005'
    },
    {
      id: '6',
      date: '2025-08-26',
      vendor: 'Amazon Business',
      description: 'Computer Equipment - Keyboards, Mice, Monitors',
      category: 'Equipment',
      amount: 1850.00,
      status: 'paid',
      paymentMethod: 'Credit Card',
      receiptNumber: 'RCP-2025-006'
    },
    {
      id: '7',
      date: '2025-08-25',
      vendor: 'Local Restaurant',
      description: 'Client Meeting Lunch - ABC Corporation',
      category: 'Meals & Entertainment',
      amount: 180.00,
      status: 'paid',
      paymentMethod: 'Cash',
      receiptNumber: 'RCP-2025-007'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-chart-3/10 text-chart-3'
      case 'pending': return 'bg-chart-4/10 text-chart-4'
      case 'overdue': return 'bg-chart-5/10 text-chart-5'
      default: return 'bg-muted'
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const totalExpenses = transactions
    .filter(t => t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const overdueAmount = transactions
    .filter(t => t.status === 'overdue')
    .reduce((sum, t) => sum + t.amount, 0)

  const thisMonthTransactions = transactions.filter(t => 
    new Date(t.date).getMonth() === new Date().getMonth()
  ).length

  // Category breakdown for current month
  const categoryTotals = transactions
    .filter(t => new Date(t.date).getMonth() === new Date().getMonth())
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount
      return acc
    }, {} as Record<string, number>)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Purchases & Expenses</h1>
          <p className="text-muted-foreground mt-1">Track your business expenses and purchases</p>
        </div>
        <div className="flex items-center space-x-3">
          <DateRangePicker />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="vendor">Vendor/Supplier</Label>
                  <Input id="vendor" placeholder="e.g. Office Depot" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of the purchase/expense" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office-supplies">Office Supplies</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="utilities">Utilities</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="meals">Meals & Entertainment</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="professional">Professional Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" step="0.01" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="payment-method">Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="auto-pay">Auto-Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="receipt">Receipt Number</Label>
                  <Input id="receipt" placeholder="e.g. RCP-2025-001" />
                </div>
                <Button className="w-full">Add Expense</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-semibold text-foreground">${totalExpenses.toLocaleString()}</p>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingDown className="w-4 h-4 text-chart-5" />
                <Badge variant="secondary" className="bg-chart-5/10 text-chart-5 border-0">
                  -3.2%
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-full bg-chart-5/10">
              <Receipt className="w-6 h-6 text-chart-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold text-foreground">${pendingAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-4/10">
              <Calendar className="w-6 h-6 text-chart-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Overdue</p>
              <p className="text-2xl font-semibull text-foreground">${overdueAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-5/10">
              <CreditCard className="w-6 h-6 text-chart-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">This Month</p>
              <p className="text-2xl font-semibold text-foreground">{thisMonthTransactions}</p>
              <p className="text-xs text-muted-foreground mt-1">transactions</p>
            </div>
            <div className="p-3 rounded-full bg-chart-1/10">
              <Building className="w-6 h-6 text-chart-1" />
            </div>
          </div>
        </Card>
      </div>

      {/* Category Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Expenses by Category (This Month)</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(categoryTotals)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 8)
            .map(([category, amount]) => (
              <div key={category} className="p-3 rounded-lg bg-muted/30">
                <p className="text-sm font-medium text-foreground">{category}</p>
                <p className="text-lg font-semibold text-chart-5">${amount.toLocaleString()}</p>
              </div>
            ))}
        </div>
      </Card>

      {/* Transactions List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Expense Transactions</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search expenses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-foreground">{transaction.vendor}</p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">{transaction.receiptNumber}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{transaction.date}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{transaction.paymentMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-foreground">
                  ${transaction.amount.toLocaleString()}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <Badge 
                    variant="secondary" 
                    className={`${getStatusColor(transaction.status)} border-0 text-xs`}
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}