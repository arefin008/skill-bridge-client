import { bookingService } from "@/services/booking.service";

export default async function AdminDashboard() {
  const bookings = await bookingService.getAll();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Total bookings: {bookings.length}</p>
    </div>
  );
}
