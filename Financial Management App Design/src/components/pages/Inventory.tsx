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
  Package, 
  Plus, 
  Search, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Minus
} from "lucide-react"

interface InventoryItem {
  id: string
  name: string
  sku: string
  category: string
  quantity: number
  minStock: number
  unitPrice: number
  totalValue: number
  supplier: string
  lastUpdated: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

export function Inventory() {
  const [searchTerm, setSearchTerm] = useState('')
  const [items, setItems] = useState<InventoryItem[]>([
    {
      id: '1',
      name: 'Office Printer Paper A4',
      sku: 'OFF-PP-A4-001',
      category: 'Office Supplies',
      quantity: 245,
      minStock: 50,
      unitPrice: 8.99,
      totalValue: 2202.55,
      supplier: 'Office Depot',
      lastUpdated: '2025-08-30',
      status: 'in-stock'
    },
    {
      id: '2',
      name: 'Wireless Computer Mouse',
      sku: 'TECH-MS-WL-002',
      category: 'Technology',
      quantity: 15,
      minStock: 20,
      unitPrice: 25.99,
      totalValue: 389.85,
      supplier: 'Tech Solutions',
      lastUpdated: '2025-08-29',
      status: 'low-stock'
    },
    {
      id: '3',
      name: 'Blue Ink Pens (Pack of 12)',
      sku: 'OFF-PN-BL-003',
      category: 'Office Supplies',
      quantity: 0,
      minStock: 25,
      unitPrice: 12.50,
      totalValue: 0,
      supplier: 'Staples',
      lastUpdated: '2025-08-28',
      status: 'out-of-stock'
    },
    {
      id: '4',
      name: 'Desk Lamp LED',
      sku: 'FUR-LMP-LED-004',
      category: 'Furniture',
      quantity: 8,
      minStock: 5,
      unitPrice: 45.99,
      totalValue: 367.92,
      supplier: 'Furniture Plus',
      lastUpdated: '2025-08-27',
      status: 'in-stock'
    },
    {
      id: '5',
      name: 'Coffee Filters (100 pack)',
      sku: 'KIT-CF-100-005',
      category: 'Kitchen',
      quantity: 32,
      minStock: 15,
      unitPrice: 6.99,
      totalValue: 223.68,
      supplier: 'Kitchen Supplies Co',
      lastUpdated: '2025-08-31',
      status: 'in-stock'
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock': return 'bg-chart-3/10 text-chart-3'
      case 'low-stock': return 'bg-chart-4/10 text-chart-4'
      case 'out-of-stock': return 'bg-chart-5/10 text-chart-5'
      default: return 'bg-muted'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock': return CheckCircle
      case 'low-stock': return AlertTriangle
      case 'out-of-stock': return XCircle
      default: return Package
    }
  }

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0)
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const lowStockCount = items.filter(item => item.status === 'low-stock').length
  const outOfStockCount = items.filter(item => item.status === 'out-of-stock').length

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Inventory Management</h1>
          <p className="text-muted-foreground mt-1">Track and manage your inventory items</p>
        </div>
        <div className="flex items-center space-x-3">
          <DateRangePicker />
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Inventory Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input id="item-name" placeholder="e.g. Office Paper A4" />
                </div>
                <div>
                  <Label htmlFor="sku">SKU</Label>
                  <Input id="sku" placeholder="e.g. OFF-PP-A4-001" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office-supplies">Office Supplies</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="kitchen">Kitchen</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input id="quantity" type="number" placeholder="0" />
                  </div>
                  <div>
                    <Label htmlFor="min-stock">Min Stock</Label>
                    <Input id="min-stock" type="number" placeholder="0" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="unit-price">Unit Price</Label>
                  <Input id="unit-price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="supplier">Supplier</Label>
                  <Input id="supplier" placeholder="e.g. Office Depot" />
                </div>
                <Button className="w-full">Add Item</Button>
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
              <p className="text-sm font-medium text-muted-foreground">Total Items</p>
              <p className="text-2xl font-semibold text-foreground">{totalItems.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-1/10">
              <Package className="w-6 h-6 text-chart-1" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Value</p>
              <p className="text-2xl font-semibold text-foreground">${totalValue.toLocaleString()}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-3/10">
              <TrendingUp className="w-6 h-6 text-chart-3" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-semibold text-foreground">{lowStockCount}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-4/10">
              <AlertTriangle className="w-6 h-6 text-chart-4" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Out of Stock</p>
              <p className="text-2xl font-semibold text-foreground">{outOfStockCount}</p>
            </div>
            <div className="p-3 rounded-full bg-chart-5/10">
              <XCircle className="w-6 h-6 text-chart-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search items by name, SKU, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Items</SelectItem>
              <SelectItem value="in-stock">In Stock</SelectItem>
              <SelectItem value="low-stock">Low Stock</SelectItem>
              <SelectItem value="out-of-stock">Out of Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Items List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const StatusIcon = getStatusIcon(item.status)
            return (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${getStatusColor(item.status)}`}>
                    <StatusIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.sku} • {item.category} • {item.supplier}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{item.quantity}</p>
                    <p className="text-xs text-muted-foreground">In Stock</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">${item.unitPrice}</p>
                    <p className="text-xs text-muted-foreground">Unit Price</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">${item.totalValue.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Value</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Minus className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Plus className="w-3 h-3" />
                    </Button>
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