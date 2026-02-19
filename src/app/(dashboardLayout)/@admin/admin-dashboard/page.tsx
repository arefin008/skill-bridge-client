import { adminService } from "@/services/admin.service";
import { bookingService } from "@/services/booking.service";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarDays, CheckCircle2, BookOpen } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [usersRes, bookingsRes] = await Promise.all([
    adminService.getAllUsers().catch(() => ({ data: [] })),
    bookingService.getAll().catch(() => ({ data: [] })),
  ]);

  const users = usersRes.data;
  const bookings = bookingsRes.data;

  const totalStudents = users.filter((u) => u.role === "STUDENT").length;
  const totalTutors = users.filter((u) => u.role === "TUTOR").length;
  const confirmedBookings = bookings.filter(
    (b) => b.status === "CONFIRMED",
  ).length;
  const completedBookings = bookings.filter(
    (b) => b.status === "COMPLETED",
  ).length;

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      desc: `${totalStudents} students · ${totalTutors} tutors`,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Total Bookings",
      value: bookings.length,
      desc: "All time",
      icon: CalendarDays,
      color: "text-primary",
    },
    {
      title: "Confirmed Bookings",
      value: confirmedBookings,
      desc: "Active sessions",
      icon: BookOpen,
      color: "text-blue-600",
    },
    {
      title: "Completed Sessions",
      value: completedBookings,
      desc: "Successfully taught",
      icon: CheckCircle2,
      color: "text-green-600",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Platform overview and statistics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
