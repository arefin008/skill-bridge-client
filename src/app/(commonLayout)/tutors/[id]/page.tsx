import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Clock, BadgeCheck, MessageSquare, User as UserIcon } from "lucide-react";

import { tutorService } from "@/services/tutor.service";
import { Badge } from "@/components/ui/badge";
import { Tutor } from "@/types";
import BookingFormClient from "@/components/modules/tutors/BookingFormClient";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function TutorDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const tutor: Tutor | null = await tutorService.getById(id);

  if (!tutor) notFound();

  const { user, categories, availability } = tutor;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Left Column: Tutor Info & Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="flex flex-col md:flex-row bg-card border rounded-2xl shadow-sm overflow-hidden">
            <div className="relative w-full md:w-80 h-80 shrink-0 bg-muted">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xl font-bold bg-secondary">
                  {user.name?.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                  {tutor.isVerified && (
                    <BadgeCheck className="h-6 w-6 text-primary fill-primary/10" />
                  )}
                </div>

                <p className="mt-2 text-muted-foreground font-medium">
                  {tutor.experience}+ years of teaching experience
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-accent/50 rounded-full text-accent-foreground font-semibold">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    {tutor.avgRating.toFixed(1)} ({tutor.totalReviews} reviews)
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {categories?.map((cat) => (
                    <Badge key={cat.id} variant="outline" className="px-3 py-1">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hourly Rate</p>
                  <p className="text-2xl font-bold text-primary">৳ {tutor.hourlyRate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <section className="bg-card p-8 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              About Me
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {tutor.bio}
            </p>
          </section>

          {/* Availability Details */}
          <section className="bg-card p-8 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              General Weekly Schedule
            </h2>

            {availability.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availability.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 rounded-xl border bg-secondary/30"
                  >
                    <div>
                      <p className="font-bold">{DAYS[slot.dayOfWeek]}</p>
                      <p className="text-sm text-muted-foreground font-medium">
                        {slot.startTime} – {slot.endTime}
                      </p>
                    </div>
                    {slot.isBooked ? (
                      <Badge variant="destructive">Reserved</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Available</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground italic">No recurring slots listed.</p>
            )}
          </section>

          {/* Reviews List */}
          <section className="bg-card p-8 rounded-2xl shadow-sm border">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Student Reviews
            </h2>
            
            {tutor.reviews && tutor.reviews.length > 0 ? (
               <div className="space-y-6">
                 {tutor.reviews.map((review) => (
                   <div key={review.id} className="pb-6 border-b last:border-0">
                      <div className="flex items-center justify-between mb-2">
                         <p className="font-bold">Verified Student</p>
                         <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-muted-foreground'}`} />
                            ))}
                         </div>
                      </div>
                      <p className="text-sm text-muted-foreground italic">&quot;{review.comment}&quot;</p>
                   </div>
                 ))}
               </div>
            ) : (
              <p className="text-muted-foreground italic text-center py-8 bg-secondary/20 rounded-xl">
                No reviews yet. Be the first to book and share your experience!
              </p>
            )}
          </section>
        </div>

        {/* Sticky Booking Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <BookingFormClient tutor={tutor} />
          </div>
        </div>
      </div>
    </div>
  );
}


