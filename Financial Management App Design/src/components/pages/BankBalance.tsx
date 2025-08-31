import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { DateRangePicker } from "../DateRangePicker"
import { 
  Building2, 
  Plus, 
  Eye, 
  EyeOff, 
  CreditCard, 
  PiggyBank, 
  Wallet,
  TrendingUp,
  TrendingDown
} from "lucide-react"

interface BankAccount {
  id: string
  name: string
  type: 'checking' | 'savings' | 'credit' | 'investment'
  balance: number
  accountNumber: string
  status: 'active' | 'inactive' | 'frozen'
  currency: string
  lastTransaction: string
}

export function BankBalance() {
  const [showBalances, setShowBalances] = useState(true)
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      name: 'Primary Checking',
      type: 'checking',
      balance: 125430.50,
      accountNumber: '****1234',
      status: 'active',
      currency: 'USD',
      lastTransaction: '2025-08-30'
    },
    {
      id: '2',
      name: 'Business Savings',
      type: 'savings',
      balance: 89720.25,
      accountNumber: '****5678',
      status: 'active',
      currency: 'USD',
      lastTransaction: '2025-08-29'
    },
    {
      id: '3',
      name: 'Business Credit Card',
      type: 'credit',
      balance: -12450.75,
      accountNumber: '****9012',
      status: 'active',
      currency: 'USD',
      lastTransaction: '2025-08-31'
    },
    {
      id: '4',
      name: 'Investment Account',
      type: 'investment',
      balance: 234890.00,
      accountNumber: '****3456',
      status: 'active',
      currency: 'USD',
      lastTransaction: '2025-08-28'
    }
  ])

  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking': return CreditCard
      case 'savings': return PiggyBank
      case 'credit': return CreditCard
      case 'investment': return TrendingUp
      default: return Wallet
    }
  }

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'checking': return 'text-chart-2'
      case 'savings': return 'text-chart-3'
      case 'credit': return 'text-chart-5'
      case 'investment': return 'text-chart-4'
      default: return 'text-chart-1'
    }
  }

  const totalBalance = accounts
    .filter(acc => acc.type !== 'credit')
    .reduce((sum, acc) => sum + acc.balance, 0)

  const creditBalance = accounts
    .filter(acc => acc.type === 'credit')
    .reduce((sum, acc) => sum + Math.abs(acc.balance), 0)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Bank Balance</h1>
          <p className="text-muted-foreground mt-1">Manage your bank accounts and balances</p>
        </div>
        <div className="flex items-center space-x-3">
          <DateRangePicker />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBalances(!showBalances)}
          >
            {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showBalances ? 'Hide' : 'Show'} Balances
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Bank Account</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input id="account-name" placeholder="e.g. Primary Checking" />
                </div>
                <div>
                  <Label htmlFor="account-type">Account Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Checking</SelectItem>
                      <SelectItem value="savings">Savings</SelectItem>
                      <SelectItem value="credit">Credit Card</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="balance">Initial Balance</Label>
                  <Input id="balance" type="number" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="account-number">Account Number (Last 4 digits)</Label>
                  <Input id="account-number" placeholder="1234" maxLength={4} />
                </div>
                <Button className="w-full">Add Account</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Assets</p>
              <p className="text-2xl font-semibold text-foreground">
                {showBalances ? `$${totalBalance.toLocaleString()}` : '••••••'}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="w-4 h-4 text-chart-3" />
                <Badge variant="secondary" className="bg-chart-3/10 text-chart-3 border-0">
                  +5.2%
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-full bg-chart-3/10">
              <Building2 className="w-6 h-6 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Credit Used</p>
              <p className="text-2xl font-semibold text-foreground">
                {showBalances ? `$${creditBalance.toLocaleString()}` : '••••••'}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingDown className="w-4 h-4 text-chart-5" />
                <Badge variant="secondary" className="bg-chart-5/10 text-chart-5 border-0">
                  -2.1%
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-full bg-chart-5/10">
              <CreditCard className="w-6 h-6 text-chart-5" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Net Worth</p>
              <p className="text-2xl font-semibold text-foreground">
                {showBalances ? `$${(totalBalance - creditBalance).toLocaleString()}` : '••••••'}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <TrendingUp className="w-4 h-4 text-chart-4" />
                <Badge variant="secondary" className="bg-chart-4/10 text-chart-4 border-0">
                  +7.8%
                </Badge>
              </div>
            </div>
            <div className="p-3 rounded-full bg-chart-4/10">
              <PiggyBank className="w-6 h-6 text-chart-4" />
            </div>
          </div>
        </Card>
      </div>

      {/* Accounts List */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Bank Accounts</h3>
        <div className="space-y-4">
          {accounts.map((account) => {
            const Icon = getAccountIcon(account.type)
            return (
              <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full bg-muted ${getAccountTypeColor(account.type)}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{account.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {account.accountNumber} • {account.type} • Last transaction: {account.lastTransaction}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${account.type === 'credit' ? 'text-chart-5' : 'text-foreground'}`}>
                    {showBalances 
                      ? `${account.balance >= 0 ? '' : '-'}$${Math.abs(account.balance).toLocaleString()}` 
                      : '••••••'
                    }
                  </p>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant="secondary" 
                      className={`${account.status === 'active' ? 'bg-chart-3/10 text-chart-3' : 'bg-chart-5/10 text-chart-5'} border-0 text-xs`}
                    >
                      {account.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {account.currency}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}