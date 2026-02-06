import TutorCard from "@/components/modules/homepage/GetAllTutor";
import { tutorService } from "@/services/tutor.service";
import { Tutor } from "@/types";
import Image from "next/image";

export default async function Home() {
  const [featuredTutorsRes, tutorsRes] = await Promise.all([
    tutorService.getAll({ verifiedOnly: true, limit: 4 }),
    tutorService.getAll({ limit: 6 }, { revalidate: 10 }),
  ]);

  const featuredTutors = featuredTutorsRes.data;
  const tutors = tutorsRes.data;

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* Hero Section */}
      <div className="mb-16 mt-8 flex min-h-[calc(100vh-80px)] flex-col justify-center">
        <div className="relative mb-8 h-96 w-full">
          <Image
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=100"
            fill
            priority
            alt="Find Your Tutor"
            className="rounded-md object-cover"
          />
        </div>

        <h1 className="mb-4 text-center text-5xl font-bold">
          Find the Right Tutor for You
        </h1>
        <p className="mx-auto max-w-2xl text-center text-muted-foreground">
          Learn from verified tutors, book sessions instantly, and grow your
          skills with confidence.
        </p>
      </div>

      {/* Featured Tutors */}
      {featuredTutors.length > 0 && (
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-bold">Featured Tutors</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {featuredTutors.map((tutor: Tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
        </section>
      )}

      {/* All Tutors */}
      <section>
        <h2 className="mb-6 text-2xl font-bold">All Tutors</h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor: Tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </div>
      </section>
    </div>
  );
}
