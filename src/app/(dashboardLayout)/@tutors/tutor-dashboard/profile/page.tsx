import { TutorProfileFormClient } from "@/components/modules/tutors/TutorProfileFormClient";
import { getMyTutorProfile } from "@/actions/tutor.action";
import { categoryService } from "@/services/category.service";
import { userService } from "@/services/user.service";

export const dynamic = "force-dynamic";

export default async function TutorProfilePage() {
  const [tutor, categoriesRes, sessionRes] = await Promise.all([
    getMyTutorProfile(),
    categoryService.getCategories(),
    userService.getSession(),
  ]);

  const hasProfile = !!tutor;
  const allCategories = categoriesRes.data;
  const userImageUrl = sessionRes.data?.user?.image || "";

  return (
    <section className="flex justify-center mt-8 py-8 px-4">
      <TutorProfileFormClient 
        mode={hasProfile ? "update" : "create"} 
        allCategories={allCategories}
        userImageUrl={userImageUrl}
        defaultValues={tutor ? {
          bio: tutor.bio,
          hourlyRate: tutor.hourlyRate,
          experience: tutor.experience,
          categories: tutor.categories?.map(c => c.id) || []
        } : undefined} 
      />
    </section>
  );
}
