"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { bookingService } from "@/services/booking.service";

interface Props {
  bookingId: string;
}

export default function CancelBookingButton({ bookingId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCancel() {
    setLoading(true);
    const toastId = toast.loading("Cancelling booking...");
    try {
      await bookingService.cancelMyBooking(bookingId);
      toast.success("Booking cancelled", { id: toastId });
      router.refresh();
    } catch {
      toast.error("Failed to cancel booking", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleCancel}
      disabled={loading}
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </Button>
  );
}
