import { useState } from "react"
import { Card } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Switch } from "../ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { 
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Download,
  Upload,
  RefreshCw
} from "lucide-react"

export function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    lowStock: true,
    paymentReminders: true,
    monthlyReports: true
  })

  const [preferences, setPreferences] = useState({
    currency: 'USD',
    dateFormat: 'MM/dd/yyyy',
    timezone: 'America/New_York',
    language: 'English',
    fiscalYearStart: 'January'
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your application preferences and configuration</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <RefreshCw className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5 bg-muted/50">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <User className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Profile Information</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="FinanceCheck Inc." />
                </div>
                <div>
                  <Label htmlFor="admin-name">Administrator Name</Label>
                  <Input id="admin-name" defaultValue="John Smith" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" defaultValue="admin@financecheck.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue="+1 (555) 123-4567" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Regional Preferences</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select value={preferences.currency} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, currency: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">US Dollar (USD)</SelectItem>
                      <SelectItem value="EUR">Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                      <SelectItem value="CAD">Canadian Dollar (CAD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date-format">Date Format</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, dateFormat: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/dd/yyyy">MM/dd/yyyy</SelectItem>
                      <SelectItem value="dd/MM/yyyy">dd/MM/yyyy</SelectItem>
                      <SelectItem value="yyyy-MM-dd">yyyy-MM-dd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select value={preferences.timezone} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, timezone: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time</SelectItem>
                      <SelectItem value="America/Chicago">Central Time</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                      <SelectItem value="UTC">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fiscal-year">Fiscal Year Start</Label>
                  <Select value={preferences.fiscalYearStart} onValueChange={(value) => 
                    setPreferences(prev => ({ ...prev, fiscalYearStart: value }))
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="January">January</SelectItem>
                      <SelectItem value="April">April</SelectItem>
                      <SelectItem value="July">July</SelectItem>
                      <SelectItem value="October">October</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Bell className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Notification Preferences</h3>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch 
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive browser push notifications</p>
                </div>
                <Switch 
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when inventory is running low</p>
                </div>
                <Switch 
                  checked={notifications.lowStock}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, lowStock: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Payment Reminders</p>
                  <p className="text-sm text-muted-foreground">Reminders for overdue payments and bills</p>
                </div>
                <Switch 
                  checked={notifications.paymentReminders}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, paymentReminders: checked }))
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Monthly Reports</p>
                  <p className="text-sm text-muted-foreground">Automated monthly financial reports</p>
                </div>
                <Switch 
                  checked={notifications.monthlyReports}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, monthlyReports: checked }))
                  }
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Security Settings</h3>
            </div>
            <div className="space-y-6">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" placeholder="Enter current password" />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" placeholder="Enter new password" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" placeholder="Confirm new password" />
              </div>
              <Button variant="outline" className="w-full">
                Update Password
              </Button>
              
              <div className="pt-4 border-t border-border/30">
                <h4 className="font-medium text-foreground mb-3">Two-Factor Authentication</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-foreground">Enable 2FA</p>
                    <p className="text-xs text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Badge variant="outline" className="text-chart-5">
                    Disabled
                  </Badge>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Enable 2FA
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Palette className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Appearance Settings</h3>
            </div>
            <div className="space-y-6">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <Select defaultValue="light">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light Mode</SelectItem>
                    <SelectItem value="dark">Dark Mode</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="accent-color">Accent Color</Label>
                <Select defaultValue="purple">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="density">Interface Density</Label>
                <Select defaultValue="comfortable">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">Comfortable</SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="data" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Upload className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Data Import</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Import data from CSV files or other financial systems
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Import Bank Transactions
                  </Button>
                  <Button variant="outline" className="w-full">
                    Import Inventory Data
                  </Button>
                  <Button variant="outline" className="w-full">
                    Import Customer Data
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Download className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Data Export</h3>
              </div>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Export your financial data for backup or migration
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Export All Data (JSON)
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export Financial Reports (PDF)
                  </Button>
                  <Button variant="outline" className="w-full">
                    Export Transaction History (CSV)
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-chart-5">Danger Zone</h3>
            <div className="space-y-4">
              <div className="p-4 border border-chart-5/30 rounded-lg bg-chart-5/5">
                <h4 className="font-medium text-chart-5 mb-2">Reset All Data</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  This will permanently delete all your financial data. This action cannot be undone.
                </p>
                <Button variant="destructive" size="sm">
                  Reset All Data
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}