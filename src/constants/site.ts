/** Domínio público de produção. Única fonte do metadataBase. */
export const SITE_URL = "https://www.iungo-ai.com";

/**
 * Permite sobrescrever o domínio em ambientes de build.
 * Não há outro padrão de URL do site no projeto.
 * Rejeita localhost para o canonical não sair apontando para a máquina local.
 */
export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL;
  const url = parseAbsoluteUrl(raw);

  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    throw new Error("SITE_URL não pode apontar para localhost.");
  }

  return url;
}

function parseAbsoluteUrl(raw: string): URL {
  try {
    return new URL(raw);
  } catch {
    throw new Error(`SITE_URL inválida: ${raw}`);
  }
}
