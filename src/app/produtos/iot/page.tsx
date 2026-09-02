import IoTContentSection from "@/components/sections/IoT/IoTContentSection";
import IoTCtaSection from "@/components/sections/IoT/Cta/IoTCtaSection";
import IoTHeroSection from "@/components/sections/IoT/Hero/IoTHeroSection";

export default function IungoIoTPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <IoTHeroSection />
      <IoTContentSection />
      <IoTCtaSection />
    </main>
  );
}
