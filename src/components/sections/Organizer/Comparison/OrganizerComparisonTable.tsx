import { getTranslations } from "next-intl/server";

import ProductTableScroll from "@/components/sections/shared/DataTable/ProductTableScroll";

import OrganizerComparisonValue from "./OrganizerComparisonValue";
import {
  COMPARISON_ROWS,
  type ComparisonCell,
  type ComparisonValue,
} from "./organizerComparison.constants";

type ComparisonTranslator = Awaited<
  ReturnType<typeof getTranslations<"productPages.organizer.comparison">>
>;

const thBase =
  "h-[52px] box-border p-4 align-middle font-reddit text-[14px] font-bold leading-5 tracking-[0px]";

function rowCopy(t: ComparisonTranslator) {
  return {
    onboarding: {
      criterion: t("onboarding.criterion"),
      iungo: t("onboarding.iungo"),
      akeneo: t("onboarding.akeneo"),
      salsify: t("onboarding.salsify"),
    },
    nativeIntegration: {
      criterion: t("nativeIntegration.criterion"),
      akeneo: t("nativeIntegration.akeneo"),
    },
    generativeAi: {
      criterion: t("generativeAi.criterion"),
      akeneo: t("generativeAi.akeneo"),
      salsify: t("generativeAi.salsify"),
    },
    dam: {
      criterion: t("dam.criterion"),
      akeneo: t("dam.akeneo"),
    },
    pricing: {
      criterion: t("pricing.criterion"),
      akeneo: t("pricing.akeneo"),
      salsify: t("pricing.salsify"),
    },
    lgpd: {
      criterion: t("lgpd.criterion"),
      akeneo: t("lgpd.akeneo"),
      salsify: t("lgpd.salsify"),
    },
  };
}

function cellValue(
  cell: ComparisonCell,
  value: string | undefined,
): ComparisonValue {
  if (cell.type !== "text") {
    return cell;
  }

  if (!value) {
    throw new Error("Missing Organizer comparison translation");
  }

  return { type: "text", value };
}

export default async function OrganizerComparisonTable() {
  const t = await getTranslations("productPages.organizer.comparison");
  const tCommon = await getTranslations("common");
  const copy = rowCopy(t);
  const yesLabel = tCommon("yes");
  const noLabel = tCommon("no");
  const rows = COMPARISON_ROWS.map((row) => {
    const texts = copy[row.id];
    return {
      ...row,
      criterion: texts.criterion,
      iungo: cellValue(row.iungo, "iungo" in texts ? texts.iungo : undefined),
      akeneo: cellValue(row.akeneo, texts.akeneo),
      salsify: cellValue(
        row.salsify,
        "salsify" in texts ? texts.salsify : undefined,
      ),
    };
  });

  return (
    <ProductTableScroll
      ariaLabel={t("ariaLabel")}
      className="mt-12"
      frameClassName="min-w-[960px] rounded-[20px]"
    >
      <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">{t("caption")}</caption>

          <colgroup>
            <col style={{ width: "34.724%" }} />
            <col style={{ width: "25.391%" }} />
            <col style={{ width: "19.941%" }} />
            <col style={{ width: "19.944%" }} />
          </colgroup>

          <thead className="bg-[#F4F4F5]">
            <tr style={{ height: "52px" }} className="border-b border-[#E4E4E7]">
              <th scope="col" className={`${thBase} text-left text-[#27272A]`}>
                <div className="flex h-5 w-full items-center justify-start">
                  <span className="w-fit">{t("columns.criterion")}</span>
                </div>
              </th>
              <th scope="col" className={`${thBase} text-center text-[#1E9F67]`}>
                <div className="flex h-5 w-full items-center justify-center">
                  <span className="w-fit">{t("columns.iungo")}</span>
                </div>
              </th>
              <th scope="col" className={`${thBase} text-center text-[#71717A]`}>
                <div className="flex h-5 w-full items-center justify-center">
                  <span className="w-fit">{t("columns.akeneo")}</span>
                </div>
              </th>
              <th scope="col" className={`${thBase} text-center text-[#71717A]`}>
                <div className="flex h-5 w-full items-center justify-center">
                  <span className="w-fit">{t("columns.salsify")}</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                style={{ height: `${row.height}px` }}
                className={`${
                  rowIndex % 2 === 1
                    ? "bg-[rgba(244,244,245,0.4)]"
                    : "bg-white"
                }${
                  rowIndex < rows.length - 1
                    ? " border-b border-[#E4E4E7]"
                    : ""
                }`}
              >
                <th
                  scope="row"
                  className="min-w-0 px-4 text-left align-middle font-reddit text-[14px] font-medium leading-5 tracking-[0px] text-[#27272A]"
                >
                  {row.criterion}
                </th>
                <td className="min-w-0 px-4 text-center align-middle">
                  <OrganizerComparisonValue
                    value={row.iungo}
                    yesLabel={yesLabel}
                    noLabel={noLabel}
                  />
                </td>
                <td className="min-w-0 px-4 text-center align-middle">
                  <OrganizerComparisonValue
                    value={row.akeneo}
                    yesLabel={yesLabel}
                    noLabel={noLabel}
                  />
                </td>
                <td className="min-w-0 px-4 text-center align-middle">
                  <OrganizerComparisonValue
                    value={row.salsify}
                    yesLabel={yesLabel}
                    noLabel={noLabel}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </ProductTableScroll>
  );
}
