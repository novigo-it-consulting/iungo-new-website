export type ContactCardVariant = "commercial" | "default";

export type ContactCardContact =
  | { type: "email"; href: string; label: string }
  | { type: "tel"; href: string; label: string };

export type ContactCardData = {
  id: string;
  variant: ContactCardVariant;
  title: string;
  contact: ContactCardContact;
  description: string;
};

export const REQUEST_DEMO_CONTACT_CARDS: readonly ContactCardData[] = [
  {
    id: "commercial",
    variant: "commercial",
    title: "COMERCIAL",
    contact: {
      type: "email",
      href: "mailto:comercial@iungo-ai.com",
      label: "comercial@iungo-ai.com",
    },
    description: "Resposta em 1 dia útil",
  },
  {
    id: "support",
    variant: "default",
    title: "SUPORTE",
    contact: {
      type: "email",
      href: "mailto:suporte@iungo-ai.com",
      label: "suporte@iungo-ai.com",
    },
    description: "Clientes ativos · 24/7",
  },
  {
    id: "dpo",
    variant: "default",
    title: "DPO · LGPD",
    contact: {
      type: "email",
      href: "mailto:dpo@iungo-ai.com",
      label: "dpo@iungo-ai.com",
    },
    description: "Direitos do titular · Art. 18",
  },
  {
    id: "phone",
    variant: "default",
    title: "TELEFONE",
    contact: {
      type: "tel",
      href: "tel:+551141526525",
      label: "(11) 4152-6525",
    },
    description: "Comercial · seg-sex · 9-18h",
  },
] as const;
