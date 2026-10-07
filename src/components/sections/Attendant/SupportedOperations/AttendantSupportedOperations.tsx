import { getTranslations } from "next-intl/server";

import ProductSectionHeader from "@/components/sections/shared/SectionHeader/ProductSectionHeader";

import AttendantOperationCard from "./AttendantOperationCard";
import {
  ATTENDANT_OPERATION_CATEGORY_IDS,
  type AttendantOperationCategory,
} from "./attendantSupportedOperations.constants";

type OperationsTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.attendant.operations">>
>;

function operationCategories(t: OperationsTranslator): AttendantOperationCategory[] {
  return [
    {
      id: ATTENDANT_OPERATION_CATEGORY_IDS[0],
      title: t("orders.title"),
      items: [
        t("orders.status"),
        t("orders.cancel"),
        t("orders.exchange"),
        t("orders.return"),
        t("orders.invoiceCopy"),
        t("orders.address"),
      ],
    },
    {
      id: ATTENDANT_OPERATION_CATEGORY_IDS[1],
      title: t("account.title"),
      items: [
        t("account.profile"),
        t("account.password"),
        t("account.history"),
        t("account.loyalty"),
        t("account.cashback"),
        t("account.subscriptions"),
      ],
    },
    {
      id: ATTENDANT_OPERATION_CATEGORY_IDS[2],
      title: t("payment.title"),
      items: [
        t("payment.boleto"),
        t("payment.pix"),
        t("payment.refund"),
        t("payment.installments"),
        t("payment.receipts"),
        t("payment.reconciliation"),
      ],
    },
  ];
}

export default async function AttendantSupportedOperations() {
  const t = await getTranslations("productPages.attendant.operations");

  return (
    <div
      data-attendant-supported-operations
      aria-labelledby="attendant-supported-operations-title"
      className="flex w-full min-w-0 flex-col items-center"
    >
      <ProductSectionHeader
        blockSlug="attendant-supported-operations"
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleId="attendant-supported-operations-title"
        description={t("description")}
      />

      <div
        data-attendant-supported-operations-cards
        className="mx-auto mt-16 grid w-full max-w-[1088px] grid-cols-1 gap-6 lg:grid-cols-3"
      >
        {operationCategories(t).map((category) => (
          <AttendantOperationCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
