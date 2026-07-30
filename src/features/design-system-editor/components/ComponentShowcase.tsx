/**
 * Kitchen-sink component showcase for the design system editor preview.
 * Renders a variety of shadcn/ui components that respond to CSS variables.
 * Purely presentational — no props needed.
 */

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Check, Mail, Settings } from 'lucide-react'

export function ComponentShowcase() {
  return (
    <div className="p-6 space-y-8 max-w-2xl mx-auto">
      {/* Typography */}
      <section className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Typography</h2>
        <p className="text-muted-foreground">
          The quick brown fox jumps over the lazy dog. This text uses the body
          font and muted foreground color.
        </p>
        <p className="text-sm text-muted-foreground">
          Small text for secondary information and descriptions.
        </p>
      </section>

      <Separator />

      {/* Buttons */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Buttons</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <Separator />

      {/* Cards */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Cards</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-muted-foreground truncate">
                    Hey, check out the new design...
                  </p>
                </div>
                <Badge variant="secondary">New</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Alex Smith</p>
                  <p className="text-xs text-muted-foreground truncate">
                    The build passed successfully
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                <Mail className="w-4 h-4" />
                View all messages
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your preferences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push notifications</Label>
                  <p className="text-xs text-muted-foreground">
                    Receive alerts on your device
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email digest</Label>
                  <p className="text-xs text-muted-foreground">
                    Weekly summary of activity
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Form Elements */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Form Elements</h3>
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" placeholder="Tell us about yourself..." />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" className="text-sm">
                I agree to the terms and conditions
              </Label>
            </div>
            <div className="flex gap-3">
              <Button>Save changes</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <Separator />

      {/* Badges */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Badges</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </section>

      <Separator />

      {/* Tabs */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Tabs</h3>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-3">
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  This is the overview tab content. It demonstrates how tabs
                  look with the current design tokens applied.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <Separator />

      {/* Table */}
      <section className="space-y-3">
        <h3 className="text-lg font-semibold">Table</h3>
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">JD</AvatarFallback>
                    </Avatar>
                    Jane Doe
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    <Check className="w-3 h-3" />
                    Active
                  </Badge>
                </TableCell>
                <TableCell>Admin</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">AS</AvatarFallback>
                    </Avatar>
                    Alex Smith
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">Pending</Badge>
                </TableCell>
                <TableCell>Editor</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="text-xs">MJ</AvatarFallback>
                    </Avatar>
                    Maria Johnson
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="destructive">Inactive</Badge>
                </TableCell>
                <TableCell>Viewer</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon-sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Card>
      </section>

      {/* Bottom spacer */}
      <div className="h-4" />
    </div>
  )
}
