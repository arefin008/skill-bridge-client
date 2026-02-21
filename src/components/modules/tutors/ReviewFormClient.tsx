"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface Props {
  tutorProfileId: string;
  bookingId: string;
  onSuccess?: () => void;
}

export default function ReviewFormClient({ tutorProfileId, bookingId, onSuccess }: Props) {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const toastId = toast.loading("Submitting review...");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          bookingId,
          rating,
          comment,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      toast.success("Review submitted! Thank you.", { id: toastId });
      setIsOpen(false);
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
        Leave a Review
      </Button>
    );
  }

  return (
    <div className="mt-4 p-4 border rounded-lg bg-accent/5 space-y-4 animate-in fade-in slide-in-from-top-2">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-sm text-foreground">Rate your session</h4>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
          ✕
        </Button>
      </div>

      <div className="flex gap-1 justify-center py-2">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFull = rating >= star;

          return (
            <div key={star} className="relative flex items-center justify-center transition-transform hover:scale-110">
              <button 
                type="button" 
                onClick={() => setRating(star)}
                className="absolute inset-0 z-10 w-full h-full cursor-pointer"
                aria-label={`${star} stars`}
              />
              <Star className={`h-8 w-8 ${isFull ? "fill-primary text-primary" : "text-muted-foreground"}`} />
            </div>
          );
        })}
      </div>

      <textarea
        placeholder="Share your experience (optional)"
        className="w-full min-h-[80px] p-3 text-sm rounded-md border border-input bg-background text-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} disabled={loading}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </div>
    </div>
  );
}
