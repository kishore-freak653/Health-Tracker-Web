"use client";

import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Droplets, Footprints, Flame, Pencil, Save, X } from "lucide-react";
import { toast } from "react-toastify";

interface Activity {
  id: string;
  water: number;
  steps: number;
  calories: number;
  date: string;
}

export default function ActivityCard({ activity }: { activity: Activity }) {
  const [editing, setEditing] = useState(false);

  const [water, setWater] = useState(activity.water);
  const [steps, setSteps] = useState(activity.steps);
  const [calories, setCalories] = useState(activity.calories);

  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      await updateDoc(doc(db, "activities", activity.id), {
        water: Number(water),
        steps: Number(steps),
        calories: Number(calories),
      });

      toast.success("Activity updated");

      setEditing(false);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black border border-[#e8efe8] rounded-xl p-5 shadow-sm">
      {/* Date */}
      <p className="text-sm text-[#7a917a] mb-3">{activity.date}</p>

      {!editing ? (
        <div className="flex justify-between items-center">
          {/* Water */}
          <div className="flex items-center gap-2 text-[#4caf7d]">
            <Droplets size={16} />
            {water} L
          </div>

          {/* Steps */}
          <div className="flex items-center gap-2 text-[#3aac6e]">
            <Footprints size={16} />
            {steps}
          </div>

          {/* Calories */}
          <div className="flex items-center gap-2 text-[#e85c8a]">
            <Flame size={16} />
            {calories}
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setEditing(true)}
            className="text-sm text-blue-600 flex items-center gap-1"
          >
            <Pencil size={14} />
            Edit
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <input
            type="number"
            value={water}
            onChange={(e) => setWater(Number(e.target.value))}
            className="border rounded px-3 py-1 w-full"
          />

          <input
            type="number"
            value={steps}
            onChange={(e) => setSteps(Number(e.target.value))}
            className="border rounded px-3 py-1 w-full"
          />

          <input
            type="number"
            value={calories}
            onChange={(e) => setCalories(Number(e.target.value))}
            className="border rounded px-3 py-1 w-full"
          />

          <div className="flex gap-3">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-1 rounded flex items-center gap-1"
            >
              <Save size={14} />
              Save
            </button>

            <button
              onClick={() => setEditing(false)}
              className="bg-gray-300 px-4 py-1 rounded flex items-center gap-1"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
