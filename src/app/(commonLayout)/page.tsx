import TutorCard from "@/components/modules/homepage/GetAllTutor";
import HeroSearchClient from "@/components/modules/homepage/HeroSearchClient";
import { tutorService } from "@/services/tutor.service";
import { bookingService } from "@/services/booking.service";
import { Tutor } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [featuredTutorsRes, tutorsRes, allBookingsRes] = await Promise.all([
    tutorService.getAll({ verifiedOnly: true, limit: 4 }),
    tutorService.getAll({ limit: 8 }, { revalidate: 10 }),
    bookingService.getAll().catch(() => ({ data: [] })),
  ]);

  // Fetch all tutors for stats if needed, or use the current list if it represents all
  // For now, let's assume tutorsRes is for display, and we might need another for total count if pagination is used.
  // Actually, I'll fetch total tutors count separately for accuracy if limit is 8.
  const allTutorsRes = await tutorService.getAll().catch(() => ({ data: [] }));

  const featuredTutors = featuredTutorsRes.data;
  const tutors = tutorsRes.data;
  const allTutors = allTutorsRes.data;
  const totalBookings = allBookingsRes.data.length;

  // Calculate stats
  const activeTutorsCount = allTutors.length;
  const avgRating = allTutors.length > 0 
    ? allTutors.reduce((acc, t) => acc + (t.avgRating || 0), 0) / allTutors.length 
    : 0;

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] w-full overflow-hidden flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&q=100"
          fill
          priority
          alt="SkillBridge Learning"
          className="object-cover brightness-[0.4]"
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center text-white">
          <h1 className="mb-6 text-5xl md:text-7xl font-extrabold tracking-tight">
            Connect with <span className="text-primary">Expert Tutors</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-gray-200">
            Learn anything, anywhere. Browse verified tutors, book instant sessions, 
            and accelerate your learning journey today.
          </p>
          
          <HeroSearchClient />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 mt-[-60px] relative z-20">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card p-6 rounded-2xl shadow-xl border flex items-center gap-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{activeTutorsCount}</p>
              <p className="text-sm text-muted-foreground font-medium">Active Tutors</p>
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-xl border flex items-center gap-4">
            <div className="bg-yellow-500/10 p-4 rounded-full">
              <Star className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{avgRating.toFixed(1)}/5</p>
              <p className="text-sm text-muted-foreground font-medium">Average Rating</p>
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-xl border flex items-center gap-4">
            <div className="bg-green-500/10 p-4 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{totalBookings}</p>
              <p className="text-sm text-muted-foreground font-medium">Sessions Delivered</p>
            </div>
          </div>
        </div>

        {/* Featured Tutors */}
        {featuredTutors.length > 0 && (
          <section className="mt-24">
             <div className="flex items-center justify-between mb-8">
               <div>
                  <h2 className="text-3xl font-bold tracking-tight">Featured Tutors</h2>
                  <p className="text-muted-foreground mt-1">Handpicked experts with outstanding reviews.</p>
               </div>
             </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {featuredTutors.map((tutor: Tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          </section>
        )}

        {/* All Tutors */}
        <section className="mt-24">
          <div className="flex items-center justify-between mb-8">
             <div>
                <h2 className="text-3xl font-bold tracking-tight">Our Instructors</h2>
                <p className="text-muted-foreground mt-1">Explore all tutors currently active on the platform.</p>
             </div>
          </div>

          {tutors.length === 0 ? (
             <div className="py-12 bg-muted/30 rounded-2xl text-center">
                <p className="text-xl font-semibold">No tutors found</p>
                <p className="text-muted-foreground mt-2">Check back later or browse all tutors.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {tutors.map((tutor: Tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
             <Link href="/tutors" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                View All Tutors
             </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
