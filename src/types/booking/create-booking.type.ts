export interface CreateBookingPayload {
  tutorProfileId: string;
  categoryId: string;
  availabilityId?: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
}
