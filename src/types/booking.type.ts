export interface Booking {
  id: string;
  tutorId: string;
  studentId: string;
  status: "ACTIVE" | "CANCELLED";
}
