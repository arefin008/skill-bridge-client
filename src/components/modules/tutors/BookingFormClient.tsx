"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tutor } from "@/types";
import { Calendar } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface Props {
  tutor: Tutor;
}

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function BookingFormClient({ tutor }: Props) {
  const router = useRouter();
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [sessionDate, setSessionDate] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { availability, categories, id: tutorProfileId } = tutor;

  const selectedSlot = availability.find((s) => s.id === selectedSlotId);

  async function handleBook() {
    if (!selectedSlotId || !selectedCategoryId || !sessionDate) {
      toast.error("Please select a slot, category and date");
      return;
    }

    if (!selectedSlot) return;

    // Check if user is authenticated before allowing booking
    const sessionRes = await authClient.getSession();
    if (!sessionRes.data?.user) {
      toast.error("Please login first to confirm your booking");
      router.push("/login");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Booking session...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          tutorProfileId,
          categoryId: selectedCategoryId,
          availabilityId: selectedSlotId,
          sessionDate: new Date(sessionDate).toISOString(),
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to book");
      }

      toast.success("Session booked successfully!", { id: toastId });
      router.refresh(); // Refresh background data
      router.push("/dashboard/bookings");
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  // Helper to validate date matches slot day
  const isDateValid = (dateStr: string) => {
    if (!selectedSlot || !dateStr) return true;
    const date = new Date(dateStr);
    return date.getDay() === selectedSlot.dayOfWeek;
  };

  return (
    <Card className="shadow-lg border-2 border-primary/10">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Book a Session
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Slot Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Select Availability Slot</label>
          <select
            className="w-full h-11 rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            value={selectedSlotId}
            onChange={(e) => {
              setSelectedSlotId(e.target.value);
              setSessionDate(""); // Reset date when slot changes
            }}
          >
            <option value="">-- Choose a slot --</option>
            {availability.filter(s => !s.isBooked).map((slot) => (
              <option key={slot.id} value={slot.id}>
                {DAYS[slot.dayOfWeek]} : {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
          {availability.filter(s => !s.isBooked).length === 0 && (
            <p className="text-xs text-destructive">No available slots at the moment.</p>
          )}
        </div>

        {/* Category Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Subject / Category</label>
          <select
            className="w-full h-11 rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">-- Choose a category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Session Date</label>
          <input
            type="date"
            className="w-full h-11 rounded-md border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none"
            value={sessionDate}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setSessionDate(e.target.value)}
            disabled={!selectedSlotId}
          />
          {sessionDate && selectedSlot && !isDateValid(sessionDate) && (
            <p className="text-xs text-destructive shrink-0">
              Selected date must be a {DAYS[selectedSlot.dayOfWeek]}.
            </p>
          )}
          {!selectedSlotId && (
            <p className="text-xs text-muted-foreground">Select a slot first to pick a date.</p>
          )}
        </div>

        <Button
          className="w-full h-11 text-base font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          onClick={handleBook}
          disabled={loading || !selectedSlotId || !selectedCategoryId || !sessionDate || !isDateValid(sessionDate)}
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </Button>

        <p className="text-[10px] text-center text-muted-foreground">
          By clicking &quot;Confirm Booking&quot;, you agree to the terms of service.
        </p>
      </CardContent>
    </Card>
  );
}
