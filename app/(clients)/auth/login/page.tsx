"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { loginUser } from "../../utils/api";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await loginUser({ email, password });
    
    if (success) router.push("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
      method="post"
        onSubmit={handleSubmit}
        className="p-6  rounded shadow-md max-w-sm w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant={"outline"}>Login</Button>
        <div className="mt-2">Create an account <Link href={"/auth/signup"} className="text-blue-600 underline"> Signup</Link></div>

      </form>
    </div>
  );
}
