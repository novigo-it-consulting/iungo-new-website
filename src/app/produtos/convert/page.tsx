import ConvertContentSection from "@/components/sections/Convert/ConvertContentSection";
import ConvertCtaSection from "@/components/sections/Convert/Cta/ConvertCtaSection";
import ConvertHeroSection from "@/components/sections/Convert/Hero/ConvertHeroSection";

export default function IungoConvertPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <ConvertHeroSection />
      <ConvertContentSection />
      <ConvertCtaSection />
    </main>
  );
}
