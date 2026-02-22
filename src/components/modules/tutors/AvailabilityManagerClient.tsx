"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TutorAvailability } from "@/types";
import { Plus } from "lucide-react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

interface Props {
  existingSlots: TutorAvailability[];
}

export default function AvailabilityManagerClient({ existingSlots }: Props) {
  const router = useRouter();
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("11:00");
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    if (!startTime || !endTime) return;
    setLoading(true);
    const toastId = toast.loading("Adding slot...");
    try {
      const res = await fetch(`/api/availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ dayOfWeek, startTime, endTime }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Slot added!", { id: toastId });
      router.refresh();
    } catch {
      toast.error("Failed to add slot", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const toastId = toast.loading("Deleting slot...");
    try {
      const res = await fetch(`/api/availability/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Slot removed", { id: toastId });
      router.refresh();
    } catch {
      toast.error("Failed to delete slot", { id: toastId });
    }
  }

  return (
    <div className="space-y-4">
      {/* Delete buttons on existing slots */}
      {existingSlots.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Delete Slots</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {existingSlots.map((slot) => (
                <li
                  key={slot.id}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <div>
                    <p className="font-medium">{DAYS[slot.dayOfWeek]}</p>
                    <p className="text-muted-foreground">
                      {slot.startTime} – {slot.endTime}
                    </p>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={slot.isBooked}
                    onClick={() => handleDelete(slot.id)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Add new slot */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Slot
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Day</label>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={dayOfWeek}
              onChange={(e) => setDayOfWeek(Number(e.target.value))}
            >
              {DAYS.map((day, i) => (
                <option key={day} value={i}>
                  {day}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Start Time</label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-32"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">End Time</label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-32"
            />
          </div>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add Slot"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
