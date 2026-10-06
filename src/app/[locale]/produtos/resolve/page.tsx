import ResolveContentSection from "@/components/sections/Resolve/ResolveContentSection";
import ResolveCtaSection from "@/components/sections/Resolve/Cta/ResolveCtaSection";
import ResolveHeroSection from "@/components/sections/Resolve/Hero/ResolveHeroSection";
import { RESOLVE_HREF } from "@/constants/routes";
import { setLocale, type LocalePageProps, type LocaleParams } from "@/i18n/locale";
import { createHeroPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createHeroPageMetadata(params, RESOLVE_HREF, "productPages.resolve");
}

export default async function IungoResolvePage({ params }: LocalePageProps) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <ResolveHeroSection />
      <ResolveContentSection />
      <ResolveCtaSection />
    </main>
  );
}
