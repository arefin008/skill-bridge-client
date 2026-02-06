import { User } from "../auth/user.type";
import { TutorAvailability } from "./availability.type";
import { Category } from "./category.type";
import { Review } from "../review/review.type";

export interface Tutor {
  id: string;
  bio: string;
  hourlyRate: number;
  experience: number;
  avgRating: number;
  totalReviews: number;
  isVerified: boolean;

  user: User;
  categories: Category[];
  availability: TutorAvailability[];
  reviews?: Review[];
}
