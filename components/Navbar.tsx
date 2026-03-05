"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { Activity, Heart, LogOut } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-3.5 border-b border-[#e8efe8] bg-white">
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5">
          <Activity size={16} className="text-[#4caf7d]" strokeWidth={2.2} />
          <Heart size={16} className="text-[#e85c8a]" strokeWidth={2.2} />
        </div>
        <span className="font-bold text-[#1a2e1a] tracking-tight">
          Health Tracker
        </span>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 text-sm text-[#7a917a] hover:text-red-500 transition font-medium"
      >
        <LogOut size={15} strokeWidth={2.2} />
        Logout
      </button>
    </nav>
  );
}
