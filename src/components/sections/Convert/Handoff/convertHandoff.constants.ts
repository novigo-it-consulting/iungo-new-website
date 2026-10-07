export type ConvertHandoffCardItem = {
  id: string;
  title: string;
  description: string;
};

export const CONVERT_HANDOFF_CARD_IDS = [
  "resumo",
  "produtos",
  "perfil",
  "proxima-acao",
] as const;
