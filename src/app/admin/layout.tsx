"use client";

import AdminSidebar from "@/components/adminSidebar"; // Sidebar component
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar (30% width) */}
      <aside className="md:w-[20%] border-r border-black dark:border-white hidden md:block   border-1  ">
        <AdminSidebar />
      </aside>

      {/* Main Content (70% width) */}
      <main className="w-full md:w-[80%]      ">{children}</main>
    </div>
  );
}
