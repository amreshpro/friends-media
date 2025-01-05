import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold mb-6">Welcome to Friend Finder</h1>
      <div className="space-x-4">
        <Link href="/auth/login">
          <Button variant="default">Login</Button>
        </Link>
        <Link href="/auth/signup">
          <Button variant="outline">Sign Up</Button>
        </Link>
      </div>
    </main>
  );
}
