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
  TrendingUp, 
  Plus, 
  Search, 
  DollarSign,
  Receipt,
  Calendar,
  User,
  Filter
} from "lucide-react"

interface SaleTransaction {
  id: string
  date: string
  customer: string
  description: string
  category: string
  amount: number
  status: 'completed' | 'pending' | 'refunded'
  paymentMethod: string
  invoiceNumber: string
}

export function SalesIncome() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [transactions, setTransactions] = useState<SaleTransaction[]>([
    {
      id: '1',
      date: '2025-08-31',
      customer: 'ABC Corporation',
      description: 'Consulting Services - Project Alpha',
      category: 'Consulting',
      amount: 15750.00,
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      invoiceNumber: 'INV-2025-001'
    },
    {
      id: '2',
      date: '2025-08-30',
      customer: 'TechStart LLC',
      description: 'Software Development Services',
      category: 'Development',
      amount: 12500.00,
      status: 'completed',
      paymentMethod: 'Credit Card',
      invoiceNumber: 'INV-2025-002'
    },
    {
      id: '3',
      date: '2025-08-29',
      customer: 'Marketing Pro Inc',
      description: 'Digital Marketing Campaign',
      category: 'Marketing',
      amount: 8750.00,
      status: 'pending',
      paymentMethod: 'Check',
      invoiceNumber: 'INV-2025-003'
    },
    {
      id: '4',
      date: '2025-08-28',
      customer: 'Retail Solutions',
      description: 'E-commerce Setup and Training',
      category: 'Training',
      amount: 5200.00,
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      invoiceNumber: 'INV-2025-004'
    },
    {
      id: '5',
      date: '2025-08-27',
      customer: 'Local Restaurant',
      description: 'POS System Installation',
      category: 'Installation',
      amount: 3400.00,
      status: 'refunded',
      paymentMethod: 'Credit Card',
      invoiceNumber: 'INV-2025-005'
    },
    {
      id: '6',
      date: '2025-08-26',
      customer: 'Design Studio',
      description: 'Website Design and Development',
      category: 'Development',
      amount: 9800.00,
      status: 'completed',
      paymentMethod: 'Bank Transfer',
      invoiceNumber: 'INV-2025-006'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-chart-3/10 text-chart-3'
      case 'pending': return 'bg-chart-4/10 text-chart-4'
      case 'refunded': return 'bg-chart-5/10 text-chart-5'
      default: return 'bg-muted'
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const pendingAmount = transactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const refundedAmount = transactions
    .filter(t => t.status === 'refunded')
    .reduce((sum, t) => sum + t.amount, 0)

  const thisMonthTransactions = transactions.filter(t => 
    new Date(t.date).getMonth() === new Date().getMonth()
  ).length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Sales & Income</h1>
          <p className="text-muted-foreground mt-1">Track your sales transactions and revenue</p>
        </div>
        <div className="flex items-center space-x-3">
          <DateRangePicker />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Sale
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Sale Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="customer">Customer</Label>
                  <Input id="customer" placeholder="e.g. ABC Corporation" />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of the service/product" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="training">Training</SelectItem>
                      <SelectItem value="installation">Installation</SelectItem>
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
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="check">Check</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="invoice">Invoice Number</Label>
                  <Input id="invoice" placeholder="e.g. INV-2025-001" />
                </div>
                <Button className="w-full">Add Sale Transaction</Button>
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
              <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-semibold text-foreground">${totalRevenue.toLocaleString()}</p>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="w-4 h-4 text-chart-3" />
                <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-0">
                  +12.5%
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
              <p className="text-sm font-medium text-muted-foreground">Pending Amount</p>
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
              <p className="text-sm font-medium text-muted-foreground">Refunded</p>
              <p className="text-2xl font-semibold text-foreground">${refundedAmount.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-5/10">
              <Receipt className="w-6 h-6 text-chart-5" />
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
              <User className="w-6 h-6 text-chart-1" />
            </div>
          </div>
        </Card>
      </div>

      {/* Transactions List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Sales Transactions</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search transactions..."
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
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="refunded">Refunded</SelectItem>
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
                    <p className="font-medium text-foreground">{transaction.customer}</p>
                    <p className="text-sm text-muted-foreground">{transaction.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-muted-foreground">{transaction.invoiceNumber}</span>
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