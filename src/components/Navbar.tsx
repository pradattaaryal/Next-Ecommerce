 
import Link from "next/link";
 
import { ThemeToggle } from "@/components/theme-toggle";
import SignInButton from "@/components/SignInButton";
import { auth } from "@/lib/auth";
import CartIcon from "./ui/CartIcon.tsx";

export default async function Navbar() {
  const session = await auth(); // Ensure async handling

  return (
    <header className="sticky top-0 z-50 w-full flex align-middle justify-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-2 md:max-w-[80%] align-middle flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Store
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/browse" className="text-sm font-medium hover:underline">
            Browse
          </Link>
          <ThemeToggle />
          {!session && <SignInButton />}
            <Link href="/cart" className="text-sm font-medium hover:underline">
            <CartIcon /> {/* Render CartIcon here */}
            </Link>
        </nav>
      </div>
    </header>
  );
}
