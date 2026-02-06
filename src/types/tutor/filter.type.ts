export interface TutorFilter {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  dayOfWeek?: number;
  verifiedOnly?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}
