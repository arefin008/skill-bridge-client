import { TutorProfileFormClient } from "@/components/modules/tutors/TutorProfileFormClient";
import { getMyTutorProfile } from "@/actions/tutor.action";
import { categoryService } from "@/services/category.service";

export const dynamic = "force-dynamic";

export default async function TutorProfilePage() {
  const [tutor, categoriesRes] = await Promise.all([
    getMyTutorProfile(),
    categoryService.getCategories(),
  ]);

  const hasProfile = !!tutor;
  const allCategories = categoriesRes.data;

  return (
    <section className="flex justify-center mt-8 py-8 px-4">
      <TutorProfileFormClient 
        mode={hasProfile ? "update" : "create"} 
        allCategories={allCategories}
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
