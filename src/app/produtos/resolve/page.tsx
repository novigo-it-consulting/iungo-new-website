import ResolveContentSection from "@/components/sections/Resolve/ResolveContentSection";
import ResolveCtaSection from "@/components/sections/Resolve/Cta/ResolveCtaSection";
import ResolveHeroSection from "@/components/sections/Resolve/Hero/ResolveHeroSection";

export default function IungoResolvePage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <ResolveHeroSection />
      <ResolveContentSection />
      <ResolveCtaSection />
    </main>
  );
}
