export type ResolveDifferentialTitleIcon = "organizer" | "behavior";

export interface ResolveDifferentialCardData {
  id: string;
  number: number;
  title: string;
  titleClassName?: string;
  titleIcon?: ResolveDifferentialTitleIcon;
  description: string;
}

export const RESOLVE_DIFFERENTIAL_CARDS: readonly ResolveDifferentialCardData[] =
  [
    {
      id: "differential-1",
      number: 1,
      title: "Catálogo vivo via Iungo Organizer AI PIM",
      titleClassName: "text-[#1E9F67]",
      titleIcon: "organizer",
      description:
        "Cada resposta é grounded em ficha técnica, atributos, compatibilidade e estoque atual. Zero alucinação sobre produto.",
    },
    {
      id: "differential-2",
      number: 2,
      title: "Perfil 360° via Iungo Behavior CDP",
      titleClassName: "text-[#5B6C7C]",
      titleIcon: "behavior",
      description:
        "Sabe se o cliente é VIP, qual a última compra, qual a categoria preferida. Personaliza o tom e a recomendação.",
    },
    {
      id: "differential-3",
      number: 3,
      title: "Handoff humano com contexto completo",
      description:
        "Quando escala, entrega ao atendente um briefing pronto: histórico, intenção, sentimento, próxima melhor ação.",
    },
    {
      id: "differential-4",
      number: 4,
      title: "Multi-canal nativo",
      description:
        "WhatsApp Business, web chat, email, Instagram DM. Mesma inteligência, mesma memória de conversa, mesmo cliente.",
    },
    {
      id: "differential-5",
      number: 5,
      title: "Citações verificáveis",
      description:
        "Cada resposta linka à fonte (PDP, política, manual). Auditável, em PT-BR, com tom de voz da sua marca.",
    },
    {
      id: "differential-6",
      number: 6,
      title: "Aprende com cada ticket",
      description:
        "Detecta dúvidas recorrentes e sugere atualizações no PIM. O catálogo melhora sozinho a cada interação.",
    },
  ] as const;

export type ResolveDifferentialCardId =
  (typeof RESOLVE_DIFFERENTIAL_CARDS)[number]["id"];
