import { bookingService } from "@/services/booking.service";

export default async function StudentDashboard() {
  const bookings = await bookingService.myBookings();

  return (
    <div>
      <h1>My Dashboard</h1>
      <p>Total bookings: {bookings.length}</p>
    </div>
  );
}
