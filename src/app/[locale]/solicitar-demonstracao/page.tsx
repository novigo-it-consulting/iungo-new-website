import RequestDemoSection from "@/components/sections/RequestDemo/Main/RequestDemoSection";
import { SOLICITAR_DEMONSTRACAO_HREF } from "@/constants/routes";
import { pickRequestDemoMessages } from "@/i18n/catalog/requestDemoCatalog";
import { setLocale, type LocaleParams } from "@/i18n/locale";
import { createPageMetadata } from "@/i18n/pageMetadata";

export async function generateMetadata({ params }: LocaleParams) {
  const messages = pickRequestDemoMessages(await setLocale(params));

  return createPageMetadata(params, SOLICITAR_DEMONSTRACAO_HREF, {
    title: messages.meta.title,
    description: messages.meta.description,
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
