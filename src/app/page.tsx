import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex-col h-full w-full flex justify-center items-center">
      HOME
      <Link href={"/auth"}>
        <Button>Go to Auth</Button>
      </Link>
    </div>
  );
}
