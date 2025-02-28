import type React from "react";
import { RenderMounted } from "@/components/ClientRender";
import { Providers } from "@/components/providers";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Modern E-commerce",
  description: "A modern e-commerce website built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scrollbar-none overflow-y-auto scroll-smooth">
        <RenderMounted>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </RenderMounted>
      </body>
    </html>
  );
}
