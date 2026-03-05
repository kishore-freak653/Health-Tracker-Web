"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Droplets, Footprints, Flame, Sparkles } from "lucide-react";

export default function SummaryCard() {
  const [water, setWater] = useState(0);
  const [steps, setSteps] = useState(0);
  const [calories, setCalories] = useState(0);
  const [suggestion, setSuggestion] = useState("");
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const getSuggestion = async (
    water: number,
    steps: number,
    calories: number,
  ) => {
    setLoadingSuggestion(true);
    try {
      const res = await fetch("/api/suggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ water, steps, calories }),
      });
      const data = await res.json();
      setSuggestion(data.suggestion);
    } catch (error) {
      console.log(error);
      setSuggestion("Could not load suggestion right now.");
    } finally {
      setLoadingSuggestion(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) return;

      const fetchTodaySummary = async () => {
        const today = new Date().toISOString().slice(0, 10);
        const q = query(
          collection(db, "activities"),
          where("userId", "==", user.uid),
          where("date", "==", today),
        );
        const snapshot = await getDocs(q);

        let totalWater = 0,
          totalSteps = 0,
          totalCalories = 0;
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          totalWater += data.water;
          totalSteps += data.steps;
          totalCalories += data.calories;
        });

        setWater(totalWater);
        setSteps(totalSteps);
        setCalories(totalCalories);

        // ✅ Pass local vars directly, not state
        await getSuggestion(totalWater, totalSteps, totalCalories);
      };

      fetchTodaySummary();
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white border border-[#e8efe8] rounded-2xl shadow-sm p-6 max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-black">Today's Summary</h2>

      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2 text-[#4caf7d]">
          <Droplets size={16} />
          {water} L
        </div>

        <div className="flex items-center gap-2 text-[#3aac6e]">
          <Footprints size={16} />
          {steps} steps
        </div>

        <div className="flex items-center gap-2 text-[#e85c8a]">
          <Flame size={16} />
          {calories} kcal
        </div>
      </div>

      <div className="bg-[#f0faf4] border border-[#d4edda] rounded-xl p-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={15} className="text-[#3aac6e]" />
          <h3 className="font-semibold text-sm text-[#1a2e1a]">
            AI Health Suggestion
          </h3>
        </div>

        {loadingSuggestion ? (
          <p className="text-sm text-[#7a917a] animate-pulse">
            Generating suggestion...
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            {suggestion || "No suggestion yet."}
          </p>
        )}
      </div>
    </div>
  );
}
