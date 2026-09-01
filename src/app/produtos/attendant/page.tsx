import AttendantContentSection from "@/components/sections/Attendant/AttendantContentSection";
import AttendantCtaSection from "@/components/sections/Attendant/Cta/AttendantCtaSection";
import AttendantHeroSection from "@/components/sections/Attendant/Hero/AttendantHeroSection";

export default function IungoAttendantPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <AttendantHeroSection />
      <AttendantContentSection />
      <AttendantCtaSection />
    </main>
  );
}
