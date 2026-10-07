import { getTranslations } from "next-intl/server";

/** Rótulo único do botão "Solicitar Demonstração" (namespace common). */
export async function getRequestDemoLabel(): Promise<string> {
  const t = await getTranslations("common");
  return t("requestDemo");
}
