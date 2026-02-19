/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { TutorProfileData } from "@/types";
import { tutorService } from "@/services/tutor.service";

export const getMyTutorProfile = async () => {
  try {
    const res = await tutorService.getMyProfile();
    return res.data;
  } catch (error: any) {
    console.error("Error fetching tutor profile:", error);
    return null;
  }
};

export const createTutorProfile = async (data: TutorProfileData) => {
  try {
    const res = await tutorService.createProfile(data);
    revalidateTag("tutorProfiles", "default");
    revalidatePath("/tutor-dashboard/dashboard", "page");
    revalidatePath("/tutor-dashboard/profile", "page");
    return res;
  } catch (error: any) {
    console.error("Error in createTutorProfile action:", error);
    return { error: { message: error.message || "Failed to create profile" } };
  }
};

export const updateTutorProfile = async (data: Partial<TutorProfileData>) => {
  try {
    const res = await tutorService.updateProfile(data);
    revalidateTag("tutorProfiles", "default");
    revalidatePath("/tutor-dashboard/dashboard", "page");
    revalidatePath("/tutor-dashboard/profile", "page");
    return res;
  } catch (error: any) {
    console.error("Error in updateTutorProfile action:", error);
    return { error: { message: error.message || "Failed to update profile" } };
  }
};
