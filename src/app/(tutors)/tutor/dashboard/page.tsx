import { bookingService } from "@/services/booking.service";

export default async function TutorDashboard() {
  const sessions = await bookingService.tutorSessions();

  return (
    <div>
      <h1>Tutor Dashboard</h1>
      <p>Total sessions: {sessions.length}</p>
    </div>
  );
}
