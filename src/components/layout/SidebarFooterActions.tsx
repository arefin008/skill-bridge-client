"use client";

import { Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarFooterActions() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      toast.success("Logged out successfully");
      router.push("/");
      router.refresh();
    } catch (err: unknown) {
      toast.error("Failed to logout");
    }
  };

  return (
    <SidebarFooter className="border-t p-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild tooltip="Return to Home">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Return to Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton 
            onClick={handleLogout} 
            tooltip="Logout"
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <div className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
