"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { adminService } from "@/services/admin.service";

interface Props {
  userId: string;
  currentStatus: string;
}

export default function AdminUserToggle({ userId, currentStatus }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isBanned = currentStatus === "BANNED";
  async function handleToggle() {
    const newStatus = isBanned ? "ACTIVE" : "BANNED";
    setLoading(true);
    const toastId = toast.loading(
      isBanned ? "Unbanning user..." : "Banning user...",
    );
    try {
      await adminService.updateUserStatus(userId, newStatus);
      toast.success(isBanned ? "User unbanned" : "User banned", {
        id: toastId,
      });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || "Failed to update user status", { id: toastId });
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
