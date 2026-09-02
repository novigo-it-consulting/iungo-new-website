export type ProductTextTableColumn<T extends string> = {
  key: T;
  label: string;
  align?: "left" | "center" | "right";
  headerAlign?: "left" | "center" | "right";
  width?: string;
  cellClassName?: string;
};

export type ProductTextTableProps<
  T extends string,
  Row extends Record<T, string> = Record<T, string>,
> = {
  blockSlug: string;
  caption: string;
  ariaLabel: string;
  columns: readonly ProductTextTableColumn<T>[];
  rows: readonly Row[];
  getRowKey: (row: Row, index: number) => string;
  className?: string;
  containerClassName?: string;
  rowHeight?: number;
  rowHeaderKey?: T;
};

const HEADER_CELL_CLASS =
  "h-[52px] box-border p-4 align-middle font-reddit text-[14px] font-bold leading-5 tracking-[0px]";

const BODY_CELL_CLASS =
  "min-w-0 px-4 align-middle font-reddit text-[14px] leading-5 tracking-[0px]";

function getAlignClass(align: "left" | "center" | "right") {
  if (align === "right") {
    return "text-right";
  }

  if (align === "center") {
    return "text-center";
  }

  return "text-left";
}

export default function ProductTextTable<
  T extends string,
  Row extends Record<T, string> = Record<T, string>,
>({
  blockSlug,
  caption,
  ariaLabel,
  columns,
  rows,
  getRowKey,
  className = "",
  containerClassName = "",
  rowHeight = 53,
  rowHeaderKey,
}: ProductTextTableProps<T, Row>) {
  return (
    <div
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      data-product-text-table={blockSlug}
      className={`w-full overflow-x-auto overscroll-x-contain ${className}`}
    >
      <div
        data-product-text-table-container={blockSlug}
        className={`min-w-0 overflow-hidden rounded-[16px] border border-[#E4E4E7] bg-white ${containerClassName}`}
      >
        <table className="w-full table-fixed border-collapse">
          <caption className="sr-only">{caption}</caption>

          <colgroup>
            {columns.map((column) => (
              <col key={column.key} style={column.width ? { width: column.width } : undefined} />
            ))}
          </colgroup>

          <thead className="bg-[#F4F4F5]">
            <tr className="border-b border-[#E4E4E7]" style={{ height: "52px" }}>
              {columns.map((column) => {
                const headerAlign = column.headerAlign ?? column.align ?? "left";

                return (
                  <th
                    key={column.key}
                    scope="col"
                    data-product-text-table-header={column.key}
                    className={`${HEADER_CELL_CLASS} ${getAlignClass(headerAlign)} text-[#27272A]`}
                  >
                    {column.label}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={getRowKey(row, rowIndex)}
                data-product-text-table-row={getRowKey(row, rowIndex)}
                style={{ height: `${rowHeight}px` }}
                className={
                  rowIndex < rows.length - 1 ? "border-b border-[#E4E4E7]" : undefined
                }
              >
                {columns.map((column) => {
                  const align = column.align ?? "left";
                  const isRowHeader = rowHeaderKey === column.key;
                  const cellClassName = column.cellClassName ?? "text-[#71717A]";
                  const CellTag = isRowHeader ? "th" : "td";

                  return (
                    <CellTag
                      key={column.key}
                      {...(isRowHeader ? { scope: "row" as const } : {})}
                      data-product-text-table-cell={column.key}
                      className={`${BODY_CELL_CLASS} ${getAlignClass(align)} ${
                        isRowHeader ? "font-medium" : "font-normal"
                      } ${cellClassName}`}
                    >
                      {row[column.key]}
                    </CellTag>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
