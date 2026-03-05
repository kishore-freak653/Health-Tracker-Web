"use client";

import ActivityForm from "@/components/ActivityForm";
import ActivityList from "@/components/ActivityList";
import SummaryCard from "@/components/SummaryCard";



export default function Dashboard() {
  return (
   
      <div className="min-h-screen bg-[#f6f9f6]">
      

        {/* Hero Header */}
        <div className="bg-gradient-to-r from-[#3aac6e] to-[#4caf7d] text-white">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <p className="text-sm opacity-80">Good day 👋</p>

            <h1 className="text-3xl font-bold mt-1">Your Dashboard</h1>

            <p className="text-sm opacity-80 mt-1">
              Track, log and review your daily wellness
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
          {/* Summary Cards */}
          <SummaryCard />

          {/* Grid Layout */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Activity Form */}
            <ActivityForm />

            {/* Activity History */}
            <ActivityList />
          </div>
        </div>
      </div>
   
  );
}
