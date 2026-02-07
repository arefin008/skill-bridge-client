"use server";
import { tutorService } from "@/services/tutor.service";

export const getTutors = async () => {
  return await tutorService.getAll();
};
