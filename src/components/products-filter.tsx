"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function ProductsFilter() {
  return (
    <Card className="  my-3">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Category</h3>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
              Clear
            </Button>
          </div>
          <div className="space-y-2">
            {["Clothing", "Accessories", "Electronics", "Footwear"].map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox id={category} />
                <Label htmlFor={category} className="text-sm font-normal">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Price Range</h3>
            <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground">
              Clear
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {["Under $50", "$50-$100", "$100-$200", "Over $200"].map((range) => (
              <Badge key={range} variant="secondary" className="cursor-pointer">
                {range}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

