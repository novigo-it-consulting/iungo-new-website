import CheckIcon from "@/components/icons/CheckIcon";
import XIcon from "@/components/icons/XIcon";
import ProductTableScroll from "@/components/sections/shared/DataTable/ProductTableScroll";
import type { ComparisonValue } from "./organizerComparison.constants";
import { COMPARISON_ROWS } from "./organizerComparison.constants";

function ComparisonValueContent({ value }: { value: ComparisonValue }) {
  if (value.type === "text") {
    return (
      <span className="font-reddit text-[14px] font-normal leading-5 tracking-[0px] text-[#27272A]">
        {value.value}
      </span>
    );
  }

  if (value.type === "check") {
    const isBrand = value.tone === "brand";
    return (
      <span
        className={[
          "mx-auto inline-flex shrink-0 items-center justify-center",
          isBrand
            ? "h-7 w-[15px] text-[#1E9F67]"
            : "h-5 w-3 text-[#27272A]",
        ].join(" ")}
      >
        <CheckIcon
          aria-hidden="true"
          focusable="false"
          className={isBrand ? "h-[18px] w-[15px] shrink-0" : "size-full shrink-0"}
        />
        <span className="sr-only">Sim</span>
      </span>
    );
  }

  return (
    <span className="mx-auto inline-flex h-5 w-[10px] shrink-0 items-center justify-center text-[#27272A]">
      <XIcon
        aria-hidden="true"
        focusable="false"
        className="size-full shrink-0"
      />
      <span className="sr-only">Não</span>
    </span>
  );
}

const thBase =
  "h-[52px] box-border p-4 align-middle font-reddit text-[14px] font-bold leading-5 tracking-[0px]";

export default function OrganizerComparisonTable() {
  return (
    <ProductTableScroll
      ariaLabel="Comparação de plataformas PIM"
      className="mt-12"
      frameClassName="min-w-[960px] rounded-[20px]"
    >
      <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">
            Comparação entre Iungo Organizer AI PIM, Akeneo e Salsify
          </caption>

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
                  <span className="w-fit">Critério</span>
                </div>
              </th>
              <th scope="col" className={`${thBase} text-center text-[#1E9F67]`}>
                <div className="flex h-5 w-full items-center justify-center">
                  <span className="w-fit">Iungo Organizer AI PIM</span>
                </div>
              </th>
              <th scope="col" className={`${thBase} text-center text-[#71717A]`}>
                <div className="flex h-5 w-full items-center justify-center">
                  <span className="w-fit">Akeneo</span>
                </div>
              </th>
              <th scope="col" className={`${thBase} text-center text-[#71717A]`}>
                <div className="flex h-5 w-full items-center justify-center">
                  <span className="w-fit">Salsify</span>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {COMPARISON_ROWS.map((row, rowIndex) => (
              <tr
                key={row.criterion}
                style={{ height: `${row.height}px` }}
                className={`${
                  rowIndex % 2 === 1
                    ? "bg-[rgba(244,244,245,0.4)]"
                    : "bg-white"
                }${
                  rowIndex < COMPARISON_ROWS.length - 1
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
                  <ComparisonValueContent value={row.iungo} />
                </td>
                <td className="min-w-0 px-4 text-center align-middle">
                  <ComparisonValueContent value={row.akeneo} />
                </td>
                <td className="min-w-0 px-4 text-center align-middle">
                  <ComparisonValueContent value={row.salsify} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    </ProductTableScroll>
  );
}
