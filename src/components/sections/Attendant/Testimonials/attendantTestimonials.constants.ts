import type { ProductTestimonialItem } from "@/components/sections/shared/Testimonials/productTestimonials.types";

export const ATTENDANT_TESTIMONIALS: readonly ProductTestimonialItem[] = [
  {
    id: "sandra-v",
    quote:
      "Tinha 8 pessoas só para reemitir boleto, atualizar endereço e cancelar pedido. Hoje são 2, e elas só tocam exceção. O resto roda 24/7 com auditoria assinada — coisa que minha equipe humana não fazia.",
    initials: "SV",
    avatarClassName: "bg-gradient-to-br from-[#4F46E5] to-[#22D3EE]",
    name: "Sandra V.",
    role: "Head de Operações · Varejista omnichannel",
    metricValue: "−75%",
    metricLabel: "HEADCOUNT BO",
  },
  {
    id: "henrique-l",
    quote:
      "O que me ganhou o board foi a parte de auditoria. Cada operação tem hash assinado, retenção de 5 anos, consentimento rastreado. Pré-auditoria de LGPD passou sem ressalva pela primeira vez.",
    initials: "HL",
    avatarClassName: "bg-gradient-to-r from-[#22D3EE] to-[#A3E635]",
    name: "Henrique L.",
    role: "CFO & DPO interino · Rede de farmácias",
    metricValue: "0",
    metricLabel: "RESSALVAS LGPD",
  },
];
