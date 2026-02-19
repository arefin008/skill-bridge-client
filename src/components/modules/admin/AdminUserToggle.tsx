"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface Props {
  userId: string;
  currentStatus: string;
}

export default function AdminUserToggle({ userId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const isBanned = currentStatus === "BANNED";

  async function handleToggle() {
    const newStatus = isBanned ? "ACTIVE" : "BANNED";
    setLoading(true);
    const toastId = toast.loading(
      isBanned ? "Unbanning user..." : "Banning user...",
    );
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(isBanned ? "User unbanned" : "User banned", {
        id: toastId,
      });
      router.refresh();
    } catch {
      toast.error("Failed to update user status", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      variant={isBanned ? "default" : "destructive"}
      size="sm"
      onClick={handleToggle}
      disabled={loading}
    >
      {loading ? "..." : isBanned ? "Unban" : "Ban"}
    </Button>
  );
}
