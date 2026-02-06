import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BadgeCheck } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tutor } from "@/types";

interface TutorCardProps {
  tutor: Tutor;
}

export default function TutorCard({ tutor }: TutorCardProps) {
  const { user, categories, availability } = tutor;

  return (
    <Card className="group h-full overflow-hidden border-none shadow-md transition-all duration-300">
      {/* Image */}
      <div className="relative h-56 w-full overflow-hidden bg-muted">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
      </div>

      {/* Header */}
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-xl font-bold">
          {user.name}
          {tutor.isVerified && <BadgeCheck className="h-5 w-5 text-blue-500" />}
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          {tutor.experience}+ years experience
        </p>
      </CardHeader>

      {/* Content */}
      <CardContent>
        <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
          {tutor.bio}
        </p>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {categories.slice(0, 3).map((cat) => (
              <Badge key={cat.id} variant="secondary" className="text-xs">
                {cat.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Rating + Availability */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            {tutor.avgRating.toFixed(1)} ({tutor.totalReviews})
          </span>

          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {availability.length} slots
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex items-center justify-between border-t p-4">
        <span className="text-lg font-bold text-primary">
          ৳ {tutor.hourlyRate}/hr
        </span>

        <Link
          href={`/tutors/${tutor.id}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          View Profile →
        </Link>
      </CardFooter>
    </Card>
  );
}
