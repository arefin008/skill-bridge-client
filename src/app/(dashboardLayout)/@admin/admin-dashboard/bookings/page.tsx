import { bookingService } from "@/services/booking.service";
import { Booking } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const dynamic = "force-dynamic";

function statusVariant(status: string) {
  if (status === "CONFIRMED") return "default" as const;
  if (status === "COMPLETED") return "secondary" as const;
  return "destructive" as const;
}

export default async function AdminBookingsPage() {
  let bookings: Booking[] = [];
  try {
    const res = await bookingService.getAll();
    bookings = res.data;
  } catch {
    bookings = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">All Bookings</h1>
        <p className="mt-1 text-muted-foreground">
          View all tutoring session bookings across the platform.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bookings ({bookings.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <p className="py-10 text-center text-muted-foreground">
              No bookings found.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">Student</th>
                    <th className="pb-3 pr-4 font-medium">Tutor</th>
                    <th className="pb-3 pr-4 font-medium">Category</th>
                    <th className="pb-3 pr-4 font-medium">Date</th>
                    <th className="pb-3 pr-4 font-medium">Time</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-medium">
                        {booking.student?.name ?? "—"}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {booking.tutor?.user?.name ?? "—"}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {booking.category?.name ?? "—"}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {new Date(booking.sessionDate).toLocaleDateString(
                          "en-GB",
                          { day: "numeric", month: "short", year: "numeric" },
                        )}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {booking.startTime} – {booking.endTime}
                      </td>
                      <td className="py-3">
                        <Badge variant={statusVariant(booking.status)}>
                          {booking.status}
                        </Badge>
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
