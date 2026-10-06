import ResolveContentSection from "@/components/sections/Resolve/ResolveContentSection";
import ResolveCtaSection from "@/components/sections/Resolve/Cta/ResolveCtaSection";
import ResolveHeroSection from "@/components/sections/Resolve/Hero/ResolveHeroSection";
import { RESOLVE_HREF } from "@/constants/routes";
import { setLocale, type LocaleParams } from "@/i18n/locale";
import { createPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createPageMetadata(params, RESOLVE_HREF);
}

export default async function IungoResolvePage({ params }: LocaleParams) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <ResolveHeroSection />
      <ResolveContentSection />
      <ResolveCtaSection />
    </main>
  );
}
