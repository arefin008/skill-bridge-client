import { tutorService } from "@/services/tutor.service";

interface Tutor {
  id: string;
  name: string;
}

export default async function HomePage() {
  const response = await tutorService.getAll({ limit: "6" });
  const tutors = Array.isArray(response) ? response : response?.data || [];

  return (
    <main>
      <h1>Find Your Tutor</h1>
      {tutors.map((t: Tutor) => (
        <div key={t.id}>{t.name}</div>
      ))}
    </main>
  );
}
