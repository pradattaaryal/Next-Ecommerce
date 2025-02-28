import { ArrowRight, ShoppingBag, Truck, Shield } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
  import f from "@/images/f.jpg";
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section
        className="relative flex   items-center justify-center bg-muted"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <div
          className="absolute inset-0     bg-cover bg-center  "
          style={{
            backgroundImage: `url(${f.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="container relative space-y-4 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white dark:text-white ">
            Discover Amazing Products
          </h1>
          <p className="mx-auto max-w-[600px] text-white dark:text-white md:text-xl">
            Shop our curated collection of premium products. Quality meets
            affordability.
          </p>
          <Button asChild size="lg" className="mt-4 ">
            <Link href="/browse">
              Shop Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16   mx-auto">
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Easy Shopping</h3>
              <p className="text-sm text-muted-foreground">
                Browse and purchase with just a few clicks
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Truck className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Get your products delivered within 2-3 business days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-6 text-center">
              <Shield className="mb-4 h-12 w-12 text-primary" />
              <h3 className="mb-2 text-lg font-semibold">Secure Shopping</h3>
              <p className="text-sm text-muted-foreground">
                Your transactions are protected with top-notch security
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Products Section
      <section className="w-full py-12 md:py-24 lg:py-32 ">
        <Feature />
      </section> */}
    </div>
  );
}
