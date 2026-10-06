import RequestDemoSection from "@/components/sections/RequestDemo/Main/RequestDemoSection";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import { setLocale, type LocaleParams } from "@/i18n/locale";
import { createPageMetadata } from "@/i18n/pageMetadata";

export function generateMetadata({ params }: LocaleParams) {
  return createPageMetadata(params, SOLICITAR_DEMONSTRACAO_HREF, {
    title: "Vamos conversar | Iungo Intelligence",
    description:
      "Solicite uma demonstração ou agende um diagnóstico com a Iungo Intelligence.",
  });
}

export default async function SolicitarDemonstracaoPage({
  params,
}: LocaleParams) {
  await setLocale(params);

  return (
    <main className="min-w-0 flex-1 bg-white">
      <RequestDemoSection />
    </main>
  );
}
