import type { ProductTestimonialItem } from "@/components/sections/shared/Testimonials/productTestimonials.types";

export const IOT_TESTIMONIALS: readonly ProductTestimonialItem[] = [
  {
    id: "luis-f",
    quote:
      "Antes do Iungo IoT, contagem trimestral travava o time de TI por uma semana inteira. Hoje rodo inventário cego em 2 horas com 1 pessoa, e a divergência caiu de 8% para abaixo de 1%.",
    initials: "LF",
    avatarClassName: "bg-gradient-to-br from-[#4F46E5] to-[#22D3EE]",
    name: "Luis F.",
    role: "Gerente de Infraestrutura · Rede de farmácias nacional",
    metricValue: "< 1%",
    metricLabel: "DIVERGÊNCIA",
  },
  {
    id: "claudia-b",
    quote:
      "O que vendi pro CFO foi conciliação patrimonial automática. O que ele percebeu depois foi compliance: cada movimento tem trilha auditável, e auditoria externa parou de pedir relatório manual.",
    initials: "CB",
    avatarClassName: "bg-gradient-to-r from-[#22D3EE] to-[#A3E635]",
    name: "Cláudia B.",
    role: "Diretora de Supply Chain · Grupo industrial · sob NDA",
    metricValue: "−90%",
    metricLabel: "CUSTO CONTAGEM",
  },
];
