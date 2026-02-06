import { BookingStatus } from "./booking-status.type";
import { Tutor } from "../tutor/tutor.type";
import { User } from "../auth/user.type";
import { Category } from "../tutor/category.type";

export interface Booking {
  id: string;
  sessionDate: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;

  tutor: Tutor;
  student: User;
  category: Category;

  createdAt: string;
}
