import { tutorService } from "@/services/tutor.service";

interface Tutor {
  id: string;
  name: string;
}

export default async function TutorsPage() {
  const tutors = await tutorService.getAll();

  return (
    <div>
      <h1>Browse Tutors</h1>
      {tutors.map((t: Tutor) => (
        <a key={t.id} href={`/tutors/${t.id}`}>
          {t.name}
        </a>
      ))}
    </div>
  );
}
