import { TutorProfileFormClient } from "@/components/modules/tutors/TutorProfileFormClient";
// import { getMyTutorProfile } from "@/actions/tutor.action";

export default async function TutorProfilePage() {
  // Fetch the current tutor profile from the server
  // const tutor = await getMyTutorProfile();

  // const hasProfile = !!tutor;

  return (
    <section className="flex justify-center mt-8">
      {/* {hasProfile ? (
        <TutorProfileFormClient mode="update" defaultValues={tutor} />
      ) : (
      )} */}
      <TutorProfileFormClient mode="create" />
    </section>
  );
}
