"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  bookingId: string;
}

export default function CancelBookingButton({ bookingId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  async function handleCancel() {
    setLoading(true);
    const toastId = toast.loading("Cancelling booking...");
    try {
      const res = await fetch(`${API_BASE}/api/bookings/${bookingId}/cancel`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
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
