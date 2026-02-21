import { adminService } from "@/services/admin.service";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AdminUserToggle from "@/components/modules/admin/AdminUserToggle";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function AdminUsersPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const limit = 10;
  
  let users: User[] = [];
  let meta: any = null;
  
  try {
    const res = await adminService.getAllUsers(page, limit);
    users = res.data;
    meta = res.meta;
  } catch {
    users = [];
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
          <p className="mt-1 text-muted-foreground">
            View, manage, and moderate all users across the platform.
          </p>
        </div>
      </div>

      <Card className="border shadow-sm overflow-hidden">
        <CardHeader className="bg-muted/30 border-b">
          <CardTitle>All Users ({meta?.total || users.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <div className="h-16 w-16 rounded-full bg-muted/50 mb-4 flex items-center justify-center">
                <span className="text-2xl opacity-50">👥</span>
              </div>
              <p>No users found on this page.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/10 text-left text-muted-foreground uppercase tracking-wider text-xs">
                    <th className="py-4 px-6 font-semibold">Name</th>
                    <th className="py-4 px-6 font-semibold">Email</th>
                    <th className="py-4 px-6 font-semibold">Role</th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                    <th className="py-4 px-6 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/5 transition-colors">
                      <td className="py-4 px-6 font-medium">{user.name}</td>
                      <td className="py-4 px-6 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="py-4 px-6">
                        <Badge variant="secondary" className="capitalize text-xs font-semibold px-2 py-0.5">
                          {user.role?.toLowerCase()}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <Badge
                          variant={
                            (user as User & { status?: string }).status ===
                            "BANNED"
                              ? "destructive"
                              : "default"
                          }
                          className="text-xs font-semibold px-2 py-0.5"
                        >
                          {(user as User & { status?: string }).status ??
                            "ACTIVE"}
                        </Badge>
                      </td>
                      <td className="py-4 px-6">
                        <AdminUserToggle
                          userId={user.id}
                          currentStatus={
                            (user as User & { status?: string }).status ??
                            "ACTIVE"
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {meta && meta.totalPages > 1 && (
            <div className="flex items-center justify-between p-6 bg-muted/5 border-t">
              <p className="text-sm font-medium text-muted-foreground">
                Showing page {meta.page} of {meta.totalPages} ({meta.total} total users)
              </p>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page <= 1}
                  asChild={page > 1}
                  className="shadow-sm font-medium"
                >
                  {page > 1 ? (
                    <Link href={`/admin-dashboard/users?page=${page - 1}`} className="flex items-center">
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </Link>
                  ) : (
                    <>
                      <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={page >= meta.totalPages}
                  asChild={page < meta.totalPages}
                  className="shadow-sm font-medium"
                >
                  {page < meta.totalPages ? (
                    <Link href={`/admin-dashboard/users?page=${page + 1}`} className="flex items-center">
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  ) : (
                    <>
                      Next <ChevronRight className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
