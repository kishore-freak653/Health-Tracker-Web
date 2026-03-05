"use client";

import { auth, db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActivityCard from "./ActivityCard";

export default function ActivityList() {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivities = async (user: any) => {
    try {
      const q = query(
        collection(db, "activities"),
        where("userId", "==", user.uid),
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setActivities(data);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching activities");
    } finally {
      setLoading(false);
    }
  };

  // ✅ ONE useEffect, waits for Firebase auth before fetching
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        setLoading(false);
        return;
      }
      fetchActivities(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <h2 className="text-lg font-bold text-[#1a2e1a] mb-4">
        Activity History
      </h2>

      {loading && (
        <p className="text-sm text-[#7a917a] text-center py-6">Loading...</p>
      )}

      {!loading && activities.length === 0 && (
        <p className="text-sm text-[#7a917a] text-center py-6">
          No activities logged yet. Start tracking above!
        </p>
      )}

      <div className="flex flex-col gap-3">
        {activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))}
      </div>
    </div>
  );
}
