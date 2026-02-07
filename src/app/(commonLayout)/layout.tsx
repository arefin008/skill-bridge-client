import { Footer2 } from "@/components/layout/footer2";
import { Navbar } from "@/components/layout/Navbar";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer2 />
    </div>
  );
}
