import ResolveContentSection from "@/components/sections/Resolve/ResolveContentSection";
import ResolveHeroSection from "@/components/sections/Resolve/ResolveHeroSection";

export default function IungoResolvePage() {
  return (
    <main className="min-w-0 flex-1 bg-white">
      <ResolveHeroSection />
      <ResolveContentSection />
    </main>
  );
}
