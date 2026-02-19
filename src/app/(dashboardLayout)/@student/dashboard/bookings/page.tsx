import { bookingService } from "@/services/booking.service";
import { Booking } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, Clock, User as UserIcon } from "lucide-react";
import CancelBookingButton from "@/components/modules/authentication/CancelBookingButton";
import ReviewFormClient from "@/components/modules/tutors/ReviewFormClient";

export const dynamic = "force-dynamic";

function statusVariant(status: string) {
  if (status === "CONFIRMED") return "default";
  if (status === "COMPLETED") return "secondary";
  return "destructive";
}

export default async function MyBookings() {
  let bookings: Booking[] = [];
  try {
    const res = await bookingService.getMyBookings();
    bookings = res.data;
  } catch {
    bookings = [];
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Bookings</h1>
        <p className="mt-1 text-muted-foreground">
          View and manage all your tutoring sessions.
        </p>
      </div>

      {bookings.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <CalendarDays className="mb-4 h-12 w-12 text-muted-foreground" />
            <p className="text-xl font-semibold">No bookings yet</p>
            <p className="mt-2 text-muted-foreground">
              Book a tutor to get started!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking) => (
            <Card key={booking.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">
                  {booking.tutor?.user?.name ?? "Tutor"}
                </CardTitle>
                <Badge variant={statusVariant(booking.status)}>
                  {booking.status}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>
                    {new Date(booking.sessionDate).toLocaleDateString("en-GB", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {booking.startTime} – {booking.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  <span>Category: {booking.category?.name ?? "—"}</span>
                </div>

                {booking.status === "CONFIRMED" && (
                  <div className="pt-2">
                    <CancelBookingButton bookingId={booking.id} />
                  </div>
                )}
                
                {booking.status === "COMPLETED" && (
                  <div className="pt-2 border-t mt-4">
                    <ReviewFormClient 
                      tutorProfileId={booking.tutor.id} 
                      bookingId={booking.id} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
