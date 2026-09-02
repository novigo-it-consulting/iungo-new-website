import type { ProductTestimonialItem } from "@/components/sections/shared/Testimonials/productTestimonials.types";

export const CONVERT_TESTIMONIALS: readonly ProductTestimonialItem[] = [
  {
    id: "daniel-p",
    quote:
      "Antes a gente perdia visita quente do site fora do horário. Hoje o Iungo Convert fecha à 1h da manhã e entrega o ticket pronto pro vendedor humano só nos casos B2B. Ticket médio dobrou na operação digital.",
    initials: "DP",
    avatarClassName: "bg-gradient-to-br from-[#4F46E5] to-[#22D3EE]",
    name: "Daniel P.",
    role: "Diretor Comercial · Calçados outdoor · sob NDA",
    metricValue: "2x",
    metricLabel: "TICKET MÉDIO",
  },
  {
    id: "vivian-k",
    quote:
      "Drift e Intercom recomendavam de jeito genérico. O Iungo recomenda olhando o catálogo de verdade — e olhando o histórico do cliente no CDP. Recomendação melhor = conversão maior. Não tem mistério.",
    initials: "VK",
    avatarClassName: "bg-gradient-to-r from-[#22D3EE] to-[#A3E635]",
    name: "Vivian K.",
    role: "Head de Vendas Digitais · Marketplace fashion",
    metricValue: "+34%",
    metricLabel: "CVR CONVERSA",
  },
];
