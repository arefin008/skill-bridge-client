import TutorCard from "@/components/modules/homepage/GetAllTutor";
import HeroSearchClient from "@/components/modules/homepage/HeroSearchClient";
import { tutorService } from "@/services/tutor.service";
import { Tutor } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Star, Users, CheckCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allTutorsRes = await tutorService.getAll().catch(() => ({ data: [] }));
  const allTutorsData = allTutorsRes.data;

  // 1. Filter Featured: rating >= 4, max 4
  const featuredTutors = allTutorsData
    .filter((t: Tutor) => t.avgRating >= 4)
    .slice(0, 4);
    
  const featuredIds = new Set(featuredTutors.map((t: Tutor) => t.id));

  // 2. All tutors for the Instructors section
  const displayTutors = allTutorsData;
  const hasMoreTutors = false; // Showing all, so no "View All" button needed here unless we paginate

  // Calculate stats
  const activeTutorsCount = allTutorsData.length;
  const avgRating = allTutorsData.length > 0 
    ? allTutorsData.reduce((acc: number, t: Tutor) => acc + (t.avgRating || 0), 0) / allTutorsData.length 
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
            Connect with <span className="text-blue-400">Expert Tutors</span>
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
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-6 w-full mx-auto">
          <div className="bg-card p-6 rounded-2xl shadow-xl border flex items-center gap-6 flex-1 justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/30 cursor-default group">
            <div className="bg-primary/10 p-4 rounded-full flex-shrink-0 transition-colors group-hover:bg-primary/20">
              <Users className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <p className="text-3xl font-extrabold transition-colors group-hover:text-primary">{activeTutorsCount}</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Tutors</p>
            </div>
          </div>
          <div className="bg-card p-6 rounded-2xl shadow-xl border flex items-center gap-6 flex-1 justify-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-yellow-500/30 cursor-default group">
            <div className="bg-yellow-500/10 p-4 rounded-full flex-shrink-0 transition-colors group-hover:bg-yellow-500/20">
              <Star className="h-6 w-6 text-yellow-600 transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div>
              <p className="text-3xl font-extrabold transition-colors group-hover:text-yellow-600">{avgRating.toFixed(1)}/5</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Average Rating</p>
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

          {displayTutors.length === 0 ? (
             <div className="py-12 bg-muted/30 rounded-2xl text-center">
                <p className="text-xl font-semibold">No tutors found</p>
                <p className="text-muted-foreground mt-2">Check back later or browse all tutors.</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {displayTutors.map((tutor: Tutor) => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))}
            </div>
          )}
          
          {hasMoreTutors && (
            <div className="mt-12 text-center">
               <Link href="/tutors" className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-bold text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                  View All Tutors
               </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
