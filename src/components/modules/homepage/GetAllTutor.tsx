import Link from "next/link";
import Image from "next/image";
import { Star, Clock, BadgeCheck, ArrowRight } from "lucide-react";

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
    <Card className="group relative h-full overflow-hidden border border-border/40 bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-2xl flex flex-col">
      {/* Image Container with Overlay */}
      <div className="relative h-64 w-full overflow-hidden bg-muted">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/5 text-primary/40 font-black text-4xl">
            {user.name.charAt(0)}
          </div>
        )}
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
           <Badge className="bg-background/90 backdrop-blur-md text-foreground border-none shadow-sm text-xs font-bold py-1 px-3">
              ৳ {tutor.hourlyRate}/hr
           </Badge>
        </div>

        {tutor.isVerified && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md p-1.5 rounded-full shadow-sm">
            <BadgeCheck className="h-4 w-4 text-blue-500" />
          </div>
        )}
      </div>

      {/* Info Section */}
      <CardHeader className="pb-2 pt-6 px-6">
        <div className="flex items-center justify-between pb-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
            {tutor.experience}+ Years Experience
          </p>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold">{tutor.avgRating.toFixed(1)}</span>
          </div>
        </div>
        <CardTitle className="text-xl font-bold tracking-tight group-hover:text-primary transition-colors">
          {user.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-grow pb-4 px-6">
        <p className="mb-5 line-clamp-2 text-sm text-muted-foreground/80 leading-relaxed min-h-[40px]">
          {tutor.bio}
        </p>

        {/* Categories with Horizontal Scroll or Wrap */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {categories?.slice(0, 2).map((cat) => (
            <Badge key={cat.id} variant="secondary" className="text-[10px] font-bold px-2.5 py-0.5 bg-secondary/50 hover:bg-secondary">
              {cat.name}
            </Badge>
          ))}
          {categories?.length > 2 && (
            <Badge variant="outline" className="text-[10px] font-medium border-dashed">
              +{categories.length - 2}
            </Badge>
          )}
        </div>

        {/* Availability Quick Info */}
        <div className="flex items-center gap-2 text-muted-foreground pt-4 border-t border-border/40">
           <Clock className="h-3.5 w-3.5 text-primary/60" />
           <span className="text-[11px] font-semibold">
             {availability.filter(s => !s.isBooked).length > 0 
               ? `${availability.filter(s => !s.isBooked).length} Free Slots Available` 
               : "No slots currently available"}
           </span>
        </div>
      </CardContent>

      {/* Action Footer */}
      <CardFooter className="px-6 pb-6 pt-2">
        <Link
          href={`/tutors/${tutor.id}`}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]"
        >
          View Profile
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
