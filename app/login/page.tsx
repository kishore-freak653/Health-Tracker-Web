"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/firebase/config";
import { Activity, Heart } from "lucide-react";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Welcome Logged in");
      console.log(email,password);

      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f9f6] flex flex-col items-center justify-center px-6 py-10 font-sans">
      {/* Header */}
      <div className="text-center mb-7">
        <div className="flex justify-center gap-2.5 mb-3.5">
          <div className="w-10 h-10 rounded-full border border-[#e2e8e2] bg-white flex items-center justify-center text-[#4caf7d] shadow-sm">
            <Activity size={18} strokeWidth={2.2} />
          </div>
          <div className="w-10 h-10 rounded-full border border-[#e2e8e2] bg-white flex items-center justify-center text-[#e85c8a] shadow-sm">
            <Heart size={18} strokeWidth={2.2} />
          </div>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[#1a2e1a]">
          Health Tracker
        </h1>
        <p className="text-sm text-[#7a917a] mt-1.5">
          Track your daily wellness journey
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-[#e8efe8] shadow-md px-9 pt-9 pb-8 w-full max-w-md">
        <h2 className="text-xl font-bold text-[#1a2e1a]">Welcome back</h2>
        <p className="text-sm text-[#8a9e8a] mt-1 mb-7">
          Log in to view your health data
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#2d3d2d] mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-[#e0e8e0] rounded-xl text-sm text-[#1a2e1a] placeholder-[#b8c8b8] outline-none focus:border-[#4caf7d] focus:ring-2 focus:ring-[#4caf7d]/20 transition"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-[#2d3d2d] mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3.5 py-2.5 border border-[#e0e8e0] rounded-xl text-sm text-[#1a2e1a] placeholder-[#b8c8b8] outline-none focus:border-[#4caf7d] focus:ring-2 focus:ring-[#4caf7d]/20 transition"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleLogin}
          className="w-full py-3 bg-[#3aac6e] hover:bg-[#2d9960] active:scale-[0.98] text-white font-semibold rounded-xl text-base transition mb-5"
        >
          Log in
        </button>

        <p className="text-center text-sm text-[#7a917a]">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-[#3aac6e] font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
