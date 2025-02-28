"use client";

import { Bell,  LineChart, Package, Package2, Search,   ShoppingCart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen   ">
      <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b   dark:border-white border-black px-6">
        <Link className="lg:hidden" href="#">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Home</span>
        </Link>
        <div className="w-full flex-1">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 " />
              <Input
                className="w-full shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 border-slate-800  placeholder:"
                placeholder="Search products..."
                type="search"
              />
            </div>
          </form>
        </div>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-full border border-slate-800 w-8 h-8" size="icon" variant="ghost">
              <Image
                alt="Avatar"
                className="rounded-full"
                height="32"
                src="/placeholder.svg?height=32&width=32"
                width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-slate-800">
            <DropdownMenuLabel className="">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="focus:bg-slate-900 ">Settings</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-slate-900 ">Support</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-800" />
            <DropdownMenuItem className="focus:bg-slate-900 ">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["Total Revenue", "Orders", "Products", "Active Users"].map((title, index) => (
            <Card key={index} className="border-slate-800">
           <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
  <CardTitle className="text-sm font-medium ">{title}</CardTitle>
  {[<LineChart key="line-chart" />, <ShoppingCart key="shopping-cart" />, <Package key="package" />, <Users key="users" />][index]}
</CardHeader>
              <CardContent>
                <div className="text-2xl font-bold ">+{["$45,231.89", "2350", "12,234", "573"][index]}</div>
                <p className="text-xs ">+{["20.1%", "180.1%", "19%", "201 since last hour"][index]} from last month</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-slate-800">
          <CardHeader>
            <CardTitle className="">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-800">
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  ["#4532", "John Doe", "Nike Air Max", "Delivered", "$235.00"],
                  ["#4531", "Jane Smith", "MacBook Pro", "Processing", "$1,299.00"],
                  ["#4530", "Mike Johnson", "iPhone 13", "Shipped", "$999.00"],
                  ["#4529", "Sarah Wilson", "AirPods Pro", "Cancelled", "$249.00"],
                ].map(([order, customer, product, status, amount], index) => (
                  <TableRow key={index} className="border-slate-800">
                    <TableCell className="font-medium ">{order}</TableCell>
                    <TableCell>{customer}</TableCell>
                    <TableCell>{product}</TableCell>
                    <TableCell>
                      <Badge className={`bg-${status === "Delivered" ? "green" : status === "Processing" ? "yellow" : status === "Shipped" ? "blue" : "red"}-500/20 text-${status.toLowerCase()}-500`}>{status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
