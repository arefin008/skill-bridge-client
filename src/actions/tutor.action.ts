/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag } from "next/cache";
import { TutorProfileData } from "@/types";
import { tutorService } from "@/services/tutor.service";

// export const getMyTutorProfile = async () => {
//   try {
//     const res = await tutorService.getMyProfile();
//     return res;
//   } catch (error: any) {
//     console.error("Error fetching tutor profile:", error);
//     return null;
//   }
// };

export const createTutorProfile = async (data: TutorProfileData) => {
  try {
    const res = await tutorService.createProfile(data);
    revalidateTag("tutorProfiles", "layout");
    return res;
  } catch (error: any) {
    return { error: { message: error.message || "Failed to create profile" } };
  }
};

export const updateTutorProfile = async (data: Partial<TutorProfileData>) => {
  try {
    const res = await tutorService.updateProfile(data);
    revalidateTag("tutorProfiles", "layout");
    return res;
  } catch (error: any) {
    return { error: { message: error.message || "Failed to update profile" } };
  }
};
