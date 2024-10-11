"use client";
import { Button } from "@/components/ui/button";
import { useLocalStorage } from "@/hooks";
import Link from "next/link";

export default function Home() {
  const [storedValue] = useLocalStorage("cred", { email: "none" });

  return (
    <div className="min-h-screen flex-col h-full w-full flex justify-center items-center">
      <div className="fixed top-1 right-1">{storedValue?.email}</div>
      HOME
      <Link href={"/auth"}>
        <Button>Go to Auth</Button>
      </Link>
    </div>
  );
}
