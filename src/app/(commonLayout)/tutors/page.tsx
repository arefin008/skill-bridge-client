import TutorCard from "@/components/modules/homepage/GetAllTutor";
import TutorFilterBar from "@/components/modules/tutors/TutorFilterBar";
import { categoryService } from "@/services/category.service";
import { tutorService } from "@/services/tutor.service";
import { Tutor } from "@/types";

export const dynamic = "force-dynamic";

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const [tutorsRes, categoriesRes] = await Promise.all([
    tutorService.getAll(
      {
        ...(params.category ? { categoryId: params.category } : {}),
        ...(params.search ? { search: params.search } : {}),
      },
      { revalidate: 0 },
    ),
    categoryService.getCategories(),
  ]);

  const tutors = tutorsRes.data;
  const categories = categoriesRes.data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">Browse Tutors</h1>
        <p className="text-muted-foreground">
          Find the perfect tutor for your learning journey.
        </p>
      </div>

      {/* Filter Bar (client component) */}
      <TutorFilterBar categories={categories} />

      {/* Results */}
      {tutors.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-2xl font-semibold">No tutors found</p>
          <p className="text-muted-foreground">
            Try adjusting your filters or search query.
          </p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor: Tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}
