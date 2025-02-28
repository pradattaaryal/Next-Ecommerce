"use client"

import { CalendarDays, Download, Eye, Filter, Package2, RefreshCcw, Search, ShoppingCart, Truck } from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function OrdersPage() {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex flex-col gap-5 p-4 md:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Orders</h1>
            <p className="text-sm text-slate-400">Manage and track your orders</p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-white text-black hover:bg-slate-200">
              <Download className="mr-2 h-4 w-4" />
              Export Orders
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className=" border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingCart className="w-4 h-4 " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs ">+49 this week</p>
            </CardContent>
          </Card>
          <Card className=" border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Processing</CardTitle>
              <RefreshCcw className="w-4 h-4 " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">123</div>
              <p className="text-xs ">+8 from yesterday</p>
            </CardContent>
          </Card>
          <Card className=" border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Shipped</CardTitle>
              <Truck className="w-4 h-4 " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82</div>
              <p className="text-xs ">+12 from yesterday</p>
            </CardContent>
          </Card>
          <Card className=" border-slate-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Delivered</CardTitle>
              <Package2 className="w-4 h-4 " />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,029</div>
              <p className="text-xs ">+86 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 md:max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
              <Input
                className="w-full  shadow-none appearance-none pl-8 border-slate-800 placeholder:"
                placeholder="Search orders..."
                type="search"
              />
            </div>
            <Button variant="outline" className="border-slate-800 hover:bg-slate-800">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Select>
              <SelectTrigger className="w-[180px] border-slate-800 ">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className=" border-slate-800">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] border-slate-800 ">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent className=" border-slate-800">
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border rounded-lg border-slate-800">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-800">
                <TableHead className="text-slate-400">Order ID</TableHead>
                <TableHead className="text-slate-400">Customer</TableHead>
                <TableHead className="text-slate-400">Products</TableHead>
                <TableHead className="text-slate-400">Date</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-right text-slate-400">Total</TableHead>
                <TableHead className="text-right text-slate-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} className="border-slate-800">
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <Image
                        src={order.customerAvatar || "/placeholder.svg"}
                        alt={order.customerName}
                        className="rounded-full"
                        width={32}
                        height={32}
                      />
                      <div className="grid gap-0.5">
                        <div className="font-medium">{order.customerName}</div>
                        <div className="text-xs text-slate-400">{order.customerEmail}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-400">{order.products}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-slate-400">
                      <CalendarDays className="h-4 w-4" />
                      {order.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        order.status === "Delivered"
                          ? "bg-green-500/20 text-green-500"
                          : order.status === "Processing"
                            ? "bg-yellow-500/20 text-yellow-500"
                            : order.status === "Shipped"
                              ? "bg-blue-500/20 text-blue-500"
                              : "bg-red-500/20 text-red-500"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-slate-400">${order.total}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className=" border-slate-800">
                        <DropdownMenuLabel className="text-white">Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-slate-800" />
                        <DropdownMenuItem className="text-slate-400 focus:bg-slate-900 focus:text-white">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-400 focus:bg-slate-900 focus:text-white">
                          Update Status
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-slate-400 focus:bg-slate-900 focus:text-white">
                          Contact Customer
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-400">Showing 1 to 10 of 1,234 orders</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-slate-800 hover:bg-slate-800">
              Previous
            </Button>
            <Button variant="outline" className="border-slate-800 hover:bg-slate-800">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

const orders = [
  {
    id: "4532",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "Nike Air Max × 2",
    date: "2024-02-21",
    status: "Delivered",
    total: "470.00",
  },
  {
    id: "4533",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "MacBook Pro",
    date: "2024-02-21",
    status: "Processing",
    total: "1,299.00",
  },
  {
    id: "4534",
    customerName: "Michael Chen",
    customerEmail: "m.chen@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "iPhone 13 Pro, AirPods Pro",
    date: "2024-02-20",
    status: "Shipped",
    total: "1,499.00",
  },
  {
    id: "4535",
    customerName: "Emma Wilson",
    customerEmail: "emma.w@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "Gaming Chair",
    date: "2024-02-20",
    status: "Cancelled",
    total: "299.00",
  },
  {
    id: "4536",
    customerName: "Alex Thompson",
    customerEmail: "alex.t@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "Samsung 4K TV",
    date: "2024-02-20",
    status: "Processing",
    total: "899.00",
  },
  {
    id: "4537",
    customerName: "Lisa Brown",
    customerEmail: "lisa.b@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "iPad Air, Magic Keyboard",
    date: "2024-02-19",
    status: "Delivered",
    total: "1,027.00",
  },
  {
    id: "4538",
    customerName: "David Kim",
    customerEmail: "david.k@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "Wireless Headphones",
    date: "2024-02-19",
    status: "Shipped",
    total: "249.00",
  },
  {
    id: "4539",
    customerName: "Rachel Green",
    customerEmail: "rachel.g@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "Running Shoes, Sports Watch",
    date: "2024-02-19",
    status: "Processing",
    total: "399.00",
  },
  {
    id: "4540",
    customerName: "James Wilson",
    customerEmail: "james.w@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "Coffee Maker",
    date: "2024-02-18",
    status: "Delivered",
    total: "199.00",
  },
  {
    id: "4541",
    customerName: "Sophie Martin",
    customerEmail: "sophie.m@example.com",
    customerAvatar: "/placeholder.svg?height=32&width=32",
    products: "Fitness Tracker",
    date: "2024-02-18",
    status: "Shipped",
    total: "129.00",
  },
]

