import { availabilityService } from "@/services/availability.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import AvailabilityManagerClient from "@/components/modules/tutors/AvailabilityManagerClient";
import { TutorAvailability } from "@/types";

export const dynamic = "force-dynamic";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default async function AvailabilityPage() {
  let slots: TutorAvailability[] = [];
  try {
    const res = await availabilityService.getMyAvailability();
    slots = res.data;
  } catch {
    slots = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Availability</h1>
        <p className="mt-1 text-muted-foreground">
          Set your weekly availability slots for students to book.
        </p>
      </div>

      {/* Existing slots */}
      <Card>
        <CardHeader>
          <CardTitle>Current Slots</CardTitle>
        </CardHeader>
        <CardContent>
          {slots.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
              <Clock className="mb-3 h-10 w-10" />
              <p>No availability slots yet. Add one below.</p>
            </div>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {slots.map(
                (slot: {
                  id: string;
                  dayOfWeek: number;
                  startTime: string;
                  endTime: string;
                  isBooked: boolean;
                }) => (
                  <li
                    key={slot.id}
                    className="flex items-center justify-between rounded-lg border p-3 text-sm"
                  >
                    <div>
                      <p className="font-medium">{DAYS[slot.dayOfWeek]}</p>
                      <p className="text-muted-foreground">
                        {slot.startTime} – {slot.endTime}
                      </p>
                      {slot.isBooked && (
                        <span className="text-xs font-semibold text-destructive">
                          Booked
                        </span>
                      )}
                    </div>
                  </li>
                ),
              )}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Add new slot form */}
      <AvailabilityManagerClient existingSlots={slots} />
    </div>
  );
}
