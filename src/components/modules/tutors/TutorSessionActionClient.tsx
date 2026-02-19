"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

interface Props {
  bookingId: string;
}

export default function TutorSessionActionClient({ bookingId }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleComplete() {
    setLoading(true);
    const toastId = toast.loading("Marking session as complete...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}/complete`, {
        method: "PATCH",
        credentials: "include", // Ensure session is sent
      });

      if (!response.ok) {
        throw new Error("Failed to complete session");
      }

      toast.success("Session completed!", { id: toastId });
      router.refresh(); // Refresh server component data
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      size="sm" 
      onClick={handleComplete} 
      disabled={loading}
      className="bg-green-600 hover:bg-green-700 text-white gap-2"
    >
      <CheckCircle2 className="h-4 w-4" />
      {loading ? "Processing..." : "Mark Complete"}
    </Button>
  );
}
