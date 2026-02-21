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
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Platform overview, operations and statistics.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card 
            key={stat.title} 
            className="relative overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className={`absolute right-0 top-0 opacity-10 p-4 shrink-0 transition-transform group-hover:scale-110 ${stat.color}`}>
              <stat.icon className="h-24 w-24" />
            </div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
              <CardTitle className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10 space-y-1">
              <div className={`text-4xl font-extrabold ${stat.color}`}>
                {stat.value}
              </div>
              <p className="text-sm font-medium text-muted-foreground/80">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
