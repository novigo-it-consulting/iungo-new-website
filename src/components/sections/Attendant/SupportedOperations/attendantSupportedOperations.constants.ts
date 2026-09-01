export const ATTENDANT_SUPPORTED_OPERATIONS_HEADER = {
  eyebrow: "OPERAÇÕES SUPORTADAS",
  title: "42 operações transacionais prontas para uso.",
  description:
    "Conectores nativos para os principais ERPs e OMS do varejo brasileiro. Personalizáveis por regra de negócio.",
} as const;

export type AttendantOperationCategory = {
  id: string;
  title: string;
  items: readonly string[];
};

export const ATTENDANT_SUPPORTED_OPERATIONS_CARDS: readonly AttendantOperationCategory[] =
  [
    {
      id: "pedidos",
      title: "PEDIDOS",
      items: [
        "Status & rastreio",
        "Cancelamento",
        "Troca de tamanho/cor",
        "Devolução",
        "Segunda via de NF-e",
        "Atualização de endereço",
      ],
    },
    {
      id: "conta",
      title: "CONTA",
      items: [
        "Atualização cadastral",
        "Reset de senha",
        "Histórico de compras",
        "Programa de fidelidade",
        "Cashback & cupons",
        "Assinaturas",
      ],
    },
    {
      id: "pagamento",
      title: "PAGAMENTO",
      items: [
        "Segunda via de boleto",
        "PIX copia & cola",
        "Estorno parcial",
        "Parcelamento renegociado",
        "Comprovantes",
        "Conciliação",
      ],
    },
  ] as const;
