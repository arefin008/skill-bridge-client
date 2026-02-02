import { tutorService } from "@/services/tutor.service";

export default async function TutorProfile({
  params,
}: {
  params: { id: string };
}) {
  const tutor = await tutorService.getById(params.id);

  return (
    <div>
      <h1>{tutor.name}</h1>
      <p>{tutor.bio}</p>
      <p>৳ {tutor.pricePerHour} / hour</p>
    </div>
  );
}
