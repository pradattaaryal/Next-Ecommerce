// app/cart/layout.tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function CartLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session) {
    redirect("/sign-in"); // Redirects if not authenticated
  }

  return <>{children}</>;
}
