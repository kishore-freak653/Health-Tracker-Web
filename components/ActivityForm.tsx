"use client";

import { auth, db } from "@/firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { Save, Droplets, Footprints, Flame } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { z } from "zod";


const activitySchema = z.object({
  water: z.coerce
    .number()
    .positive("Must be greater than 0")
    .max(20, "Max 20L"),
  steps: z.coerce
    .number()
    .int()
    .positive("Must be greater than 0")
    .max(100000, "Max 100,000 steps"),
  calories: z.coerce
    .number()
    .positive("Must be greater than 0")
    .max(10000, "Max 10,000 kcal"),
});

type ActivityErrors = Partial<
  Record<keyof z.infer<typeof activitySchema>, string>
>;

export default function ActivityForm() {
  const [water, setWater] = useState("");
  const [steps, setSteps] = useState("");
  const [calories, setCalories] = useState("");
  const [errors, setErrors] = useState<ActivityErrors>({});
  const [loading, setLoading] = useState(false);
  

  

  const handleSubmit = async () => {
    const result = activitySchema.safeParse({ water, steps, calories });

    if (!result.success) {
      const fieldErrors: ActivityErrors = {};
      result.error.issues.forEach((err: any) => {
        const field = err.path[0] as keyof ActivityErrors;
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const user = auth.currentUser;
    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "activities"), {
        userId: user.uid,
        water: result.data.water,
        steps: result.data.steps,
        calories: result.data.calories,
        date: new Date().toISOString().slice(0, 10),
      });
      toast.success("Activity saved!");
      setWater("");
      setSteps("");
      setCalories("");
      // Refresh the activity list to show the newly added activity
   
    } catch (error) {
      console.log(error);
      toast.error("Failed to save activity");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (field: keyof ActivityErrors) =>
    `w-full pl-10 pr-3.5 py-2.5 border rounded-xl text-sm text-[#1a2e1a] placeholder-[#b8c8b8] outline-none focus:ring-2 transition bg-white ${
      errors[field]
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-[#e0e8e0] focus:border-[#4caf7d] focus:ring-[#4caf7d]/20"
    }`;

  return (
    <div className="bg-white rounded-2xl border border-[#e8efe8] shadow-md px-8 pt-8 pb-7 w-full max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-1">
        <div className="w-8 h-8 rounded-lg bg-[#f0faf4] flex items-center justify-center text-[#3aac6e]">
          <Save size={16} strokeWidth={2.2} />
        </div>
        <h2 className="text-lg font-bold text-[#1a2e1a]">Log Activity</h2>
      </div>
      <p className="text-sm text-[#8a9e8a] mb-7 ml-[42px]">
        Record today's health metrics
      </p>

      {/* Water */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#2d3d2d] mb-1.5">
          Water Intake
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4caf7d]">
            <Droplets size={16} strokeWidth={2} />
          </div>
          <input
            type="number"
            placeholder="e.g. 2.5"
            value={water}
            onChange={(e) => setWater(e.target.value)}
            className={inputClass("water")}
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#aabcaa] font-medium">
            L
          </span>
        </div>
        {errors.water && (
          <p className="text-red-500 text-xs mt-1">{errors.water}</p>
        )}
      </div>

      {/* Steps */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-[#2d3d2d] mb-1.5">
          Steps Walked
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3aac6e]">
            <Footprints size={16} strokeWidth={2} />
          </div>
          <input
            type="number"
            placeholder="e.g. 8000"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={inputClass("steps")}
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#aabcaa] font-medium">
            steps
          </span>
        </div>
        {errors.steps && (
          <p className="text-red-500 text-xs mt-1">{errors.steps}</p>
        )}
      </div>

      {/* Calories */}
      <div className="mb-7">
        <label className="block text-sm font-medium text-[#2d3d2d] mb-1.5 ">
          Calories Burned
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e85c8a]">
            <Flame size={16} strokeWidth={2} />
          </div>
          <input
            type="number"
            placeholder="e.g. 500"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            className={inputClass("calories")}
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[#aabcaa] font-medium">
            kcal
          </span>
        </div>
        {errors.calories && (
          <p className="text-red-500 text-xs mt-1">{errors.calories}</p>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-[#3aac6e] hover:bg-[#2d9960] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl text-sm transition flex items-center justify-center gap-2"
      >
        <Save size={16} strokeWidth={2.2} />
        {loading ? "Saving..." : "Save Activity"}
      </button>
    </div>
  );
}
