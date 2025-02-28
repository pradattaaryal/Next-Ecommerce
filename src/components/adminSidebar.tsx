"use Client"
import {  Home, LineChart, Package, Package2, Settings, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"

 
const adminSidebar = () => {
  return (
    <div className="flex h-full min-h-screen flex-col gap-2">
    <div className="flex h-[60px]  align-middle items-center border-b border-black  dark:border-white px-8">
      <Link className="flex items-center gap-2 font-semibold" href="#">
        <Package2 className="h-4 w-6" />
        <span>Admin Panel</span>
      </Link>
    </div>
    <div className="flex-1    flex flex-col  overflow-auto py-2">
      <nav className="grid items-start px-4 text-sm font-medium">
        <Link
          className="flex items-center gap-3 rounded-lg   px-3 py-2    transition-all hover:"
          href="/admin"
        >
          <Home className="h-4 w-4" />
          Dashboard
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg   px-3 py-2    transition-all hover:"
          href="/admin/orders"
        >
          <ShoppingCart className="h-4 w-4" />
          Orders
          
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg   px-3 py-2    transition-all hover:"
          href="/admin/product"
        >
          <Package className="h-4 w-4" />
          Products
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg   px-3 py-2    transition-all hover:"
          href="#"
        >
          <Users className="h-4 w-4" />
          Customers
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg   px-3 py-2    transition-all hover:"
          href="#"
        >
          <LineChart className="h-4 w-4" />
          Analytics
        </Link>
        <Link
          className="flex items-center gap-3 rounded-lg   px-3 py-2    transition-all hover:"
          href="#"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </div>
  </div>
  )
}

export default adminSidebar