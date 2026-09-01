import type { AttendantOperationCategory } from "./attendantSupportedOperations.constants";

type AttendantOperationCardProps = {
  category: AttendantOperationCategory;
};

export default function AttendantOperationCard({
  category,
}: AttendantOperationCardProps) {
  return (
    <article
      data-attendant-supported-operations-card
      data-attendant-supported-operations-card-id={category.id}
      className="box-border flex min-w-0 flex-col gap-3 rounded-xl border border-[#E4E4E7] bg-white p-6"
    >
      <h3
        data-attendant-supported-operations-card-title
        className="m-0 font-reddit text-sm font-semibold leading-5 tracking-[-0.28px] text-[#3B37C0]"
      >
        {category.title}
      </h3>

      <ul
        data-attendant-supported-operations-card-list
        className="m-0 flex list-none flex-col gap-[6px] p-0 font-reddit text-sm font-normal leading-5 tracking-normal text-[#27272A]"
      >
        {category.items.map((item) => (
          <li
            key={item}
            data-attendant-supported-operations-card-item
            className="flex min-w-0 items-start"
          >
            <span aria-hidden="true" className="mr-1 shrink-0">
              ·
            </span>
            <span className="min-w-0">{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
