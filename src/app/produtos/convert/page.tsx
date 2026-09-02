import ConvertContentSection from "@/components/sections/Convert/ConvertContentSection";
import ConvertHeroSection from "@/components/sections/Convert/Hero/ConvertHeroSection";

export default function IungoConvertPage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <ConvertHeroSection />
      <ConvertContentSection />
    </main>
  );
}
