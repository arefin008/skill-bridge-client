import { userService } from "@/services/user.service";
import StudentProfileClient from "@/components/modules/students/StudentProfileClient";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const sessionRes = await userService.getSession();
  const user = sessionRes.data?.user;

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-20 animate-in fade-in zoom-in-95">
        <div className="bg-muted h-16 w-16 rounded-full mb-4 flex items-center justify-center animate-pulse" />
        <h2 className="text-xl font-bold">Unable to load profile</h2>
        <p className="text-muted-foreground mt-2 text-center max-w-sm">Please make sure you are logged in and try refreshing the page.</p>
      </div>
    );
  }

  return <StudentProfileClient user={user} />;
}
