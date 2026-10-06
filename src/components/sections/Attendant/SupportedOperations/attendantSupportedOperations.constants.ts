export type AttendantOperationCategory = {
  id: string;
  title: string;
  items: readonly string[];
};

export const ATTENDANT_OPERATION_CATEGORY_IDS = [
  "pedidos",
  "conta",
  "pagamento",
] as const;
