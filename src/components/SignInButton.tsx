"use client"; // Required for client-side navigation

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const SignInButton = () => {
  const router = useRouter(); // Initialize router

  return (
    <Button onClick={() => router.push("/sign-in")}>
      Sign In
    </Button>
  );
};

export default SignInButton;
