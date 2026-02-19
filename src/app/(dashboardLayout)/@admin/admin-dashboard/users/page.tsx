import { adminService } from "@/services/admin.service";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AdminUserToggle from "@/components/modules/admin/AdminUserToggle";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  let users: User[] = [];
  try {
    const res = await adminService.getAllUsers();
    users = res.data;
  } catch {
    users = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Manage Users</h1>
        <p className="mt-1 text-muted-foreground">
          View and manage all users on the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users ({users.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {users.length === 0 ? (
            <p className="text-muted-foreground text-center py-10">
              No users found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Name</th>
                    <th className="pb-3 pr-4 font-medium">Email</th>
                    <th className="pb-3 pr-4 font-medium">Role</th>
                    <th className="pb-3 pr-4 font-medium">Status</th>
                    <th className="pb-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">{user.name}</td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="py-3 pr-4">
                        <Badge variant="secondary" className="capitalize">
                          {user.role?.toLowerCase()}
                        </Badge>
                      </td>
                      <td className="py-3 pr-4">
                        <Badge
                          variant={
                            (user as User & { status?: string }).status ===
                            "BANNED"
                              ? "destructive"
                              : "default"
                          }
                        >
                          {(user as User & { status?: string }).status ??
                            "ACTIVE"}
                        </Badge>
                      </td>
                      <td className="py-3">
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
        </CardContent>
      </Card>
    </div>
  );
}
