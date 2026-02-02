"use client";

import { availabilityService } from "@/services/availability.service";
import { useEffect, useState } from "react";

interface AvailabilitySlot {
  id: string;
  day: string;
}

export default function AvailabilityPage() {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);

  useEffect(() => {
    availabilityService.getMine().then(setSlots);
  }, []);

  return (
    <div>
      <h1>Availability</h1>
      {slots.map((s) => (
        <div key={s.id}>{s.day}</div>
      ))}
    </div>
  );
}
