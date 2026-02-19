import { userService } from "@/services/user.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, User as UserIcon, Shield, CalendarDays } from "lucide-react";

export default async function ProfilePage() {
  const sessionRes = await userService.getSession();
  const user = sessionRes.data?.user;

  if (!user) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-muted-foreground">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="mt-1 text-muted-foreground">Your account information.</p>
      </div>

      <Card className="max-w-xl">
        <CardHeader>
          <div className="flex items-center gap-4">
            {user.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.image}
                alt={user.name}
                className="h-16 w-16 rounded-full object-cover border"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted text-2xl font-bold text-muted-foreground">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            )}
            <div>
              <CardTitle className="text-2xl">{user.name}</CardTitle>
              <Badge variant="secondary" className="mt-1 capitalize">
                {user.role?.toLowerCase()}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div className="flex items-center gap-3 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <UserIcon className="h-4 w-4" />
            <span>ID: {user.id}</span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>
              Email verified:{" "}
              {user.emailVerified ? (
                <span className="text-green-600 font-medium">Yes</span>
              ) : (
                <span className="text-destructive font-medium">No</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>
              Joined:{" "}
              {new Date(user.createdAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
