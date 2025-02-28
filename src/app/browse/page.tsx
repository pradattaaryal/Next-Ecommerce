import { Suspense } from "react"

import ProductGrid from "@/components/product-grid"
import ProductsFilter from "@/components/products-filter"

export default function BrowsePage() {
  return (
    <div className="max-w-[90%] mx-auto max-h-screen ">
       <div className="grid gap-8 md:grid-cols-[240px_1fr]">
        <ProductsFilter />
        <main>
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </main>
      </div>
    </div>
  )
}

