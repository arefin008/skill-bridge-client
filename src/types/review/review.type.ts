export interface Review {
  id: string;
  rating: number;
  comment?: string | null;
  createdAt: string;

  studentId: string;
  tutorProfileId: string;
}
