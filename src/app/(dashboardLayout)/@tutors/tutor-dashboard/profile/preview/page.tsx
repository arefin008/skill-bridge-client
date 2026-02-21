import { notFound, redirect } from "next/navigation";
import { Star, Clock, BadgeCheck, User as UserIcon, Edit3, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { getMyTutorProfile } from "@/actions/tutor.action";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const dynamic = "force-dynamic";

export default async function TutorProfilePreviewPage() {
  const tutor = await getMyTutorProfile();

  if (!tutor) {
    redirect("/tutor-dashboard/profile");
  }

  const { user, categories, availability } = tutor;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Top Navigation / Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/30 p-4 rounded-xl border border-dashed">
        <div className="flex items-center gap-3">
            <Link href="/tutor-dashboard/dashboard">
                <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </Link>
            <div>
                <h1 className="text-xl font-bold">Public Profile Preview</h1>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">This is exactly how students see you</p>
            </div>
        </div>
        <Link href="/tutor-dashboard/profile">
          <Button variant="default" className="gap-2 font-bold shadow-lg shadow-primary/20">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Column: Tutor Info & Details (Reusing Public Layout) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className="flex flex-col md:flex-row bg-card border rounded-2xl shadow-sm overflow-hidden ring-1 ring-border/50">
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
                <div className="flex h-full w-full items-center justify-center text-muted-foreground text-4xl font-bold bg-secondary/50">
                  {user.name?.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex-1 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                  {tutor.isVerified && (
                    <BadgeCheck className="h-6 w-6 text-primary" />
                  )}
                </div>

                <p className="mt-2 text-muted-foreground font-medium">
                  {tutor.experience}+ years of teaching experience
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/10 text-yellow-700 rounded-full text-sm font-bold border border-yellow-400/20">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    {tutor.avgRating.toFixed(1)} ({tutor.totalReviews} reviews)
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {categories?.map((cat) => (
                    <Badge key={cat.id} variant="secondary" className="px-3 py-1 font-bold bg-primary/5 text-primary border-primary/10">
                      {cat.name}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Your Hourly Rate</p>
                  <p className="text-3xl font-extrabold text-primary">৳ {tutor.hourlyRate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <section className="bg-card p-8 rounded-2xl shadow-sm border ring-1 ring-border/50">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-primary" />
              About Me
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium italic translate-x-1">
              &quot;{tutor.bio}&quot;
            </p>
          </section>

          {/* Availability Details */}
          <section className="bg-card p-8 rounded-2xl shadow-sm border ring-1 ring-border/50">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Weekly Schedule
            </h2>

            {availability && availability.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availability.map((slot) => (
                  <div
                    key={slot.id}
                    className="flex items-center justify-between p-4 rounded-xl border bg-secondary/20 hover:bg-secondary/40 transition-colors"
                  >
                    <div>
                      <p className="font-bold">{DAYS[slot.dayOfWeek]}</p>
                      <p className="text-xs text-muted-foreground font-medium">
                        {slot.startTime} – {slot.endTime}
                      </p>
                    </div>
                    {slot.isBooked ? (
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-100">Booked</Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">Available</Badge>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-muted/30 rounded-xl border border-dashed">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-50" />
                  <p className="text-muted-foreground italic text-sm font-medium">No recurring slots listed yet.</p>
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Fake Booking Card (to show how it looks) */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
             <Card className="border-primary/20 bg-primary/[0.02] shadow-xl">
                 <CardHeader>
                     <CardTitle className="text-lg">Booking Preview</CardTitle>
                     <CardDescription>Students will use this form to hire you.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4 opacity-70 pointer-events-none select-none">
                     <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                     <div className="h-10 w-full bg-muted rounded-md animate-pulse" />
                     <div className="h-32 w-full bg-muted rounded-md animate-pulse" />
                 </CardContent>
                 <CardFooter>
                     <Button disabled className="w-full font-bold">Book Now</Button>
                 </CardFooter>
             </Card>

             <div className="bg-blue-600/5 p-4 rounded-xl border border-blue-600/10">
                 <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Pro Tip</p>
                 <p className="text-sm text-blue-800 leading-relaxed font-medium">
                     Tutors with detailed bios and consistent availability are <span className="underline decoration-2">3x more likely</span> to be booked.
                 </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
