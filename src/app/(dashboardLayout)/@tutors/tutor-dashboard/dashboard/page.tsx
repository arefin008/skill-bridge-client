import { bookingService } from "@/services/booking.service";
import { userService } from "@/services/user.service";
import { Booking } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, Star, Users, AlertCircle } from "lucide-react";
import TutorSessionActionClient from "@/components/modules/tutors/TutorSessionActionClient";
import { getMyTutorProfile } from "@/actions/tutor.action";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

function statusVariant(status: string) {
  if (status === "CONFIRMED") return "default" as const;
  if (status === "COMPLETED") return "secondary" as const;
  return "destructive" as const;
}

export default async function TutorDashboard() {
  const [sessionRes, sessionsRes, tutor] = await Promise.all([
    userService.getSession(),
    bookingService.getTutorSessions().catch(() => ({ data: [] })),
    getMyTutorProfile(),
  ]);

  const user = sessionRes.data?.user;
  const sessions: Booking[] = sessionsRes.data;

  const upcoming = sessions.filter((s) => s.status === "CONFIRMED").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name?.split(" ")[0] ?? "Tutor"} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your teaching activity.
        </p>
      </div>

      <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline" className="border-primary/20 hover:bg-primary/5 font-bold shadow-sm">
              <Link href="/tutor-dashboard/profile/preview" className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  View Public Profile Preview
              </Link>
          </Button>
      </div>

      {!tutor && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 py-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold">Complete Your Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Your profile is not yet visible to students. Set it up now to start getting bookings!
                </p>
              </div>
            </div>
            <Button asChild size="lg" className="whitespace-nowrap font-bold">
              <Link href="/tutor-dashboard/profile">Create Profile</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{sessions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{upcoming}</div>
            <p className="text-xs text-muted-foreground mt-1">Confirmed bookings</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent sessions */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Recent Sessions</h2>
        {sessions.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <CalendarDays className="mb-4 h-10 w-10 text-muted-foreground" />
              <p className="font-semibold text-lg">No sessions yet</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Set your availability and get booked!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {sessions.slice(0, 5).map((session) => (
              <Card key={session.id}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-bold">
                    {session.student?.name ?? "Student"}
                  </CardTitle>
                  <Badge variant={statusVariant(session.status)} className="px-3">
                    {session.status}
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
                    <div className="flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      {new Date(session.sessionDate).toLocaleDateString("en-GB", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-primary" />
                      {session.startTime} – {session.endTime}
                    </div>
                  </div>

                  {session.status === "CONFIRMED" && (
                    <div className="pt-2 border-t">
                      <TutorSessionActionClient bookingId={session.id} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
