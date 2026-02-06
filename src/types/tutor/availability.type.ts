export interface TutorAvailability {
  id: string;
  dayOfWeek: number; // 0 = Sunday
  startTime: string;
  endTime: string;
  isBooked: boolean;
}
