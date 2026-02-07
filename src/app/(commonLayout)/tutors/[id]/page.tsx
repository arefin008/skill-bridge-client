import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, Clock, BadgeCheck } from "lucide-react";

import { tutorService } from "@/services/tutor.service";
import { Badge } from "@/components/ui/badge";
import { Tutor } from "@/types";

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
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Header Card */}
      <div className="flex flex-col md:flex-row bg-background border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Profile Image */}
        <div className="relative w-full md:w-72 h-72 shrink-0 bg-muted flex items-center justify-center">
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={280}
              height={280}
              className="rounded-full object-cover border-4 border-background shadow-md"
              unoptimized
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-lg font-medium">
              No Image
            </div>
          )}
        </div>

        {/* Tutor Info */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-foreground">
              {user.name}
              {tutor.isVerified && (
                <BadgeCheck className="h-6 w-6 text-primary" />
              )}
            </h1>

            <p className="mt-2 text-muted-foreground text-sm">
              {tutor.experience}+ years experience
            </p>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Star className="h-4 w-4 fill-accent text-accent" />
              <span>
                {tutor.avgRating.toFixed(1)} ({tutor.totalReviews} reviews)
              </span>
            </div>

            {/* Categories */}
            {categories?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <Badge key={cat.id} variant="secondary">
                    {cat.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Price */}
            <p className="mt-6 text-2xl font-bold text-primary">
              ৳ {tutor.hourlyRate}/hr
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="mt-10 bg-background p-6 rounded-xl shadow-sm border border-border">
        <h2 className="mb-3 text-xl font-semibold text-foreground">
          About Tutor
        </h2>
        <p className="text-muted-foreground leading-relaxed">{tutor.bio}</p>
      </section>

      {/* Availability Section */}
      <section className="mt-8 bg-background p-6 rounded-xl shadow-sm border border-border">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-semibold text-foreground">
          <Clock className="h-5 w-5 text-muted-foreground" />
          Availability
        </h2>

        {availability.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availability.map((slot) => (
              <li
                key={slot.id}
                className="rounded-lg border border-border p-4 flex flex-col gap-1 text-foreground shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="font-medium text-foreground">
                  {DAYS[slot.dayOfWeek]}
                </div>
                <div className="text-sm text-muted-foreground">
                  {slot.startTime} – {slot.endTime}
                </div>
                {slot.isBooked && (
                  <span className="mt-1 inline-block text-xs text-destructive font-semibold">
                    Booked
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No available slots</p>
        )}
      </section>
    </div>
  );
}
