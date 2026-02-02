import { bookingService } from "@/services/booking.service";

interface Booking {
  id: string;
  status: string;
}

export default async function MyBookings() {
  const bookings = await bookingService.myBookings();

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.map((b: Booking) => (
        <div key={b.id}>{b.status}</div>
      ))}
    </div>
  );
}
