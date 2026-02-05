export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  date: Date;
  duration: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
  updatedAt: Date;
}